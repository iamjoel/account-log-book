// import {inType, outType} from '../../dict.js'
// import checkRate from '../../assets/utils/checkRate.js'

export default {
   data() {
   	 return {
   	 	// types: [],
      //   payInput: outType[0].name,
      //   payMoney: '',
      //   pickerisShow: false,

   	 }
   },
   // mounted() {
   //    let types= [];
   //    outType.map(val => {
   //      this.payTypes.push(val.name)
   //    })
   // },
   // methods: {
   // 	  paySubmit() { //提交保存到localstorage
   //       let i = 0;
   //       if(!checkRate(this.payMoney)) {
   //         this.payMoney = ''
   //       }
   //       if(this.payInput && this.payMoney && checkRate(this.payMoney)) {
   //          i++;
   //          let payData = {
   //                date: this.today,
   //                payInput: this.payInput,
   //                payMoney: this.payMoney
   //              }
   //          let payDataList = JSON.parse(window.localStorage.getItem('payDataList') || '[]')
   //          payDataList.unshift(payData)
            
   //          window.localStorage.setItem('payDataList', JSON.stringify(payDataList))
   //          this.isShowOut = false
   //       }
      
   //    },
   //    pickerPayShow() { //选择类型弹出框
   //    this.pickerisShow = true;
   //  },
   //  onChange(picker, value, index) { //类型变化时
   //     this.payInput = value
   //  },
   // }
}