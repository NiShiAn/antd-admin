import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import { currentUser } from 'utils'
import { Form, Row, Col, Input, Select, Button, Table, Divider, Popconfirm } from 'antd'
import EditModal from './components/EditModal'

const Admin = ({
  location, 
  dispatch, 
  admin, 
  loading,
  form:{
    getFieldDecorator,
    getFieldsValue
  }
}) => {
  const { query, pathname } = location
  const { roleAry, list, modalType, editShow, editBox, pagination } = admin
  const curUser = currentUser() 
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
      title: '角色',
      dataIndex: 'RoleName',
      key: 'RoleName',
    },
    {
      title: '登录状态',
      dataIndex: 'IsLogged',
      key: 'IsLogged',
      render: text => (<span style={{ color: (text ? '#52c41a' : '') }}>{text ? "在线" : "离线"}</span>)
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <a href="javascript:;" onClick={editInfo.bind(this, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除么?" placement="topRight" onConfirm={delInfo.bind(this, record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  //弹窗
  const mPros = {
    info: editBox,
    roleAry: roleAry,
    curUser: curUser,
    type: modalType,
    visible: editShow,
    width: 400,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: modalType == 'add' ? 'admin/insert' : 'admin/update',
        payload: data,
      }).then(() => {
        runSearch()
      })
    },
    onCancel() {
      dispatch({ type: 'admin/hideModal' })
    }
  }

  //#endregion

  //#region function
  //检索
  pagination.onChange = (page) => {
    let fields = getFieldsValue()
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...fields,
        page: page
      })
    }))
  }
  const runSearch = () => pagination.onChange()

  //新增
  const addInfo = () => {
    dispatch({ 
      type: 'admin/showModal',
      payload:{
        modalType: 'add',
        editBox: {}
      }
    })
  }
  //编辑
  const editInfo = (info) => {
    dispatch({ 
      type: 'admin/showModal',
      payload:{
        modalType: 'edit',
        editBox: info
      }
    })
  }

  //删除
  const delInfo = (info) => {
    dispatch({
      type: 'admin/update',
      payload: {
        json: JSON.stringify({
          Idx: info.Idx,
          IsActive: false,
          UserName: info.UserName,
          RoleId: info.RoleId,
          UpdateBy: curUser.Account
        })
      }
    }).then(() => {
      runSearch()
    })
  }
  //#endregion

  return (
    <Page inner>
      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col span={4}>
          {getFieldDecorator('name', { initialValue: name })(<Input.Search placeholder='账号或昵称' />)}
        </Col>
        <Col span={4}>
          {getFieldDecorator('roleId')(
            <Select placeholder='请选择' style={{ width: '100%' }}>
              { roleAry.map(n => (<Select.Option value={n.Idx} key={n.Idx}>{n.Name}</Select.Option>)) }
            </Select>
          )}
        </Col>
        <Col span={16} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button icon="search" onClick={runSearch}>查询</Button>
          <Button type='primary' onClick={addInfo}>新增</Button>
        </Col>
      </Row>
      <Table 
        dataSource={list} 
        columns={columns} 
        bordered={true}
        rowKey={record => record.Idx}
        loading={loading.effects['admin/select']}
        pagination={pagination}
      />
      { editShow && <EditModal {...mPros}/> }
    </Page>
  )
}

Admin.propTypes = {
  admin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  form: PropTypes.object
}

export default Form.create()(connect(({ admin, loading }) => ({ admin, loading }))(Admin))
