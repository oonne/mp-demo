Component({
  options: {
    multipleSlots: true,
    styleIsolation: "isolated",
  },
  
  properties: {
    // 选项数组
    options: {
      type: Array,
      value: []
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 最大显示高度（rpx）
    maxHeight: {
      type: Number,
      value: 600
    }
  },

  data: {
  },

  methods: {
    show() {
      const bottomSheet = this.selectComponent('#actionSheetBottomSheet');
      bottomSheet.show();
    },

    hide() {
      const bottomSheet = this.selectComponent('#actionSheetBottomSheet');
      bottomSheet.hide();
    },

    // 点击选项
    onOptionTap(e: any) {
      const index = e.currentTarget.dataset.index;
      this.hide();
      // 触发选择事件，返回选中的下标
      this.triggerEvent('select', { index });
    },

    // 点击取消
    onCancelTap() {
      this.hide();
      this.triggerEvent('cancel');
    }
  }
});

