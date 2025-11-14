import tabBarConfig from "../../../config/tab-bar";

/**
 * Demo UI交互
 */
Page({
  data: {
    tabs: tabBarConfig,
    tabBadges: [{
      text: '订单',
      badge: 12,
    }]
  },

  /* 
   * 显示模态框
   */
  showModal() {
    const modal = this.selectComponent('#myModal');
    modal.show();
  },

  /* 
   * 隐藏模态框
   */
  hideModal() {
    const modal = this.selectComponent('#myModal');
    modal.hide();
  },

  /* 
   * 显示底部弹窗
   */
  showBottomSheet() {
    const bottomSheet = this.selectComponent('#myBottomSheet');
    bottomSheet.show();
  },
});
