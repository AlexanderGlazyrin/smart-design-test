import {MainLayout} from "../components/MainLayout";
import {useDispatch} from 'react-redux';
import {createItemAC} from '../redux/action-creators';

export default function AddItem() {
    const dispatch = useDispatch()

  const createItem = (e) => {
    e.preventDefault()
    const {itemName: {value: itemName}, description: {value: description}} = e.target;
    dispatch(createItemAC({itemName, description}))
  }

  return (
    <MainLayout>
      <form onSubmit={createItem}>
        <input type={'text'} name={'itemName'} placeholder={'name'}/>
        <input type={'text'} name={'description'} placeholder={'description'}/>
        <button>Submit</button>
      </form>
    </MainLayout>
  );
};
