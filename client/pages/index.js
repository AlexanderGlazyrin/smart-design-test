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
  const [params, setParams] = useState([])
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
    setParams(getParams)

  }, [items])

  function getParams() {
    const newParams = []
    items.forEach(item => {
      item.params.forEach(param => {
        if(!newParams.includes(param.first.trim())) {
          newParams.push(param.first.trim())
        }
      })
    })
    return(newParams)
  }

  const filter = (e) => {
    setInputValue(e.target.value)
    setFilterItems(items);

    switch (select) {
      case 'name':
        setFilterItems(prev => {
          return prev.filter(item => {
            return item.itemName.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase().trim()) > -1
          })
        })
        break;
      case 'id':
        setFilterItems(prev => {
          return prev.filter(item => {
            return item._id.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase().trim()) > -1
          })
        })
        break;
      case 'description':
        setFilterItems(prev => {
          return prev.filter(item => {
            return item.description.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase().trim()) > -1
          })
        })
        break;
      default:
        setFilterItems(prev => {
          return prev.filter(item => {
            for (let param of item.params) {
              if(param.first === select) {
                return param.last.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase().trim()) > -1
              }
            }
            return false;
          })
        })
    }
  }

  const changeSelect = (value) => {
    if (value === 'name' || value === 'id' || value === 'description') {
      setFilterItems(items);
    } else {
      setFilterItems(items.filter(item => {
        return item.params.some(param => param.first === value)
      }));
    }
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
              <Option value="description">Описание</Option>
              {params ? params.map(el => <Option key={el} name={el}>{`Параметр: ${el}`}</Option>) : null}
            </Select>
          </Col>
          <Col span={20}>
            <Input onChange={filter} value={inputValue}/>
          </Col>
        </Row>
      <Row gutter={[24, 24]}>
        {filterItems.map(item => {
          return <AppCard
            key={item._id}
            title={item.itemName}
            id={item._id}
            params={item.params}
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
