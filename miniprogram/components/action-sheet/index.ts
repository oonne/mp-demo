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
    // 显示高度（rpx），根据内容计算，最大不超过 600
    height: {
      type: Number,
      value: 600
    }
  },

  observers: {
    'options': function(options: any[]) {
      // 每个选项的高度：padding(32*2) + 字体高度(32*1.5) + 分隔线(1) ≈ 113rpx
      const itemHeight = 113;
      const calculatedHeight = options.length * itemHeight;
      // 最大不超过 600rpx
      const finalHeight = Math.min(calculatedHeight, 600);
      this.setData({
        height: finalHeight
      });
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

