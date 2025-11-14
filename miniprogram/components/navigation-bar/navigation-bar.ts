import state from "../../global/state";

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
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: "_showChange",
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: "",
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
    _showChange(show: boolean) {
      const animated = this.data.animated;
      let displayStyle = "";
      if (animated) {
        displayStyle = `opacity: ${show ? "1" : "0"};transition:opacity 0.5s;`;
      } else {
        displayStyle = `display: ${show ? "" : "none"}`;
      }

      this.setData({
        displayStyle,
      });
    },
    back() {
      const { delta } = this.data;

      console.log(delta);

      if (delta) {
        wx.navigateBack({
          delta: delta,
        });
      }

      this.triggerEvent("back", { delta: delta }, {});
    },
  },
});
