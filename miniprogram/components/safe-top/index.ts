import state from '../../global/state';

/**
 * 顶部安全区
 */
Component({
  options: {
    styleIsolation: "isolated",
  },
  data: {
    safeAreaTop: 0,
    statusBarHeight: 0,
  },
  // 组件生命周期
  lifetimes: {
    created() {
      this.init();
    },
  },
  // 组件方法
  methods: {
    /* 初始化 */
    init() {
      this.setData({
        safeAreaTop: state.safeAreaTop,
        statusBarHeight: state.statusBarHeight,
      });
    },
  },
});
