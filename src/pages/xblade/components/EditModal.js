import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input, Checkbox, Modal } from 'antd'
import styles from '../less/editModal.less'

const editModal = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  },
  ...mPros
}) => {
  const { info, onOk } = mPros
  const options = info.Subs.filter(n => n.Genrn != '晶片')
  const checkes = info.Subs.filter(n => n.Genrn != '晶片' && n.IsReach).map(n => n.Idx)
  const wafer = info.Subs.filter(n => n.Genrn == '晶片')[0]
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }
  mPros.title = `【${info.Name}】修改`
  mPros.onOk = () => {
    validateFields((errors) => {
      if (errors) return

      let datas = getFieldsValue()
      datas.Subs = datas.Subs || []
  
      onOk({
        xid: info.Xid,
        fetter: datas.Fetter || '',
        target: datas.Target || '',
        subs: datas.Subs.join() + (datas.Wafer != null && datas.Wafer ? `,${wafer.Idx}` : '')
      })
    })
  }
  return (
    <Modal {...mPros}>
      <Form layout='horizontal'>
        { info.Target != '' &&
          <Form.Item label='羁绊' {...formItemLayout}>
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
        }
        {
          options.length > 0 &&
          <Form.Item label={options[0].Genrn} {...formItemLayout}>
            {getFieldDecorator('Subs',{
              initialValue: checkes,
              //rules: [{ type: 'array' }]
            })(<Checkbox.Group>
              {options.map(n => (<div key={n.Idx}><Checkbox value={n.Idx}>{n.Equib}</Checkbox></div>))}
            </Checkbox.Group>)}
          </Form.Item>
        }
        {
          wafer &&
          <Form.Item label='晶片' {...formItemLayout}>
            {getFieldDecorator('Wafer', {
              valuePropName: 'checked',
              initialValue: wafer.IsReach,
              rules: [{ type: 'boolean' }]
            })(<Checkbox value={wafer.Idx}>{wafer.Equib}</Checkbox>)}
          </Form.Item>
        }
      </Form>
    </Modal>
  )
}

editModal.propTypes = {
  form: PropTypes.object.isRequired
}

export default Form.create()(editModal)