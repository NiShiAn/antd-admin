import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import { Form, Row, Col, Input, Select, Button, Tree, Divider, Popconfirm, Icon } from 'antd'
import EditModal from './components/EditModal'
import styles from './less/index.less'

const DirectoryTree = Tree.DirectoryTree;
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
  const { list, modalType, editShow, editBox, pagination, curUser } = menu

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
                  <Icon type='diff' title='添加' onClick={addMenu.bind(this, item)}/>
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
  //#endregion

  return (
    <Page inner>
      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col span={4}>
          {getFieldDecorator('name', { initialValue: name })(<Input.Search placeholder='名称' />)}
        </Col>
        <Col span={20} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button icon="search" onClick={runSearch}>查询</Button>
          <Button type='primary' onClick={addMenu.bind(this, { Level: 0 })}>新增</Button>
        </Col>
      </Row>
      <Row>
        <Col className='menuBox'>
          <DirectoryTree defaultExpandAll={true}>
            { buildTree(list) }
          </DirectoryTree>
        </Col>
        {/* <Col className={styles.menuBox}></Col> */}
      </Row>
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
