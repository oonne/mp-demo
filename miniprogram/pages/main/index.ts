import config from '../../config/config';

const app = getApp<IAppOption>()

Component({
  data: {
    motto: 'Hello World',
  },
  methods: {
    onLoad() {
      console.log(config.env)
    },
  },
})
