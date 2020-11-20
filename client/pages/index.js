import {MainLayout} from '../components/Layout/MainLayout';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadItemsAC, setItemsAC} from '../redux/action-creators';
import {Input, Col, Row, Select} from 'antd';
import {AppCard} from '../components/Card/AppCard';
import Link from 'next/link';

const {Option} = Select;

export default function Home({items: serverItems}) {
  const {items} = useSelector(state => state);
  const [filterItems, setFilterItems] = useState(items);
  const [select, setSelect] = useState('name')
  const [inputValue, setInputValue] = useState('')
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
    setInputValue(e.target.value)
    setFilterItems(items);

    if (select === 'name') {
      setFilterItems(prev => {
        return prev.filter(item => {
          return item.itemName.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) > -1
        })
      })
    } else if (select === 'id') {
      setFilterItems(prev => {
        return prev.filter(item => {
          return item._id.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) > -1
        })
      })
    }
  }

  const changeSelect = (value) => {
    setFilterItems(items);
    setInputValue('')
    setSelect(value)
  }

  if (!items.length) {
    return (
      <MainLayout>
        <h2>Товары отсутствуют</h2>
        <Link href="/add-item"><a>Добавить товар</a></Link>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
        <h2>Поиск товара</h2>
        <Row gutter={[0, 24]}>
          <Col span={4}>
            <Select defaultValue={select} style={{width: '100%'}} onChange={changeSelect}>
              <Option value="name">Наименование</Option>
              <Option value="id">Идентификатор</Option>
            </Select>
          </Col>
          <Col span={20}>
            <Input onChange={filter} value={inputValue}/>
          </Col>
        </Row>
      <Row gutter={[24, 24]}>
        {filterItems.reverse().map(item => {
          return <AppCard
            key={item._id}
            title={item.itemName}
            id={item._id}
            description={item.description}
          />
        })}
      </Row>
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
