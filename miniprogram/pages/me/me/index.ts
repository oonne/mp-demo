import tabBarConfig from "../../../config/tab-bar";
import state from "../../../global/state";
import { Utils} from '../../../utils/index';

const { navigateTo } = Utils;

/**
 * 个人中心
 */
Page({
  data: {
    avatar: state.user.avatar || '/assets/img/default-avatar.png',
    name: state.user.name || '点击登录',
    merchantName: '',
    roleName: '老板',

    contentHeight: 0,
    isAudit: state.isAudit,
    isTestUser: state.isTestUser,

    tabs: tabBarConfig,
    tabBadges: [],
  },

  onLoad() {
    this.updateContentHeight();
  },

  onShow() {
    this.refreshUserInfo();
  },

  /* 
   * 刷新用户信息
   */
  refreshUserInfo() {
    this.setData({
      avatar: state.user.avatar || '/assets/img/default-avatar.png',
      name: state.user.name || '点击登录',
      merchantName: '',
      roleName: '老板',
    });
  },
  
  /*
   * 更新内容高度 
   * 窗口高度-安全高度-顶导航高度
   */
  updateContentHeight() {
    const { windowHeight } = state.windowInfo;
    this.setData({
      contentHeight: windowHeight - state.safeAreaTop - state.safeAreaBottom - (128/2) - (96/2),
    });
  },

  /* 
   * 跳转指定页面
   */
  toPage(event: any){
    const {currentTarget: {dataset: {url}}} = event;
    navigateTo(url);
  }
});
