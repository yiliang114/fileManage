export default [
  {
    name: '数据资管',
    icon: 'dashboard',
    url: 'dashboard',
    children: [
      { name: '数据概览', url: 'data-overview' },
      { 
        name: '数据对接',
        url: 'data-butt',
        children: [
          {
            name: '新建数据源',
            url: 'data-source',
            before: 'data-butt', 
          },
          {
            name: '数据导入',
            url: 'data-import-source',
            before: 'data-butt', 
          },
          {
            name: '数据源编辑',
            url: 'data-edit-source',
            before: 'data-butt', 
          }  
        ]
      }
    ]
  },
  {
    name: '人群优选',
    icon: 'team',
    url: 'crowd'
  },
  {
    name: '数据洞察',
    icon: 'bar-chart',
    url: 'data-insight'
  },
  {
    name: '营销应用',
    icon: 'wallet',
    url: 'marketing'
  }
]
