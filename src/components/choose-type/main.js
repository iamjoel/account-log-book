import {inType, outType} from '@/dict.js'

export default {
  props: {
    type: String,
    value: Object
  },
  data() {
    return {
      typeList: [],
      selectedType: {id: 5}
    }
  },
  mounted() {
    this.typeList = this.type === 'in' ? inType : outType
    if(this.value) {
      console.log(this.value)
      this.selectedType = {...this.value}
    }
  },
  methods: {
    select(type) {
      this.selectedType = type
      this.$emit('input', type)
    },
    update(value) {
      this.selectedType = value
    }
  }
}