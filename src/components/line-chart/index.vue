<template>
  <div :id="id"></div>
</template>

<script>
import F2 from '@antv/f2'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    charData: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    id: String
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart: function () {
      this.chart && this.chart.destory()
      this.chart = new F2.Chart({
        container: this.id,
        width: 600,
        height: 300
      })
      this.chart.source(this.charData)
      this.chart.scale('value', {
        min: 0
      })
      this.chart.scale('year', {
        range: [0, 1]
      })
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.chart.line().position('year*value')
      this.chart.point().position('year*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })
      this.chart.render()
    }
  }
}
</script>