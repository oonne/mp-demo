/**
 * 加载中图标
 */
Component({
  options: {
    styleIsolation: "isolated",
  },
  properties: {
    /**
     * 样式类型：circle-圆环旋转，dots-圆点跳动
     * 默认值：circle
     */
    type: {
      type: String,
      value: "circle",
    },
  },
});
