import { Utils } from '../../../utils/index';

const { reLaunch } = Utils;

/**
 * 错误页面
 */
Page({
  data: {
    title: '', // 页面标题
    content: '', // 说明文案
  },

  onLoad(e) {
    this.setData({
      title: e.title || '出错啦',
      content: e.content || '',
    });
  },

  /**
   * 重新进入事件
   */
  reloadApp() {
    reLaunch('/pages/main/index');
  },
});
