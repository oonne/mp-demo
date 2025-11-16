import request from "../request";

export default {
  // 获取审核版本号
  getAuditVersion(data: object) {
    return request({
      url: "/setting/client-get-mp-audit-version",
      data,
    });
  },
};
