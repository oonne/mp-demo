import request from "../request";

export default {
  // 登录
  login(data: any) {
    return request({
      method: "POST",
      url: "/auth/login",
      data,
    });
  },
};
