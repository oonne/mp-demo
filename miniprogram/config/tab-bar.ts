/* 
 * 底导航
 */
const tabBarConfig: TabItem[] = [
  {
    path: '/pages/home/home/index',
    icon: '/assets/tab-bar/home.png',
    activeIcon: '/assets/tab-bar/home-active.png',
    text: '首页',
  },
  {
    path: '/pages/order/sale-order-list/index',
    icon: '/assets/tab-bar/order.png',
    activeIcon: '/assets/tab-bar/order-active.png',
    text: '销售单',
  },
  {
    path: '/pages/order/purchase-order-list/index',
    icon: '/assets/tab-bar/purchase.png',
    activeIcon: '/assets/tab-bar/purchase-active.png',
    text: '采购单',
  },
  {
    path: '/pages/me/me/index',
    icon: '/assets/tab-bar/me.png',
    activeIcon: '/assets/tab-bar/me-active.png',
    text: '我的',
  },
];

export default tabBarConfig;