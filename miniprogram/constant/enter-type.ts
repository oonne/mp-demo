/* 
 * 进入场景
 */
interface IEnterType {
  [key: string]: string;
}
const enterType: IEnterType = {
  // 邀请友商
  'INVITE_MERCHANT': '1',
  // 邀请员工
  'INVITE_USER': '2',
}

export default enterType;