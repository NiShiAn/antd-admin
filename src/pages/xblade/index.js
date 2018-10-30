import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Input, Button, Row, Col, Table, Select, Divider, Modal } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import editModal from './components/editModal'
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
    var { list, pagination, modalVisible } = xblade

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
        render: (text) => {
            return <span>{text.split('/').length > 1 && text.split('/')[1] != "" ? text : text.split('/')[0]}</span>
        }
    }, {
        title: '饰品/辅助核心',
        dataIndex: 'Equipment',
        key: 'Equipment',
        render: (text) => {
            return text.split(',').map((n, i) => (<p key={i}>{n}</p>))
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
            return text.split(',').map((n, i) => (<p key={i}>{n}</p>))
        }
    },{
        title: '操作',
        key: 'operation',
        className: 'operate',
        render: (text, record) => {
            return (
                <span>
                    <a href="javascript:;" onClick={editInfo.bind(this, record)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                </span>
            )
        },
    }]
    //弹窗
    const mPros = {
        title: '修改',
        visible: modalVisible,
        confirmLoading: '',
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
            payload: { ...info }
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
            <editModal />
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
