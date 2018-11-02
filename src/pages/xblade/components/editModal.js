import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input, Modal } from 'antd'

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
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
    }
      
    return (
        <Modal {...mPros}>
          <Form layout="horizontal">
            <Form.Item label="羁绊" hasFeedback {...formItemLayout}>
              <Col span={3}>
                <Form.Item>
                  {getFieldDecorator('Fetter',{
                    initialValue: info.Fetter,
                    rules: [{ required: true, message: '必填' }]
                  })(<Input />)}
                </Form.Item> 
              </Col>
              <Col span={1}>
                <span style={{ display: 'inline-block' , width: '100%', textAlign: 'center' }}>/</span>
              </Col>
              <Col span={3}>
                <Form.Item>
                  {getFieldDecorator('Target',{
                    initialValue: info.Target,
                    rules: [{ required: true, message: '必填' }]
                  })(<Input />)}
                </Form.Item>
              </Col> 
            </Form.Item>
          </Form>
        </Modal>
    )
}

editModal.propTypes = {
    form: PropTypes.object.isRequired
}

export default Form.create()(editModal)