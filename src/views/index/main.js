import moment from 'moment'
import InValue from '@/components/insert/index.vue'

export default {
  components: {
    InValue
  },
  data() {
    return {
      today: moment().format('YYYY年MM月DD日'),
      isShow: false,
      popType: '',
    }  
  },
  
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    },
    popShow(arg) {
      this.popType = arg
      this.isShow = true
      
    },

    
  }
}