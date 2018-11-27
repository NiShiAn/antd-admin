import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'

const editModal = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  ...mPros
}) => {
  const { info, roleAry, curUser, type, onOk } = mPros
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  mPros.title = type == 'edit' ? `【${info.Account}】修改` : '新增用户'
  mPros.onOk = () => {
    validateFields((errors) => {
      if (errors) return
      let data = getFieldsValue()

      onOk({
        json: JSON.stringify({
          Idx: info.Idx,
          Account: data.Account || '',
          UserName: data.UserName,
          RoleId: data.RoleId,
          IsActive: true,
          CreateBy: curUser.Account,
          UpdateBy: curUser.Account
        })
      })
    })
  }
  return (
    <Modal {...mPros}>
      <Form layout='horizontal'>
        { type == 'add' &&
          <Form.Item label='账号' {...formItemLayout}>
            {getFieldDecorator('Account',{
              initialValue: '',
              rules: [{ required: true, message: '必填' }]
            })(<Input />)}
          </Form.Item>
        }
        <Form.Item label='昵称' {...formItemLayout}>
          {getFieldDecorator('UserName',{
            initialValue: info.UserName || '',
            rules: [{ required: true, message: '必填' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='角色' {...formItemLayout}>
          {getFieldDecorator('RoleId', {
            initialValue: info.RoleId,
            rules: [{ required: true, message: '必填' }]
          })(
            <Select placeholder='请选择' style={{ width: '100%' }}>
              { roleAry.map(n => (<Select.Option value={n.Idx} key={n.Idx}>{n.Name}</Select.Option>)) }
            </Select>)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

editModal.propTypes = {
  form: PropTypes.object.isRequired
}

export default Form.create()(editModal)