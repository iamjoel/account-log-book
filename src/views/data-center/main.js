import XLSX from 'xlsx'; //导出EXCEL库

export default {
  data() {
    return {

    }  
  },
  methods: {
    exportData() {
      const wb = XLSX.utils.book_new();
      let logData = this.$store.state.log

      if(logData) {
        for(let year in logData) {
          for(let month in logData[year]) {
            let monthData = []
            let sheetName = `${year}年${padZero(month)}月`
            var total = 0
            var inTotal = 0
            var outTotal = 0
            for(let day in logData[year][month]) {
              logData[year][month][day].forEach(item => {
                let value
                if(item.type === 'in') {
                  value = `+${item.value}`
                  total += item.value
                  inTotal += item.value
                } else {
                  value = `-${item.value}`
                  total -= item.value
                  outTotal += item.value
                }
                monthData.push([
                  padZero(day),
                  value,
                  item.classify.name,
                  item.comment
                ])
              })
            }
            
            const ws = XLSX.utils.aoa_to_sheet([
                ['盈余', total],
                ['支出', outTotal],
                ['收入', inTotal],
                [],// 空行
                ["日期", "金额", "费用类型",  "备注"],
                ...monthData,
            ]);

            XLSX.utils.book_append_sheet(wb, ws, sheetName);
          }
        }
      }
      XLSX.writeFile(wb, "个人帐单.xlsx");
    },
    clearData() {
      this.$store.commit('clearData')
      this.$toast.success('清空成功！')
    }
  },
  
}

function padZero(number) {
  return parseInt(number, 10) < 10 ? ('0' + number) : number
}