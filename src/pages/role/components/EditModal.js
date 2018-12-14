import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

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
    wrapperCol: { span: 20 }
  }
  mPros.title = type == 'edit' ? `修改` : '新增角色'

  mPros.onOk = () => {
    validateFields((errors) => {
      if (errors) return
      let data = getFieldsValue()

      onOk({
        json: JSON.stringify({
          Idx: info.Idx || 0,
          Name: data.Name,
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
            initialValue: info.Name || '',
            rules: [{ required: true, message: '必填' }]
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