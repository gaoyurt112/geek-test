//引入图表组件
import BarCharts from '@/components/BarCharts'

function Home () {
  return (
    <div>
      {/*向bar子组件传递图标配置信息 */}
      <BarCharts
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title={'三大框架满意度'}
      >
      </BarCharts>
      <BarCharts
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title={'三大框架满意度'}
      >
      </BarCharts>
    </div>
  )
}

export default Home