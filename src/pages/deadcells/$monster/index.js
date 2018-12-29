import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'dva'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import { Form, List, Avatar, Select } from 'antd'
import './less/index.less'

const Monster = ({
  location, 
  dispatch, 
  loading,
  deadCells_Monster, 
  form:{
    getFieldDecorator,
    getFieldsValue
  }
}) => {
  const { query, pathname } = location
  const { list, pagination } = deadCells_Monster

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

  //#endregion

  return (
    <Page inner>
      <List
        itemLayout="vertical"
        size="small"
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.Idx} extra={<img width={60} src={item.Image} />}>
            <List.Item.Meta
              title={item.Name}
              description={item.Skill}
            />
            {
              item.Map &&
              item.Map.split('@').map((n, i)=> <div key={i}>{n}</div>)
            }
          </List.Item>
        )}
      />
    </Page>
  )
}

Monster.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  deadCells_Monster: PropTypes.object,
  loading: PropTypes.object,
  form: PropTypes.object
}

export default Form.create()(connect(({ deadCells_Monster, loading }) => ({ deadCells_Monster, loading }))(Monster))
