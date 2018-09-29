import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Button, Row, Col, Table, Popconfirm } from 'antd'
import { Page } from 'components'

const { Search } = Input

const Xblade = ({
    location, dispatch, xblade, loading
}) => {
    var { list } = xblade
    const columns = [{
        title: '御刃者/异刃',
        dataIndex: 'Name',
        key: 'Name'
    }, {
        title: '类型',
        dataIndex: 'Role',
        key: 'Role'
    }, {
        title: '御刃者',
        dataIndex: 'Partner',
        key: 'Partner'
    }, {
        title: '羁绊',
        dataIndex: 'Fetter',
        key: 'Fetter'
    }, {
        title: '饰品/辅助核心',
        dataIndex: 'Equipment',
        key: 'Equipment'
    }, {
        title: '晶片',
        dataIndex: 'Wafer',
        key: 'Wafer'
    }, {
        title: '喜好物品',
        dataIndex: 'Favorite',
        key: 'Favorite'
    }];
      
    return (
        <Page inner>
            <Row gutter={24}>
                <Col xs={24} sm={12} style={{ marginBottom: 16}}>
                    <Search placeholder="名称" />
                </Col>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div>
                            <Button type="primary">查询</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Table 
                dataSource={list} 
                columns={columns} 
                bordered = {true}
                rowKey={record => record.Xid}/>
        </Page>
    )
}

Xblade.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    xblade: PropTypes.object,
    loading: PropTypes.object
}

export default connect(({ xblade, loading }) => ({ xblade, loading }))(Xblade)
