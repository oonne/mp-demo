/**
 * 模态框组件
 */
Component({
  // 组件选项
  options: {
    multipleSlots: true,
    styleIsolation: "isolated",
  },
  properties: {
    maskClosable: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false
  },
  // 组件方法
  methods: {
    show() {
      this.setData({ visible: true });
    },
    hide() {
      this.setData({ visible: false });
    },
    // 点击遮罩层时关闭弹框
    onMaskTap() {
      if (!this.properties.maskClosable) {
        return;
      }
      this.hide();
    }
  },
});
