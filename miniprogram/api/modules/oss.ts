import request from "../request";

export default {
  // 获取上传签名
  getUploadSignature(data: object) {
    return request({
      url: '/oss/get-upload-signature',
      data,
    });
  }
};
