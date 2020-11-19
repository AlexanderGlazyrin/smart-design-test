import {MainLayout} from '../components/Layout/MainLayout';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {createItemAC} from '../redux/action-creators';
import React from 'react';
import {Form, Input, InputNumber, Button} from 'antd';

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
    const {itemName, description} = values;
    dispatch(createItemAC({itemName, description}))
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
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};
