import Head from 'next/head'
import Link from 'next/link'
import { Layout as Antlayout , Menu, Input, Avatar, Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserAstronaut, faEgg,faUtensils, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/layout.module.css'
import React, {useState} from 'react'


const { Header, Sider, Content } = Antlayout;

const Search = (props) => {
  return ( 
    <Button {...props} type="text" icon={<FontAwesomeIcon icon={faBars} style={{fontSize: 24, color: '#777'}}/>} />
  )
}


export default function Layout({children}) {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  return (
      <Antlayout>
      <Head>
        <meta 
          name="description" 
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
      </Head>
      <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={toggle}
          headerStyle={{display: 'none'}}
          visible={collapsed}
          style={{ position: 'absolute'}}
          bodyStyle={{padding: 0}}
        >
          <Sider className={styles.sider}>
          <div className={styles.logo} />
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<FontAwesomeIcon icon={faUtensils} />}>
              <Link href="/recipes">Recipes</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FontAwesomeIcon icon={faEgg} />}>
              <Link href="/ingredients">Ingredients</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FontAwesomeIcon icon={faInfoCircle} />}>
              <Link href="/about">About</Link>
            </Menu.Item>
          </Menu>
          </Sider>
        </Drawer>
        <Antlayout className={styles.site_layout}>
          <Header className={styles.site_layout_background} style={{padding: '0 1rem'}}>
            <Input size="large" placeholder="Search something" style={{borderRadius: '.4rem'}} prefix={<Search onClick={toggle} />} suffix={<Avatar icon={<FontAwesomeIcon icon={faUserAstronaut} />} />} />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              minHeight: '100vh',
            }}
          >
            {children}
          </Content>
        </Antlayout>
      </Antlayout>
  )
}
