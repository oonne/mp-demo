import config from './config/config';

App<IAppOption>({
  onLaunch() {
    console.log('--------------开始加载--------------');
    console.log(`环境: ${config.env} 版本: ${config.version}`);
  },
})