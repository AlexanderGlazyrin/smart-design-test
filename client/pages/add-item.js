import {MainLayout} from '../components/MainLayout';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {createItemAC} from '../redux/action-creators';

export default function AddItem() {
  const dispatch = useDispatch()
  const router = useRouter()

  const createItem = (e) => {
    e.preventDefault()
    const {itemName: {value: itemName}, description: {value: description}} = e.target;
    if (!itemName.trim() || !description.trim()) {
      alert('Необходимо ввести наименование товара и его описание')
    } else {
      dispatch(createItemAC({itemName, description}))
        .then(() => {
          router.push('/');
        })
    }
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
