import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import { Form, Row, Col, Input, Select, Button, Tree, Divider, Popconfirm, Icon } from 'antd'
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
  const { list, editShow, editBox, pagination, curUser } = menu

  //#region 属性

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

  //Tree数据
  const buildTree = (data) => {
    return data.map(item => {
      return (
        <TreeNode 
          title={
            <div className={`menuTitle level${item.Level}`} >
              <span>{item.Name}</span>
              <Icon type='edit' />
              <Icon type='delete' />
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
          <Button type='primary'>新增</Button>
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
