import { Utils} from '../../../utils/index';
import state from '../../../global/state';

const { navigateTo } = Utils;

/**
 * Demo 列表
 */
Page({
  onLoad() {
    console.log(state.token);
  },

  toPage(event: any){
    const {currentTarget: {dataset: {url}}} = event;
    navigateTo(url);
  }
});
