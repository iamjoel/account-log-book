import moment from 'moment'
import ChooseType from '@/components/choose-type/'

var logItemTemplate = { // 每一笔记录的模板
  type: null,
  classify: {},
  value: null,
  comment: null
}

const today = moment()

export default {
  components: {
    ChooseType
  },
  data() {
    return {
      today,
      isShowOut: false,
      isShowIn: false,
      curr: { // 当前记录的这笔
        ...logItemTemplate
      },
    }
  },
  computed: {
    outValue () {
      return 0
    },
    inValue () {
      return 0
    }
  },
  methods: {
    show(type) {
      this.curr = { // 重置之前的
        ...logItemTemplate,
        type
      }

      if(type === 'in') {
        this.isShowIn = true
      } else {
        this.isShowOut = true
      }

      // 重置组件的状态
      this.$nextTick(() => {
        if(type === 'in') {
          this.$refs.chooseInType.reset()
        } else {
          this.$refs.chooseOutType.reset()
        }
      })
    },
    save() {
      // this.$store.commit('saveData', this.datas)
    },
  }
}