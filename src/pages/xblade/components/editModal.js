import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const editModal = ({
    info = {},
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue    
    }
}) => {
    
    return (
        <Modal {...mPros}>
            <Form layout="horizontal">
                <FormItem label="Name" hasFeedback>
                    {getFieldDecorator('name', {
                        initialValue: info.Name,
                        rules: [{
                            required: true
                        }],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

editModal.PropTypes = {
    info: PropTypes.object,
    form: PropTypes.object.isRequired
}

export default Form.create()(editModal)