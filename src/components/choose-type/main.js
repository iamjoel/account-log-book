import {inType, outType} from '../../dict.js'
import checkRate from '../../assets/utils/checkRate.js'

export default {
  props: {
    type: String
  },
  data() {
    return {
      typeList: [],
      selectedType: {}
    }
  },
  mounted() {
    this.typeList = this.type === 'in' ? inType : outType
  },
  methods: {
    select(type) {
      this.selectedType = type
      
      this.$emit('input', type)
    },
    reset() {
      this.selectedType = {}
    }
  }
}