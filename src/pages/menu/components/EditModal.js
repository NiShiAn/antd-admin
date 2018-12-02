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
  const { info, curUser, type, onOk } = mPros
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  var box = {}
  if(type == 'edit') {
    mPros.title = `【${info.Name}】修改`
    box = info
  } else {
    mPros.title = '新增导航'
    box = {
      Idx: 0,
      Name: '',
      Icon: '',
      Route: '',
      Level: info.Level + 1,
      ParentId: info.Level == 0 ? 0 : info.Idx
    }
  }

 mPros.onOk = () => {
    validateFields((errors) => {
      if (errors) return
      let data = getFieldsValue()

      onOk({
        json: JSON.stringify({
          Idx: box.Idx,
          Name: data.Name,
          Icon: data.Icon,
          Route: data.Route,
          Level: box.Level,
          ParentId: box.ParentId,
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
        <Form.Item label='名称' {...formItemLayout}>
          {getFieldDecorator('Name',{
            initialValue: box.Name,
            rules: [{ required: true, message: '必填' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='图标' {...formItemLayout}>
          {getFieldDecorator('Icon', {
            initialValue: box.Icon,
            rules: [{ required: true, message: '必填' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='路径' {...formItemLayout}>
          {getFieldDecorator('Route', {
            initialValue: box.Route
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

editModal.propTypes = {
  form: PropTypes.object.isRequired
}

export default Form.create()(editModal)