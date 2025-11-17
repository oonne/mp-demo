import request from "../request";

export default {
  // 获取设置
  getClientSetting(data: object) {
    return request({
      url: "/setting/client-get-mp-setting",
      data,
    });
  },
};
