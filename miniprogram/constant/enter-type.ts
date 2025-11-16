/* 
 * 进入场景
 */
interface IEnterType {
  [key: string]: string;
}
const enterType: IEnterType = {
  // 邀请员工
  'INVITE_USER': '1',
  // 邀请友商
  'INVITE_MERCHANT': '2',
}

export default enterType;