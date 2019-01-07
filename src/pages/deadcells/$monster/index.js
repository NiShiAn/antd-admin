import React from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, List, message, Avatar, Select } from 'antd'
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
  const { list, indext, totals, inLoad, hasMore } = deadCells_Monster
  //#region 属性

  //#endregion
   
  //#region function
  //检索
  const runSearch = () => {
    dispatch({
      type: 'deadCells_Monster/updateState',
      payload: { inLoad: true }
    })
    if(list.length >= totals){
      dispatch({
        type: 'deadCells_Monster/updateState',
        payload: { inLoad: false, hasMore: false }
      })
      message.info('没有更多了')
      return false
    }
    dispatch({ 
      type: 'deadCells_Monster/select',
      payload:{
        page: indext + 1,
        pageSize: 5
      }
    })
  }

  //#endregion

  return (
    <Page inner>
      <div className='infinite'>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={runSearch}
          hasMore={!inLoad && hasMore}
          useWindow={false}
        >
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
        </InfiniteScroll>
      </div>
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
