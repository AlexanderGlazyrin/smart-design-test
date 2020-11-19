import {MainLayout} from '../components/MainLayout';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadItemsAC, setItemsAC} from '../redux/action-creators';

export default function Home({items: serverItems}) {
  const {items} = useSelector(state => state);
  const [filterItems, setFilterItems] = useState(items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!serverItems) {
      dispatch(loadItemsAC())
    } else {
      dispatch(setItemsAC(serverItems))
    }
  }, [dispatch])

  useEffect(() => {
    setFilterItems(items)
  }, [items])

  const filter = (e) => {
    const {value} = e.target;
    setFilterItems(items);
    setFilterItems(prev => {
      return prev.filter(item => {
        return item.itemName.toLowerCase().indexOf(value.toLowerCase().trim()) > -1
      })
    })
  }

  return (
    <MainLayout>
      <input onChange={filter}/>
      {filterItems.map(item => {
        return <div key={item._id}>
          <div>Товар:{item.itemName}</div>
          <div>id:{item._id}</div>
          <div>Описание:{item.description}</div>
        </div>
      })}
    </MainLayout>
  )
}

Home.getInitialProps = async ({req}) => {
  if (!req) return {items: null}
  const response = await fetch('http://localhost:3001/market')
  const {items} = await response.json();
  return {
    items,
  }
}
