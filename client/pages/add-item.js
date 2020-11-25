import {MainLayout} from '../components/Layout/MainLayout';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {createItemAC} from '../redux/action-creators';
import React from 'react';
import {Form, Input, Button, Space, Row, Col} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 16},
};

const validateMessages = {
  required: '"${label}" должно быть заполнено',
};


export default function AddItem() {
  const dispatch = useDispatch()
  const router = useRouter()

  const createItem = (values) => {
    const {itemName, description, params} = values;
    dispatch(createItemAC({itemName, description, params}))
      .then(() => {
        router.push('/');
      })
  }

  return (
    <MainLayout>
      <Form {...layout} name="nest-messages" onFinish={createItem} validateMessages={validateMessages}>
        <Form.Item type={'text'} name={'itemName'} label="Наименование" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item type={'text'} name={'description'} label="Описание" rules={[{required: true}]}>
          <Input.TextArea/>
        </Form.Item>
        <Row>
          <Col offset={4} span={24}>
            <Form.List name="params" >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'first']}
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input placeholder="Параметр" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'last']}
                        fieldKey={[field.fieldKey, 'last']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input placeholder="Значение" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Добавить параметр
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};
