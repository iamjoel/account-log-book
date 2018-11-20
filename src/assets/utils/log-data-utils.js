/*
* {yyyy: {mm: {d1: [], d2: [], ...}}}
* => {day: d1, ...value}, {day: d2, ...value}...]}
*/
export const getPlainMonthData = (data, year, month) => {
  if(!data || !data[year] || !data[year][month]) {
    return []
  }

  var res = []

  data = data[year][month]
  // 一个月最多 31 天
  for (var day = 1; day <= 31; day++) {
    if(data[day]) {
      let dayData = data[day]
      dayData.forEach(item => {
        res.push({
          day,
          ...item
        })
      })
    }
  }
  return res
}

/*
* type: in|out
*/
export const getMonthValue = (plainMonthData, type) => {
  var value = 0
  plainMonthData
    .filter(item => item.type === type)
    .forEach(item => {
      value += item.value
    })
  return value
}
