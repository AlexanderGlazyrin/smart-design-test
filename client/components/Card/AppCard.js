import {Card, Col} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux';
import {deleteItemAC} from '../../redux/action-creators';
import React from 'react';

export const AppCard = ({title, id, description}) => {
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(deleteItemAC(id))
  }

  return (
    <Col span={8}>
      <div className="site-card-border-less-wrapper">
        <Card title={title} bordered={false} extra={<a onClick={deleteItem}><DeleteOutlined/></a>}
              style={{minHeight: 250}}>
          <div style={{marginBottom: 5}}>{`ID: ${id}`}</div>
          <div>Описание товара:</div>
          <div>{description}</div>
        </Card>
      </div>
    </Col>
  );
};