/* 
 * 环境变量
 */
const devConfig = {
  api: 'https://api.dev.com',
}

const prodConfig = {
  api: 'https://api.wuyanxun.com',
}

/* 
 * 全局配置
 */
let config = {
  version: '0.0.1',
  env: 'prod',
  api: prodConfig.api,

  // 超时时间
  apiTimeOut: 10000,
  uploadTimeOut: 60000,
}

if (config.env === 'dev') {
  config = {
    ...config,
    ...devConfig,
  }
} else {
  config = {
    ...config,
    ...prodConfig,
  }
}

export default config;