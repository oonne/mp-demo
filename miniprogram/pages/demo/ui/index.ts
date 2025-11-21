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
    }],
    actionSheetOptions: ['获取手机号', '分享团队主页']
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

  /* 
   * 显示操作菜单
   */
  showActionSheet() {
    const actionSheet = this.selectComponent('#myActionSheet');
    actionSheet.show();
  },

  /* 
   * 操作菜单选择事件
   */
  onActionSheetSelect(e: any) {
    const { index } = e.detail;
    console.log('选择了第', index, '项:', this.data.actionSheetOptions[index]);
    wx.showToast({
      title: `选择了: ${this.data.actionSheetOptions[index]}`,
      icon: 'none'
    });
  },

  /* 
   * 操作菜单取消事件
   */
  onActionSheetCancel() {
    console.log('取消了操作');
  },
});
