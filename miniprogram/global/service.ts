import config from "../config/config";
import state from "./state";
import { to } from "../utils/index";
import { authApi } from "../api/index";

/* 
 * 换票
 */
const refreshToken = async () => {
  const refreshTokenValue = wx.getStorageSync('REFRESH_TOKEN');
  if (!refreshTokenValue) {
    return;
  }

  const userId = wx.getStorageSync('USER_ID');
  if (!userId) {
    return;
  }

  // 如果最近一次刷新时间在 config.tokenRefreshTime 分钟内，则不刷新
  const tokenRefreshTime = wx.getStorageSync('TOKEN_REFRESH_TIME');
  if (tokenRefreshTime && new Date().getTime() - tokenRefreshTime < config.tokenRefreshTime) {
    state.token = wx.getStorageSync('TOKEN');
    return;
  }

  const [err, res] = await to(authApi.refreshToken({
    userId,
    refreshToken: refreshTokenValue,
  }));

  // 换票失败
  if (err || res.code !== 0) {
    state.token = '';
    wx.removeStorageSync('TOKEN');
    wx.removeStorageSync('REFRESH_TOKEN');
    wx.removeStorageSync('TOKEN_REFRESH_TIME');
    return;
  }

  // 换票成功
  state.token = res.data.token;
  wx.setStorageSync('TOKEN', res.data.token);
  wx.setStorageSync('REFRESH_TOKEN', res.data.refreshToken);
  wx.setStorageSync('TOKEN_REFRESH_TIME', new Date().getTime());
};

// 定时器ID，用于确保只有一个定时循环
let refreshTokenTimer: Interval | null = null;

// 开始换票
const startRefreshToken = async () => {
  // 如果已有定时器在运行，先清除
  if (refreshTokenTimer) {
    clearInterval(refreshTokenTimer);
  }

  // 立即执行一次
  await refreshToken();

  // 启动定时器
  refreshTokenTimer = setInterval(() => {
    refreshToken();
  }, 60*60*1000);
};

// 停止换票
const stopRefreshToken = () => {
  if (!refreshTokenTimer) {
    return;
  }

  clearInterval(refreshTokenTimer);
  refreshTokenTimer = null;
};


export {
  refreshToken,
  startRefreshToken,
  stopRefreshToken,
}