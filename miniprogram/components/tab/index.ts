/**
 * Tab 组件
 * 参考 WeUI navbar 样式和交互
 */
Component({
  options: {
    styleIsolation: "isolated",
  },
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 外部样式类
     */
    extClass: {
      type: String,
      value: "",
    },
    /**
     * Tab 选项列表
     */
    items: {
      type: Array,
      value: [] as string[],
    },
    /**
     * 当前选中的索引
     */
    current: {
      type: Number,
      value: 0,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击 Tab 项
     */
    onItemTap(e: WechatMiniprogram.TouchEvent) {
      const { index } = e.currentTarget.dataset;
      const idx = parseInt(index, 10);
      
      if (idx === this.data.current) {
        return;
      }

      this.setData({
        current: idx,
      });

      // 触发 change 事件
      this.triggerEvent("change", {
        index: idx,
        item: this.data.items[idx],
      });
    },
  },
});