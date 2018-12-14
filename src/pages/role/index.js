import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, List, Tooltip, Icon } from 'antd'
import EditModal from './components/EditModal'
import PurviewModal from './components/PurviewModal'

const Role = ({
  dispatch, 
  role, 
  menus,
  form:{
    getFieldDecorator,
    getFieldsValue
  }
}) => {
  const { roles, modalType, editShow, editBox, purviewShow, roleMenus, checkedKey, curUser } = role

  //#region 属性
  //编辑
  const mPros = {
    info: editBox,
    curUser: curUser,
    type: modalType,
    visible: editShow,
    width: 400,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: modalType == 'add' ? 'role/insert' : 'role/update',
        payload: data,
      }).then(() => {
        runSearch()
      })
    },
    onCancel() {
      dispatch({ type: 'role/hideModal' })
    }
  }
  //权限
  const pPros = {
    roleMenus: roleMenus,
    checkedKey: checkedKey,
    curUser: curUser,
    visible: purviewShow,
    title: '编辑权限',
    width: 500,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      
    },
    onCancel() {
      dispatch({ type: 'role/hidePurview' })
    }
  }
  //#endregion

  //#region function
  //检索
  const runSearch = () => {
    let fields = getFieldsValue()
    dispatch({ type: 'role/select', payload: {name: fields.name} })
  }
  //新增
  const addRole = () => {
    dispatch({ 
      type: 'role/showModal',
      payload:{
        modalType: 'add',
        editBox: {}
      }
    })
  }
  //编辑
  const editRole = (info) => {
    dispatch({ 
      type: 'role/showModal',
      payload:{
        modalType: 'edit',
        editBox: info
      }
    })
  }
  //删除
  const delRole = (item) => {
    dispatch({
      type: 'role/update',
      payload: {
        json: JSON.stringify({
          Idx: item.Idx,
          Name: item.Name,
          IsActive: false,
          UpdateBy: curUser.Account
        })
      }
    }).then(() => {
      runSearch()
    })
  }
  const sortMenu = (data, purview, checkAry) => {
    data.map(item => {
      let cur = purview.find(n => n.MenuId == item.Idx)
      item.Sort = cur ? cur.Sort : 150
      cur && checkAry.push(item.Key)
      item.ChildList && sortMenu(item.ChildList, purview, checkAry)
    });
  }
  //修改权限
  const editPurview = (item) => {
    let menuAry = menus.concat(), 
        checkAry = []
    sortMenu(menuAry, item.MenuList, checkAry)
    dispatch({ 
      type: 'role/showPurview',
      payload:{
        roleMenus: menuAry,
        checkedKey: checkAry
      }
    })
  }
  //#endregion

  return (
    <div style={{ width: '450px', marginLeft: '20px' }}>
      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col span={14}>
          {getFieldDecorator('name', { initialValue: name })(<Input placeholder='角色名称' />)}
        </Col>
        <Col span={10} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button icon="search" onClick={runSearch}>查询</Button>
          <Button type='primary' onClick={addRole}>新增</Button>
        </Col>
      </Row>
      <Row className='menuBox'>
        <List
          size="small"
          dataSource={roles}
          renderItem={item => (
            <List.Item actions={(
              item.HasUser
              ? [
                <Icon type="edit" title="编辑" onClick={editRole.bind(this, item)} />,
                <Icon type="ordered-list" title="权限" onClick={editPurview.bind(this, item)} />,
                <Tooltip placement="right" title="尚有关联用户"><Icon type='delete' title='删除'/></Tooltip>
              ]
              : [
                <Icon type="edit" title="编辑" onClick={editRole.bind(this, item)} />,
                <Icon type="ordered-list" title="权限" onClick={editPurview.bind(this, item)} />,
                <Icon type="delete" title="删除" onClick={delRole.bind(this, item)} />
              ]
            )}>{item.Name}</List.Item>
          )}
        />
      </Row>
      { editShow && <EditModal {...mPros}/> }
      { purviewShow && <PurviewModal {...pPros}/>}
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  menus: PropTypes.array,
  dispatch: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(connect(({role}) => ({role}))(Role))
