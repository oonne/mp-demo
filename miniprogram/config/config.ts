interface IConfig {
  [key: string]: any;
}

/* 
 * 环境变量
 */
const devConfig = {
  api: 'http://127.0.0.1:10022',
  ossUrl: 'https://runawaystar.oss-cn-shenzhen.aliyuncs.com',
  ossPath: 'youdan/dev',
}

const testConfig = {
  api: 'https:/youdan-api.any-print.com',
  ossUrl: 'https://runawaystar.oss-cn-shenzhen.aliyuncs.com',
  ossPath: 'youdan/test',
}

const prodConfig = {
  api: 'https://api.wuyanxun.com',
  ossUrl: 'https://runawaystar.oss-cn-shenzhen.aliyuncs.com',
  ossPath: 'youdan/prod',
}

/* 
 * 全局配置
 */
let config: IConfig = {
  version: '0.0.1',
  env: 'dev',
  api: prodConfig.api,

  // 超时时间
  apiTimeOut: 10000,
  uploadTimeOut: 60000,

  // token刷新时间
  tokenRefreshTime: 1000 * 60 * 60 * 12,

  // 分页大小
  pageSize: 10,
}

if (config.env === 'dev') {
  config = {
    ...config,
    ...devConfig,
  }
} else if (config.env === 'test') {
  config = {
    ...config,
    ...testConfig,
  }
} else {
  config = {
    ...config,
    ...prodConfig,
  }
}

export default config;