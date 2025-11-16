const state: any = {
  /* 
   * 系统信息
   */
  // 是否在开发者工具中
  isDevTools: false,
  // 是否在电脑端
  isPC: false,
  // 顶部安全高度
  safeAreaTop: 0,
  // 底部安全高度
  safeAreaBottom: 0,
  // 状态栏高度
  statusBarHeight: 0,
  // 窗口信息
  windowInfo: {
    pixelRatio: 0,
    screenWidth: 0,
    screenHeight: 0,
    windowHeight: 0,
    windowWidth: 0,
    statusBarHeight: 0,
    safeArea: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    },
    screenTop: 0,
  },
  // 胶囊位置
  menuButtonObject: {
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  /* 
   * 基础信息
   */
  // 进入参数
  entryParams: {
    type: '',
  },
  // 是否审核中
  isAudit: false,
  // 是否测试人员
  isTestUser: false,

  /* 
   * 用户信息
   */
  uuid: '',
  token: '',
  user: {
    openId: '',
    unionId: '',
    userId: '',
    merchantId: '',
    merchantUserName: '',
    merchantUserRole: '',
    mobile: '',
    name: '',
    avatar: '',
  },
  /* 
   * 商户信息
   */
  merchant: {

  },
}

export default state;
