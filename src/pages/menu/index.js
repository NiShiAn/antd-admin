import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import { arrayMove } from 'utils'
import { Form, Row, Col, Input, Button, Tree, Popconfirm, Icon } from 'antd'
import EditModal from './components/EditModal'
import Role from '../role'
import styles from './less/index.less'

const TreeNode = Tree.TreeNode;

const Menu = ({
  location, 
  dispatch, 
  menu, 
  loading,
  form:{
    getFieldDecorator,
    getFieldsValue
  }
}) => {
  const { query, pathname } = location
  const { list, modalType, editShow, editBox, curUser } = menu

  //#region 属性
  //弹窗
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
        type: modalType == 'add' ? 'menu/insert' : 'menu/update',
        payload: data,
      }).then(() => {
        runSearch()
      })
    },
    onCancel() {
      dispatch({ type: 'menu/hideModal' })
    }
  }

  //#endregion

  //#region function
  //检索
  const runSearch = () => {
    let fields = getFieldsValue()
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...fields
      })
    }))
  }

  //新增
  const addMenu = (info, e) => {
    e.stopPropagation();
    dispatch({ 
      type: 'menu/showModal',
      payload:{
        modalType: 'add',
        editBox: info
      }
    })
  }
  //编辑
  const editMenu = (info, e) => {
    e.stopPropagation();
    dispatch({ 
      type: 'menu/showModal',
      payload:{
        modalType: 'edit',
        editBox: info
      }
    })
  }
  //删除
  const delMenu = (item, e) => {
    e.stopPropagation();
    dispatch({
      type: 'menu/update',
      payload: {
        json: JSON.stringify({
          Idx: item.Idx,
          Name: item.Name,
          Icon: item.Icon,
          Route: item.Route,
          IsActive: false,
          UpdateBy: curUser.Account
        })
      }
    }).then(() => {
      runSearch()
    })
  }

  //Tree数据
  const buildTree = (data) => {
    return data.map(item => {
      return (
        <TreeNode 
          title={
            <div className={`menuTitle level${item.Level}`} >
              <span>{item.Name}</span>
              <span>
                { item.Idx != 1 && item.Level == 1 &&
                  <Icon type='plus' title='添加' onClick={addMenu.bind(this, item)}/>
                }
                <Icon type='edit' title='编辑' onClick={editMenu.bind(this, item)} />
                { item.Idx != 1 && (!item.ChildList || item.ChildList.length == 0) &&
                  <Popconfirm title="确定删除么?" placement="right" onConfirm={delMenu.bind(this, item)}>
                    <Icon type='delete' title='删除'/>
                  </Popconfirm>
                }
              </span>
            </div>
          } 
          key={item.Key} 
          icon={<Icon type={item.Icon} />} 
          selectable={false} 
          dataRef={item}>
          { item.ChildList && item.ChildList.length > 0 &&
            buildTree(item.ChildList)
          }
        </TreeNode>
      )
    });
  }
  //Tree排序
  const sortMenu = (info) => {
    //当前
    let curInfo = info.dragNode.props.dataRef
    //目标
    let tarInfo = info.node.props.dataRef
    //判断
    if(curInfo.ParentId != tarInfo.ParentId || !info.dropToGap) return
    
    let data = curInfo.Level == 1
      ? list 
      : list.find(n => n.Idx == curInfo.ParentId).ChildList
    //置换的Index
    let curIndex = data.findIndex(n => n == curInfo)
    let tarIndex = data.findIndex(n => n == tarInfo)
    tarIndex += info.dropPosition >= 0 ? 0 : -1
    tarIndex = tarIndex < 0 ? 0 : tarIndex

    //重排数组
    data = arrayMove(data, curIndex, tarIndex)
    //重排Key
    let keys = curInfo.Key.split('-')
    let ids = []
    for(let i = 0; i < data.length; i++) {
      data[i].Key = `${keys[0]}${(curInfo.Level == 1 ? '' : `-${keys[1]}`)}-${i}`
      ids.push(data[i].Idx)
    }

    dispatch({ type: 'menu/sort', payload: {list: list, ids: ids} })
  }
  //#endregion

  return (
    <Page inner>
      <div style={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap' }}>
        <div style={{ width: '450px' }}>
          <Row gutter={12} style={{ marginBottom: 16 }}>
            <Col span={14}>
              {getFieldDecorator('name', { initialValue: name })(<Input placeholder='导航名称' />)}
            </Col>
            <Col span={10} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Button icon="search" onClick={runSearch}>查询</Button>
              <Button type='primary' onClick={addMenu.bind(this, { Level: 0 })}>新增</Button>
            </Col>
          </Row>
          <Row className='menuBox'>
            <Tree defaultExpandAll onDrop={sortMenu} draggable>
              { buildTree(list) }
            </Tree>
          </Row>
        </div>
        <Role menus={list}/>
      </div>
      { editShow && <EditModal {...mPros}/> }
    </Page>
  )
}

Menu.propTypes = {
  menu: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  form: PropTypes.object
}

export default Form.create()(connect(({ menu, loading }) => ({ menu, loading }))(Menu))
