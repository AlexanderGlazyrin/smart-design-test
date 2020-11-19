import {MainLayout} from '../components/MainLayout';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadItemsAC, setItemsAC} from '../redux/action-creators';

export default function Home({items: serverItems}) {
  const {items} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!serverItems) {
      dispatch(loadItemsAC())
    } else {
      dispatch(setItemsAC(serverItems))
    }
  }, [dispatch])

  return (
    <MainLayout>
      {items.map(item => {
        return <div key={item._id}>
          <div>{item.itemName}</div>
          <div>{item.description}</div>
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
