import errorCode from '../constant/error-code';

interface IProps {
  err?: any;
  defaultMsg?: string;
}

/*
 * 构造错误提示语
 * params {object} err 错误对象
 * params {string} defaultMsg 默认错误提示语
 */
const buildErrorMsg = (props: IProps): string => {
  const { err, defaultMsg } = props;

  if (!err && defaultMsg) {
    return defaultMsg;
  }

  // 如果有错误码，直接返回错误码
  const errCode = err.code;
  if (errorCode[errCode]) {
    return errorCode[errCode];
  }

  // 如果是微信的错误，直接返回错误信息
  if (err?.errMsg) {
    return err.errMsg;
  }

  // 否则返回默认值
  return defaultMsg || '错误';
};

export default buildErrorMsg;
