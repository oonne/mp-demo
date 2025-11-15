import state from "../../global/state";
import { Utils } from "../../utils/index";

const { reLaunch } = Utils;

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: "",
    },
    title: {
      type: String,
      value: "",
    },
    background: {
      type: String,
      value: "",
    },
    color: {
      type: String,
      value: "",
    },
    back: {
      type: Boolean,
      value: false,
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    innerPaddingRight: "",
    leftWidth: "",
  },
  lifetimes: {
    attached() {
      this.setData({
        innerPaddingRight: `padding-right: ${
          state.windowInfo.windowWidth - state.menuButtonObject.left
        }px`,
        leftWidth: `width: ${
          state.windowInfo.windowWidth - state.menuButtonObject.left
        }px`,
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页
    back() {
      const { delta } = this.data;

      if (delta) {
        wx.navigateBack({
          delta: delta,
        });
      }

      this.triggerEvent("back", { delta: delta }, {});
    },
    // 返回首页
    home() {
      reLaunch("/pages/home/home/index");
    },
  },
});
