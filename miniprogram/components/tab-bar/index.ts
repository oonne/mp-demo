import { Utils } from '../../utils/index';

const { reLaunch } = Utils;

Component({
  options: {
    styleIsolation: "isolated",
  },
  properties: {
    // 底导航配置
    tabs: {
      type: Array,
      value: [] as TabItem[]
    },
    // 小红点数字
    badge: {
      type: Array,
      value: [] as TabBadge[],
      observer: 'onBadgeChange'
    },
    // 当前高亮tab的text
    active: {
      type: String,
      value: ''
    },
    // 高亮是否可以点击
    isActiveClick: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    // 数组形式的小红点数量，可直接通过下标读取
    badgeList: [] as TabBadge[]
  },

  methods: {
    /* 
     * 小红点数字变化
     */
    onBadgeChange() {
      const badgeList: TabBadge[] = this.properties.tabs.map(item => {
        const badge = this.data.badge.find(badgeItem => badgeItem.text === item.text);
        if (!badge) {
          return {
            text: item.text || '',
            badge: 0
          };
        }

        return badge;
      });

      this.setData({
        badgeList
      });
    },

    /* 
     * 点击
     */
    onTabTap(e: WechatMiniprogram.TouchEvent) {
      const { text } = e.currentTarget.dataset;
      if (text === this.data.active && !this.data.isActiveClick) {
        return;
      }

      const tabItem = this.data.tabs.find(item => item.text === text);
      console.log(tabItem);
      if (tabItem) {
        reLaunch(tabItem.path);
      }
    },
  }
});

