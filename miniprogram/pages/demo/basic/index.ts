import { to, buildErrorMsg, Oss } from "../../../utils/index";
import state from "../../../global/state";
import { wxApi } from "../../../api/index";

/**
 * Demo 基础信息
 */
Page({
  /* 
   * 获取微信头像
   */
  async onChooseAvatar(res: any) {
    const {detail: {avatarUrl}} = res;
    if (!avatarUrl) {
      return;
    }

    const uploadRes = await Oss.uploadFile(avatarUrl, '/avatar');
    console.log('uploadRes', uploadRes);
  },

  /* 
   * 选择图片上传
   */
  async uploadImage() {
    const [err, res] = await to(
      new Promise((resolve, reject) => {
        wx.chooseMedia({
          mediaType: ['image'],
          success: resolve,
          fail: reject,
        });
      })
    );

    if (err) {
      wx.showToast({
        title: buildErrorMsg({ err, defaultMsg: '选择图片失败' }),
        icon: 'none',
      });
      return;
    }

    res.tempFiles.forEach(async (file: any) => {
      const uploadRes = await Oss.uploadFile(file.tempFilePath, '/img');
      console.log('uploadRes', uploadRes);
    });
  },

  /* 
   * 获取手机号
   */
  async getPhoneNumber(res: any) {
    const {detail: {code}} = res;
    if (!code) {
      wx.showToast({
        title: buildErrorMsg({ err: res.detail, defaultMsg: '获取手机号失败' }),
        icon: 'none',
      });
      return;
    }

    if (!state.user.openId) {
      wx.showToast({
        title: '缺少openId，无法获取手机号',
        icon: 'none',
      });
      return;
    }

    const [getPhoneNumberErr, getPhoneNumberRes] = await wxApi.getPhoneNumber({
      openId: state.user.openId,
      code,
    });

    if (getPhoneNumberErr) {
      wx.showToast({
        title: buildErrorMsg({ err: getPhoneNumberErr, defaultMsg: '获取手机号失败' }),
        icon: 'none',
      });
    }

    console.log('getPhoneNumberRes', getPhoneNumberRes);
  },
});
