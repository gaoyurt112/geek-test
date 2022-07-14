//引入echarts
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

//封装一个柱状图函数，接收参数dom元素，标题，x数据,y数据
function chartsInit (chartsref, title, xData, yData) {
  //初始化图表传入dom元素
  const myCharts = echarts.init(chartsref)
  //配置图标信息
  myCharts.setOption({
    title: {
      text: title
    },
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: {
      name: '使用量',
      type: 'bar',
      data: yData
    }
  })
}

//创建bar组件 接收父组件传递的数据
function BarCharts ({ style, title, xData, yData }) {
  //获取dom对象
  const chartsref = useRef(null)
  useEffect(() => {
    //调用图表函数
    chartsInit(chartsref.current, title, xData, yData)
  })

  return (
    <div ref={chartsref} style={style}></div>
  )
}

export default BarCharts
