import moment from 'moment'
import {inType, outType} from '@/dict.js'

import F2 from '@antv/f2'
var Util = F2.Util;
var G = F2.G;
var Group = G.Group

import {getPlainMonthData, getMonthValue} from '@/assets/utils/log-data-utils'

const ym = moment()
const year = ym.year()
const month = ym.month() + 1
const day = ym.date()

var curMonthDay = []
for(let i = 1; i < (day + 1); i++) {
  curMonthDay.push(i)
}

export default {
  
  data() {
    return {
      isShowOut: false,
      isShowIn: false,
      currDate: moment(),
      prevMonthDate: moment().add('month', -1),
      activeDate: moment(), // 当前统计是时间
      activeMonthPlainData: [],
      outMonthValue: 0,
      inMonthValue: 0,
      everydayOutValue: [],
      everydayInValue: [],
      serverData: []
    }
  },
  computed: {
    surplus() { // 盈余
      var res = this.inMonthValue - this.outMonthValue
      if(res > 0) {
        res = '+' + res
      }
      return res
    }
  },
  mounted() {
    this.updateSummary() // 收入，支出的概览
  },
  methods: {
    showClassifyType(type) {
      if(type === 'in') {
        this.isShowIn = true
        this.renderClassifyChart('in')
      } else {
        this.isShowOut = true
        this.renderClassifyChart('out')
      }
    },
    // 按类型分类的饼图
    renderClassifyChart(type) {
      var activeType = type === 'in' ? inType : outType
      var activeMonthData = this.activeMonthPlainData.filter(item => item.type === type)
      
      var allTotal = 0
      var data = activeType
        .map(type => {
          var total = 0
          activeMonthData.forEach(itemLog => {
            if(itemLog.classify.id === type.id) {
              total += itemLog.value
              allTotal += itemLog.value
            }
          })
          return {
            name: type.name,
            total,
            a: '1'
          }
        })
        .filter(item => {
          return item.total !== 0
        })
      
      this.$nextTick(() => {
        var chart = new F2.Chart({
          id: `${type}-classify-chart`,
          pixelRatio: window.devicePixelRatio
        })

        chart.source(data) // 载入数据
        var lastClickedShape

        chart.legend({
          position: 'bottom',
          offsetY: -5,
          marker: 'square',
          align: 'center',
          onClick: function onClick(ev) {
            var clickedItem = ev.clickedItem;
            var dataValue = clickedItem.get('dataValue');
            var canvas = chart.get('canvas');
            var coord = chart.get('coord');
            var geom = chart.get('geoms')[0];
            var container = geom.get('container');
            var shapes = geom.get('shapes'); // 只有带精细动画的 geom 才有 shapes 这个属性

            var clickedShape;
            // 找到被点击的 shape
            Util.each(shapes, function(shape) {
              var origin = shape.get('origin');
              if (origin && origin._origin.name === dataValue) {
                clickedShape = shape;
                return false;
              }
            });

            if (lastClickedShape) {
              lastClickedShape.animate().to({
                attrs: {
                  lineWidth: 0
                },
                duration: 200
              }).onStart(function() {
                if (lastClickedShape.label) {
                  lastClickedShape.label.hide();
                }
              }).onEnd(function() {
                lastClickedShape.set('selected', false);
              });
            }

            if (clickedShape.get('selected')) {
              clickedShape.animate().to({
                attrs: {
                  lineWidth: 0
                },
                duration: 200
              }).onStart(function() {
                if (clickedShape.label) {
                  clickedShape.label.hide();
                }
              }).onEnd(function() {
                clickedShape.set('selected', false);
              });
            } else {
              var color = clickedShape.attr('fill');
              clickedShape.animate().to({
                attrs: {
                  lineWidth: 5
                },
                duration: 350,
                easing: 'bounceOut'
              }).onStart(function() {
                clickedShape.attr('stroke', color);
                clickedShape.set('zIndex', 1);
                container.sort();
              }).onEnd(function() {
                clickedShape.set('selected', true);
                clickedShape.set('zIndex', 0);
                container.sort();
                lastClickedShape = clickedShape;
                if (clickedShape.label) {
                  clickedShape.label.show();
                } else {
                  drawLabel(clickedShape, coord, canvas);
                }
                canvas.draw();
              });
            }
          }
        })

        chart.coord('polar', {
          transposed: true,
          innerRadius: 0.7,
          radius: 1.5
        })

        chart.axis(false);
        chart.tooltip(false)

        chart
          .interval()
          .position('a*total').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
          .adjust('stack');

        chart.guide().text({
          position: ['50%', '50%'],
          content: allTotal + '元',
          style: {
            fontSize: 20
          }
        })
        chart.render();

      })
    },
    updateSummary() {
      var year = this.activeDate.year()
      var month = this.activeDate.month() + 1
      this.activeMonthPlainData = getPlainMonthData(this.$store.state.log, year, month)
      this.outMonthValue = getMonthValue(this.activeMonthPlainData, 'out')
      this.inMonthValue = getMonthValue(this.activeMonthPlainData, 'in')
    }
  }
}

function drawLabel(shape, coord, canvas) {
  var center = coord.center;
  var origin = shape.get('origin');
  var points = origin.points;
  var x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
  var x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
  var y = (points[0].y + points[1].y) / 2;
  var point1 = coord.convertPoint({
    x: x1,
    y: y
  });
  var point2 = coord.convertPoint({
    x: x2,
    y: y
  });

  var group = new Group();
  group.addShape('Line', {
    attrs: {
      x1: point1.x,
      y1: point1.y,
      x2: point2.x,
      y2: point2.y,
      lineDash: [0, 2, 2],
      stroke: '#808080'
    }
  });
  var text = group.addShape('Text', {
    attrs: {
      x: point2.x,
      y: point2.y,
      text: origin._origin.name + '  ' + origin._origin.total + ' 元',
      fill: '#808080',
      textAlign: 'start',
      textBaseline: 'bottom'
    }
  });
  var textWidth = text.getBBox().width;
  var baseLine = group.addShape('Line', {
    attrs: {
      x1: point2.x,
      y1: point2.y,
      x2: point2.x,
      y2: point2.y,
      stroke: '#808080'
    }
  });
  if (point2.x > center.x) {
    baseLine.attr('x2', point2.x + textWidth);
  } else if (point2.x < center.x) {
    text.attr('textAlign', 'end');
    baseLine.attr('x2', point2.x - textWidth);
  } else {
    text.attr('textAlign', 'center');
    text.attr('textBaseline', 'top');
  }
  canvas.add(group);
  shape.label = group;
}