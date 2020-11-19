import Head from "next/head";
import Link from "next/link";
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

export function MainLayout({children}) {
  return (
    <>
      <Head>
        <title>Smart Design</title>
        <meta charSet="utf-8"/>
      </Head>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ padding: '0 100px'}}>
            <Menu.Item key="1"><Link href="/"><a>Все товары</a></Link></Menu.Item>
            <Menu.Item key="2"><Link href="/add-item"><a>Добавить товар</a></Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '30px 150px', minHeight: '100vh' }}>
          <div className="site-layout-content">
            {children}
          </div>
        </Content>
      </Layout>
    </>
  )
}

