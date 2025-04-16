import { authApi } from "../../api/index";

const app = getApp<IAppOption>()

Component({
  data: {
    motto: 'Hello World',
  },
  methods: {
    onLoad() {
    },

    /* 请求接口 */
    async getLoginPow() {
      const [err, res] = await authApi.getLoginPow({
        name: 'cibf',
      });
      console.log(err, res);
    },
  },
})
