import { Card } from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux';
import {deleteItemAC} from '../../redux/action-creators';

export const AppCard = ({title, id, description}) => {
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(deleteItemAC(id))
  }

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title={title} bordered={false} extra={<a onClick={deleteItem}><DeleteOutlined /></a>} style={{ width: 300, minHeight: 250, margin: 15 }}>
          <div style={{marginBottom: 5}}>{`ID: ${id}`}</div>
          <div>Описание товара:</div>
          <div>{description}</div>
        </Card>
      </div>
    </>
  );
};
