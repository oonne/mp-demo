import request from "../request";

export default {
  // 登录
  login(data: object) {
    return request({
      url: "/auth/client-wx-login",
      data,
    });
  },

  // 换票
  refreshToken(data: object) {
    return request({
      url: "/auth/client-refresh-token",
      data,
    });
  },
};
