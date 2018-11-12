import moment from 'moment'

import InValue from '@/components/Insert'


export default {
  components: {
    InValue
  },
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
    },
    
    
  }
}