import { Utils, to} from '../utils/index';
import state from '../global/state';
import { refreshToken } from '../global/service';
import config from '../config/config';

const { randomChars } = Utils;
/*
 * 生成请求id
 * 格式： 毫秒时间戳 - UUID末4位 - 4位随机数
 */
const generateReqId = () => {
  const timestamp = new Date().getTime();
  const uuid = state.uuid;
  return `${timestamp}-${uuid.slice(-4)}-${randomChars(4)}`;
};

// HTTP Request Header
const buildGatewayHeader = (header = {}) => {
  const newHeader = {
    'Authorization': `Bearer ${state.token}`,
    'x-version': config.version,
    'x-uuid': state.uuid,
    'x-reqid': generateReqId(),
    'x-lang': 'zh-CN',
    ...header,
  };

  return newHeader;
};

interface RequestOptions {
  url: string;
  method?: 'POST' | 'GET';
  data: any;
  timeout?: number;
}

/* 
 * 请求
 * @param opt 请求参数
 * @returns 请求结果
 */
const request = (opt: RequestOptions) => {
  if (!opt.data) {
    opt.data = {};
  }

  const params = {
    method: 'POST',
    timeout: config.apiTimeOut,
    data: {},
    ...JSON.parse(JSON.stringify(opt)),
  };

  return new Promise((resolve, reject) => {
    const newOptions = {
      ...params,
      url: `${config.api}${params.url}`,
      header: buildGatewayHeader(params.header),
      data: params.data,
      enableHttp2: true,
    };

    async function success(res: any) {
      if ([200, 201].includes(res.statusCode)) {
        resolve(res.data);
        return;
      }
      
      // 如果是401，清空token，重新换票。本次请求直接失败，避免重复循环
      if (res.statusCode === 401) {
        state.token = '';
        wx.removeStorageSync('TOKEN_REFRESH_TIME');
        await refreshToken();
        reject(res.data);
      }

      reject(res.data);
    }

    function fail(err: any) {
      reject(err);
    }

    wx.request({ ...newOptions, success, fail });
  }).catch((err) => {
    return Promise.reject(err);
  });
};

/* 
 * 异步封装
 */
const req = async(opt: RequestOptions) => {
  const [err, res] = await to(request(opt));
  return [err, res];
};

export default req;
