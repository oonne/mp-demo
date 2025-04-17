/**
 * Demo:
 */
Page({
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
