/* 
 * 错误码
 */
interface IErrorCode {
  [key: number | string]: string;
}
const errorCode: IErrorCode = {
  401: '请重新登录',
  1000000: '未知错误',
  1000001: '非法请求',

  1001002: '登录失败',
  1001003: '换票失败',
}

export default errorCode;