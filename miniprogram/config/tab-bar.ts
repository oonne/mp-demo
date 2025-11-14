/* 
 * 底导航
 */
const tabBarConfig: TabItem[] = [
  {
    path: '/pages/demo/basic/index',
    icon: '/assets/tab-bar/home.png',
    activeIcon: '/assets/tab-bar/home-active.png',
    text: '首页',
  },
  {
    path: '/pages/demo/ui/index',
    icon: '/assets/tab-bar/order.png',
    activeIcon: '/assets/tab-bar/order-active.png',
    text: '订单',
  },
  {
    path: '/pages/demo/custom/index',
    icon: '/assets/tab-bar/customer.png',
    activeIcon: '/assets/tab-bar/custom-active.png',
    text: '我的',
  },
];

export default tabBarConfig;