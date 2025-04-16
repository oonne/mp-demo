/**
 *  获取n位的数字随机数
 */
const randomDigits = (n: number): number => {
  if (n > 21) {
    return 0;
  }
  return Math.round((Math.random() + 1) * 10 ** (n - 1));
};

/**
 *  获取n以内的随机整数
 */
const randomWithin = (n: number): number => Math.floor(Math.random() * n);

/**
 *  获取n位的随机数字或字母
 */
const randomChars = (n: number): string => {
  const arr: string[] = [];
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

  for (let i = 0; i < n; i += 1) {
    arr.push(chars[randomWithin(chars.length)]);
  }

  return arr.join("");
};

/**
 *  延迟一定时间，单位毫秒。
 */
const sleep = async (time: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

/**
 * 函数防抖
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (fn: Function, waitTime: number) => {
  let timer: Timer = null;

  return (...args: any[]) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    // 停止触发n秒后才执行
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, waitTime);
  };
};

/*
 * 16进制的颜色转化为rgb
 */
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
};

/**
 * 拼接url参数
 */
const obj2url = (params: Record<string, any>) => {
  if (params) {
    return Object.keys(params)
      .sort()
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  }

  return "";
};

export default {
  randomDigits,
  randomWithin,
  randomChars,
  sleep,
  debounce,
  hexToRgb,
  obj2url,
};
