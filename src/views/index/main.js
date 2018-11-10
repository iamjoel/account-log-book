import moment from 'moment'
export default {
  data() {
    return {
      today: moment().format('YYYY年MM月DD日'),
      activeTypeIndex: 0,
      searchInput: '',
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