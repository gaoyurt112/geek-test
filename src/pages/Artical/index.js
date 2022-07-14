import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { useEffect, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()

  //获取评到列表
  const [channels, setChannels] = useState([])
  useEffect(() => {
    async function getChannels () {
      const res = await http.get('/channels')
      // console.log(res)
      setChannels(res.data.data.channels)
    }
    getChannels()
  }, [])


  //获取表格数据 设置表格请求参数
  const [articals, setArticals] = useState({
    list: [],
    count: 0
  })

  const [params, setParams] = useState({
    page: 1,
    per_page: 3
  })
  //发送请求携带参数
  useEffect(() => {
    async function getArticals () {
      const res = await http.get('/mp/articles', { params })
      // console.log(res)
      const { results, total_count } = res.data.data
      setArticals({
        list: results,
        count: total_count
      })
    }
    getArticals()
    // console.log(params)
  }, [params])


  //筛选功能实现
  const onSearch = (values) => {
    // console.log(values)
    const { status, channel_id, date } = values
    //设置一个筛选参数对象
    const searchParams = {}
    //添加status参数
    searchParams.status = status
    //如果用户选择了频道，传入频道id
    if (channel_id) {
      searchParams.channel_id = channel_id
    }
    //如果用户选择了日期传入日期
    if (date) {
      searchParams.begin_pubdate = date[0].format('YYYY-MM-DD')
      searchParams.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    if (status === -1) {
      setParams({
        params
      })
    } else {
      setParams({
        ...params,
        ...searchParams
      })
    }

    //重新设置params的值，解构两个参数合并，params发生改变会再次调用请求函数

    // console.log(params)
  }


  //设置分页功能
  const pageChange = (value) => {
    // console.log(value)
    setParams({
      ...params,
      page: value
    })
  }


  //设置删除文章功能
  const delArticle = async (data) => {
    // console.log(data)
    // 发送删除请求传入id
    await http.delete(`/mp/articles/${data.id}`)
    //重新设置参数刷新页面
    setParams({
      // 删除后留在当前页
      ...params,
      page: params.page,
    })
  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { navigate('/publish') }} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {/* 遍历频道列表 */}
              {channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 列表展示区 */}
      <div>
        <Card title={`根据筛选条件共查询到 ${articals.count} 条结果：`}>
          <Table
            rowKey="id"
            pagination={{
              total: articals.count,
              position: ['bottomCenter'],
              current: params.page,
              pageSize: params.per_page,
              onChange: pageChange
            }}
            columns={columns}
            dataSource={articals.list}
          />
        </Card>
      </div>
    </div>
  )
}

export default Article