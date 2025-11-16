import { buildErrorMsg, Oss } from "../../../utils/index";
import { userApi, wxApi } from "../../../api/index";
import state from "../../../global/state";

/**
 * 用户信息
 */
Page({
  data: {
    avatar: state.user.avatar || '/assets/img/default-avatar.png',
    name: state.user.name || '',
    mobile: state.user.mobile || '',
  },

  onShow() {
    this.refreshUserInfo();
  },

  /* 
   * 刷新用户信息
   */
  refreshUserInfo() {
    this.setData({
      avatar: state.user.avatar || '/assets/img/default-avatar.png',
      name: state.user.name || '',
      mobile: state.user.mobile || '',
    });
  },

  /* 
   * 获取微信头像
   */
  async onChooseAvatar(res: any) {
    const {detail: {avatarUrl}} = res;
    if (!avatarUrl) {
      return;
    }

    // 上传oss
    const uploadRes = await Oss.uploadFile(avatarUrl, '/avatar');

    // 更新
    const [updateUserInfoErr] = await userApi.updateUserInfo({
      userId: state.user.userId,
      avatar: uploadRes.url,
    });
    if (updateUserInfoErr) {
      wx.showToast({
        title: buildErrorMsg({ err: updateUserInfoErr, defaultMsg: '更新用户信息失败' }),
        icon: 'none',
      });
      return;
    }

    state.user.avatar = uploadRes.url;
    this.refreshUserInfo();
  },

  /* 
   * 输入昵称
   */
  async onInputName(event: any) {
    const {detail: {value}} = event;
    if (!value) {
      return;
    }

    // 更新
    const [updateUserInfoErr] = await userApi.updateUserInfo({
      userId: state.user.userId,
      name: value,
    });
    if (updateUserInfoErr) {
      wx.showToast({
        title: buildErrorMsg({ err: updateUserInfoErr, defaultMsg: '更新用户信息失败' }),
        icon: 'none',
      });
      return;
    }

    state.user.name = value;
    this.refreshUserInfo();
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

    // 更新
    const [updateUserInfoErr] = await userApi.updateUserInfo({
      userId: state.user.userId,
      mobile: getPhoneNumberRes.data,
    });
    if (updateUserInfoErr) {
      wx.showToast({
        title: buildErrorMsg({ err: updateUserInfoErr, defaultMsg: '更新用户信息失败' }),
        icon: 'none',
      });
      return;
    }

    state.user.mobile = getPhoneNumberRes.data;
    this.refreshUserInfo();
  },
});
