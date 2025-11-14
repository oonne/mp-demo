import request from "../request";

export default {
  // 获取手机号
  getPhoneNumber(data: object) {
    return request({
      url: '/wx/client-get-phone-number',
      data,
    });
  }
};
