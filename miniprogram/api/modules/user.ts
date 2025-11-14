import request from "../request";

export default {
  // 获取用户信息
  getUserDetail(data: object) {
    return request({
      url: '/user/client-get-detail',
      data,
    });
  }
};
