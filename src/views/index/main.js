import moment from 'moment'
export default {
  data() {
    return {
      today: moment().format('YYYY年MM月DD日'),
      isShowOut: false,
      isShowIn: false,
    }  
  },
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    }
  }
}