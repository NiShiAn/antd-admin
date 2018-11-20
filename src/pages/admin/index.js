import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { DropOption } from 'components'
import { Row, Col, Button, Table } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'

const Admin = ({
  location, 
  dispatch, 
  admin, 
  loading,
}) => {
  const { query, pathname } = location
  const { list, pagination } = admin

  //#region 属性
  //表格
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Idx',
      key: 'Idx',
    },
    {
      title: '账号',
      dataIndex: 'Account',
      key: 'Account',
    },
    {
      title: '昵称',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '登录状态',
      dataIndex: 'IsLogged',
      key: 'IsLogged',
      render: text => (<span>{text ? "是" : "否"}</span>)
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
    },
  ]

  //#endregion

  return (
    <Page inner>
      <Row gutter={24}>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <Button type='primary'>查询</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Table 
        dataSource={list} 
        columns={columns} 
        bordered={true}
        rowKey={record => record.Xid}
        loading={loading.effects['admin/select']}
        pagination={pagination}
      />
    </Page>
  )
}

Admin.propTypes = {
  admin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ admin, loading }) => ({ admin, loading }))(Admin)
