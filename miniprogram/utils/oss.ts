import config from "../config/config";
import { ossApi } from "../api/index";
import { to, buildErrorMsg } from "./index";

interface IUploadRes {
  name: string,
  size: number,
  url: string,
}

/**
 *  上传临时文件到oss
 */
const uploadFile = async (filePath: string, uploadPath: string): Promise<IUploadRes> => {
  wx.showLoading({
    title: '正在上传中',
  });

  // 文件名和大小
  let fileName = filePath.split('/').pop() || '';
  let size = 0;

  // 获取文件md5
  const fs = wx.getFileSystemManager();
  const [fileInfoErr, fileInfoRes] = await to(
    new Promise((resolve, reject) => {
      fs.getFileInfo({
        filePath,
        digestAlgorithm: 'md5',
        success: resolve,
        fail: reject,
      });
    })
  );

  if (fileInfoErr) {
    wx.hideLoading();
    wx.showToast({
      title: buildErrorMsg({err: fileInfoErr, defaultMsg: '获取文件信息失败'}),
      icon: 'none',
    });
    return {
      name: fileName,
      size,
      url: '',
    };
  }

  fileName = [fileInfoRes.digest, fileName.split('.').pop()].filter(Boolean).join('.');
  size = fileInfoRes.size;  

  // 获取上传签名
  const [signErr, signRes] = await ossApi.getUploadSignature({});
  if (signErr) {
    wx.hideLoading();
    wx.showToast({
      title: buildErrorMsg({err: signErr, defaultMsg: '获取上传签名失败'}),
      icon: 'none',
    });
    console.error(signErr);
    return {
      name: fileName,
      size,
      url: '',
    };
  }

  // 构建上传参数
  const formData = {
    key: `${config.ossPath}${uploadPath}/${fileName}`, // 上传地址
    policy: signRes.data.policy,   //表单域
    'x-oss-signature': signRes.data.signature,   //签名认证描述信息
    'x-oss-credential': signRes.data.x_oss_credential,   //指明派生密钥的参数集
    'x-oss-date': signRes.data.x_oss_date,   //请求的时间
    'x-oss-signature-version': signRes.data.x_oss_signature_version,    //指定签名的版本和算法
    success_action_status: "200"  //上传成功后响应状态码
  }
  
  // 发送请求上传文件 
  const [uploadErr, uploadRes] = await to(
    new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.ossUrl,
        filePath: filePath,
        name: 'file',
        formData: formData,
        success: resolve,
        fail: reject,
      });
    })
  );
  wx.hideLoading();

  if (uploadErr || uploadRes.statusCode !== 200) {
    wx.showToast({
      title: buildErrorMsg({ err: uploadErr || uploadRes, defaultMsg: '上传文件失败' }),
      icon: 'none',
    });
    console.warn(uploadErr, uploadRes);
    return {
      name: fileName,
      size,
      url: '',
    };
  }

  return {
    name: fileName,
    size,
    url: `${config.ossUrl}/${config.ossPath}${uploadPath}/${fileName}`,
  };
};

export default {
  uploadFile
};
