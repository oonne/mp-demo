import { authApi, userApi, settingApi } from "../../api/index";
import { Utils, to, buildErrorMsg } from "../../utils/index";
import config from "../../config/config";
import testOpenid from "../../constant/test-openid";
import state from "../../global/state";
import { refreshToken, startRefreshToken } from "../../global/service";

const { reLaunch } = Utils;

/**
 * 入口页
 */
Page({
  onLoad(e) {
    state.entryParams = e;
    this.enter();
  },

  /*
   * 进入
   */
  async enter() {
    // 如果有token，表示登录过，先尝试换票
    if (wx.getStorageSync("TOKEN")) {
      await refreshToken();
    }

    if (!state.token) {
      // 新用户进入或者换票失败，则需要重新微信登录
      const wxLoginRes = await this.wxLogin();
      if (!wxLoginRes) {
        return;
      }
    } else {
      // 如果已经登录过，进入页面先获取用户信息
      const getUserDetailRes = await this.getUserDetaial();
      if (!getUserDetailRes) {
        return;
      }
    }

    // 判断审核信息
    await this.isAudit();
    // 判断是否测试人员
    this.isTestUser();
    

    // 开始定时换票
    await startRefreshToken();

    // 获取商户信息
    await this.getMerchantDetail();

    // 根据进入场景跳转
    this.judgeEntryType();
  },

  /*
   * 微信登录
   */
  async wxLogin(): Promise<boolean> {
    console.log("开始微信登录");

    // 获取微信登录code
    const [wxLoginErr, wxLoginRes] = await to(
      new Promise((resolve, reject) => {
        wx.login({
          success: resolve,
          fail: reject,
        });
      })
    );

    if (wxLoginErr) {
      reLaunch("/pages/exception/error/index", {
        title: "登录失败",
        content: buildErrorMsg({ err: wxLoginErr, defaultMsg: "微信登录失败" }),
      });
      return false;
    }

    // 请求接口登录
    const [err, res] = await authApi.login({
      code: wxLoginRes.code,
    });

    if (err) {
      reLaunch("/pages/exception/error/index", {
        title: "登录失败",
        content: buildErrorMsg({ err, defaultMsg: "微信登录接口异常" }),
      });
      return false;
    }

    const { user, token, refreshToken } = res.data;
    state.user = user;
    state.token = token;
    wx.setStorageSync("USER_ID", user.userId);
    wx.setStorageSync("TOKEN", token);
    wx.setStorageSync("REFRESH_TOKEN", refreshToken);
    wx.setStorageSync("TOKEN_REFRESH_TIME", new Date().getTime());
    return true;
  },

  /*
   * 获取用户信息
   */
  async getUserDetaial(): Promise<boolean> {
    const userId = wx.getStorageSync("USER_ID");
    if (!userId) {
      reLaunch("/pages/exception/error/index", {
        title: "登录失败",
        content: "用户ID不存在",
      });
      return false;
    }

    const [err, res] = await userApi.getUserDetail({
      userId,
    });
    if (err) {
      reLaunch("/pages/exception/error/index", {
        title: "登录失败",
        content: buildErrorMsg({ err, defaultMsg: "用户信息获取失败" }),
      });
      return false;
    }

    state.user = res.data;
    return true;
  },

  /* 
   * 判断是否审核中
   */
  async isAudit() {
    const [err, res] = await settingApi.getAuditVersion({});
    if (err || res.code !== 0) {
      return;
    }
    
    if (config.version === res.data) {
      state.isAudit = true;
    }
  },

  /* 
   * 判断是否测试人员
   */
  isTestUser() {
    if (state.isAudit) {
      return;
    }

    if (testOpenid.includes(state.user.openId)) {
      state.isTestUser = true;
    }
  },

  /* 
   * 获取商户信息
   */
  async getMerchantDetail(): Promise<void> {
    // TODO
  },

  /* 
   * 根据进入场景跳转
   */
  judgeEntryType(): void {
    const { type } = state.entryParams;

    console.log(type);
    // TODO

    reLaunch("/pages/home/home/index");
  },
});
