import {inType, outType} from '../../dict.js'
import checkRate from '../../assets/utils/checkRate.js'

export default {
   props: {
      inoutType: {
         type: String,
         default: ''
      },
   },
   model: {
     prop: 'currTypeClassify',
     event: 'pass-type-value'
   },
   data() {
   	 return {
         inoutTypeValues: [],
         currTypeId: '',
         currTypeValue: '',
   	 }
   },
   mounted() {
      this.showTypeValue()
   },
   watch: {

   },
   methods: {
      showTypeValue() {
        if(this.inoutType == 1) {
           this.inoutTypeValues = outType
        } else if(this.inoutType == 2) {
           this.inoutTypeValues = inType
        }
      },
      selectType(id) {
        this.currTypeId = id
        this.currTypeValue = this.inoutTypeValues[id-1].name
        console.log(this.currTypeValue)
        let currTypeClassify = {
           id: this.currTypeId,
           name: this.currTypeValue
        }
        
        this.$emit('pass-type-value', currTypeClassify)
      }
   }
  
}