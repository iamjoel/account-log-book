import moment from 'moment'

import insert from '../../components/insert/insert'


export default {
  components: {
    insert
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