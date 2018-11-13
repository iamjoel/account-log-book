import moment from 'moment'
import {inType, outType} from '../../dict.js'
import checkRate from '../../assets/utils/checkRate.js'

export default {
   props: {
      popType: {
         type: String,
         default: 'outType'
      }
   },
   data() {
   	 return {
         today: moment().format('YYYY年MM月DD日'),
   	 	types: [],
         money: '',
         payinTypes: [],
         btnType: 'default',
         typeSelect: ''
   	 }
   },
   mounted() {
      this.showTypes()
   },
   watch: {
     popType(newValue, oldValue) {
         this.payinTypes = []
         this.showTypes()
     }
   },
   methods: {
       //显示支出收入类型
       showTypes() {
          if(this.popType == "outType") {
            outType.map(val => {
              this.payinTypes.push(val.name)
            })
         } else if(this.popType == "inType") {
            inType.map(val => {
              this.payinTypes.push(val.name)
            })
         }
       },
       //按钮点中
       selectType(index) {
           console.log(index)
           for(let i = 0; i < this.payinTypes.length; i++) {
              this.$refs.typeName[i].type = 'default'
           }
           
           this.$refs.typeName[index].type = 'primary'
           this.typeSelect = this.payinTypes[index]
       },

       //提交保存到localstorage
       payinSub() { 
            if(!checkRate(this.money)) {
              this.money = ''
            }
            if(!this.typeSelect) {
               this.$toast('请选择类别');
            }
            if(this.typeSelect && this.money && checkRate(this.money)) {
               let payinData = {
                     date: this.today,
                     payInput: this.typeSelect,
                     money: this.money
                   }
               let payinDataList;
               if(this.popType == "outType") {
                  payinDataList = "outType"
               } else if(this.popType == "inType") {
                  payinDataList = "inType"
               }
               
               let list = JSON.parse(window.localStorage.getItem(`${payinDataList}list`) || '[]')
               //追加数据
               list.unshift(payinData)
               
               window.localStorage.setItem(`${payinDataList}list`, JSON.stringify(list))
               this.isShow = false
            }
         
       },
        
   }
  
}