import moment from 'moment'
import RadioButton from '@/components/radio-button/'
import checkRate from '../../assets/utils/checkRate.js'

export default {
  components: {
    "radio-button": RadioButton
  },
  data() {
    return {
      today: moment().format('YYYY年MM月DD日'),
      isShowOut: false,
      isShowIn: false,
      money: '',
      typeValue: '',
      comment: '',
      datas: {},
      datasList: [],
      todayOut: 0,
      todayIn: 0
    }  
  },
  mounted() {
     this.getOutInInit()
  },
  computed: {
      getTodayOut () {
        
        this.todayOut = this.$store.state.outMoney
        return this.todayOut

      },
      getTodayIn () {
        this.todayIn = this.$store.state.inMoney
        return this.todayIn
      }
  },
 
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    },
    
    getOutInInit() {
       let year = moment().format('YYYY');
       let month = moment().format('MM');
       let date = moment().format('DD');

       let datasList = JSON.parse(localStorage.getItem("list"));
       
       let todayDatasList = datasList.filter(checkValue);
       function checkValue(val) {
           return val[year][month][date] != undefined
       }
       
       for (let val of todayDatasList) {
         if(val[year][month][date].type == 1) {
         
           this.todayOut += parseInt(val[year][month][date].value)
            
         } else if(val[year][month][date].type == 2) {
           this.todayIn += parseInt(val[year][month][date].value)
         }
       }
       
    },

    outInSubmit(type) {

       if(!checkRate(this.money)) {
         this.money = ''
       }
       if(!this.typeValue) {
          this.$toast('请选择类别');
       }
       this.isShowOut = false
       this.isShowIn = false

       this.datas = {
          
          type: type,
          moneyClassifyId: this.typeValue.id,
          moneyClassifyName: this.typeValue.name,
          value: this.money,
          comment: this.comment
              
       }
      
       this.$store.commit('saveData', this.datas)
    },

    
  }
}