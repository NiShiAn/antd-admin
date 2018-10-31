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
    const { info } = mPros;
    const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
      }
      
    return (
        <Modal {...mPros}>
            <Form layout="horizontal">
                <Form.Item label="Name" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: info.Name,
                        rules: [{
                            required: true
                        }],
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