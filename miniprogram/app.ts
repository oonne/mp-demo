import config from "./config/config";
import state from "./gloable/state";
import { Utils } from "./utils/index";

const { randomChars } = Utils;

App<IAppOption>({
  onLaunch() {
    console.log("--------------开始加载--------------");
    console.log(`环境: ${config.env} 版本: ${config.version}`);
    this.generateUUID();
  },

  /*
   * 生成UUID
   * 格式： 12位随机数字或字母（或广告ID末12位）+连词符+4位随机数字或字母
   */
  generateUUID() {
    const uuid = wx.getStorageSync("UUID");
    if (!uuid) {
      const uuid = `${randomChars(12)}-${randomChars(4)}`;
      wx.setStorageSync("uuid", uuid);
    }
    state.uuid = uuid;
  },
});
