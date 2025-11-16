import { Utils} from '../../../utils/index';

const { navigateTo } = Utils;

/**
 * Demo 列表
 */
Page({
  toPage(event: any){
    const {currentTarget: {dataset: {url}}} = event;
    navigateTo(url);
  }
});
