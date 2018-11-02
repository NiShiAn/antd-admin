import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button, Row, Col, Table, Select, Divider, Modal } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import EditModal from './components/EditModal'
import styles from './xblade.less'

const { Search } = Input

const Xblade = ({
    location, 
    dispatch, 
    xblade, 
    loading,
    form:{
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue
    }
}) => {
    const { query, pathname } = location
    var { list, pagination, editVisible, edit } = xblade

    //#region 属性
    //表格
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
        key: 'Fetter',
        render: (text, record) => {
            if(record.Target != "")
                return (<span>{record.Fetter}/{record.Target}</span>)
            return (<span>{record.Fetter}</span>)
        }
    }, {
        title: '饰品/辅助核心',
        dataIndex: 'Subs',
        key: 'Subs',
        render: (text) => {
            return text.map((n) => (<div key={n.Idx}>{n.Equib}</div>))
        }
    }, {
        title: '晶片',
        dataIndex: 'Wafer',
        key: 'Wafer'
    }, {
        title: '喜好物品',
        dataIndex: 'Favorite',
        key: 'Favorite',
        render: (text) => {
            return text.split(',').map((n, i) => (<div key={i}>{n}</div>))
        }
    },{
        title: '操作',
        key: 'operation',
        className: 'operate',
        render: (text, record) => {
            if(record.Target != "" || record.Subs.length > 0 || record.Wafer != "")
                return (<a href="javascript:;" onClick={editInfo.bind(this, record)}>编辑</a>)
            //return (<span></span>)
        },
    }]
    //弹窗
    const mPros = {
        title: '修改',
        info: edit,
        visible: editVisible,
        //confirmLoading: true,
        maskClosable: false,
        wrapClassName: 'vertical-center-modal',
        onCancel(){
            dispatch({ type: 'xblade/hideModal' })
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

    //编辑
    const editInfo = (info) => {
        dispatch({ 
            type: 'xblade/showModal',
            payload:{
                edit: info
            }
        })
    }
    //#endregion
    return (
        <Page inner>
            <Row gutter={24}>
                <Col span={4} style={{ marginBottom: 16}}>
                    {getFieldDecorator('name', { initialValue: name })(<Search placeholder="名称" onSearch={runSearch} />)}
                </Col>
                <Col span={4} style={{ marginBottom: 16}}>
                    {getFieldDecorator('role')(<Select placeholder="请选择" style={{ width: '100%' }}>
                        <Option value="御刃者">御刃者</Option>
                        <Option value="攻击">攻击</Option>
                        <Option value="防御">防御</Option>
                        <Option value="回复">回复</Option>
                    </Select>)}
                </Col>
                <Col>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div>
                            <Button type="primary" onClick={runSearch}>查询</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Table 
                className={styles.table}
                dataSource={list} 
                columns={columns} 
                bordered={true}
                rowKey={record => record.Xid}
                loading={loading.effects['xblade/select']}
                pagination={pagination}/>
            { editVisible && <EditModal {...mPros} /> }
        </Page>
    )
}

Xblade.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    xblade: PropTypes.object,
    loading: PropTypes.object,
    form: PropTypes.object
}

export default Form.create()(connect(({ xblade, loading }) => ({ xblade, loading }))(Xblade))
