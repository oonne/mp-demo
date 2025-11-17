import { Utils } from '../../../utils/index';

const { reLaunch } = Utils;

/**
 * 错误页面
 */
Page({
  data: {
    title: '', // 页面标题
    content: '', // 说明文案
    showReloadBtn: true, // 是否显示重新进入按钮
  },

  onLoad(e) {
    console.log(e);
    this.setData({
      title: e.title || '出错啦',
      content: e.content || '',
      showReloadBtn: e.showReloadBtn === 'false' ? false : true,
    });
  },

  /**
   * 重新进入事件
   */
  reloadApp() {
    reLaunch('/pages/main/index');
  },
});
