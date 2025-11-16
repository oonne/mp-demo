import request from "../request";

export default {
  // 获取用户信息
  getUserDetail(data: object) {
    return request({
      url: '/user/client-get-detail',
      data,
    });
  },

  // 更新用户信息
  updateUserInfo(data: object) {
    return request({
      url: '/user/client-update',
      data,
    });
  }
};
