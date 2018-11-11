# 安全记账本
数据不会被窃取的个人记账本。数据都存在本地，需要时，可以灵活导出。

## 页面&功能
* 记一笔页面。
  * 记录支出。选择类型，填写金额。
  * 记录收入。选择类型，填写金额。
  * 今天的收支情况。
* 统计页面。从 本月，上月 的时间维度上统计收支信息，包括
  * 概览
    * 盈余 `收入 - 支出`。
    * 支出及按支出分类显示的饼状图。
    * 收入及按支出分类显示的饼状图。
  * 每日详情。
    * 用折线图展示，每天的收入和支出。
* 导出
  * 导出收支数据。导出的一个 Excel 文件，每个 Tab 展示一个月的数据。

说明，收支数据都存在 localStorage 中，因此不需要服务器。

## 数据结构
### 支出类型

```
[
  {
    id: 1,
    name: '餐饮'
  },
  {
    id: 2,
    name: '购物'
  },
  ...
]
```

在 `dict.js` 的 `outType` 中查看全部。

### 收入类型

```
[
  {
    id: 1,
    name: '工资'
  },
  {
    id: 2,
    name: '利息'
  },
  ...
]
```

在 `dict.js` 的 `inType` 中查看全部。


## 收支数据
```
{
  '2018': {// 年
    '09': { // 月
      '10': [ //'日'
        {
          type: 1, // 1: 支出, 2,收入
          moneyClassifyId: 1, // 分类 id。
          moneyClassifyName: '早餐', // 分类名称，冗杂下。
          value: 10.5, // 金额
          comment: '1碗粥，1个鸡蛋'
        },
        ...
      ]
    }
  }
}
```

## 运行
1 安装依赖：  

1. `npm install`

推荐用[Yarn](https://yarnpkg.com/en/docs/install):
1. 安装 [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

2 启动 `npm run dev`

## 构建
1. `npm run build`
1. 打开 `dist` 下的 `index.html` 来查看效果。
