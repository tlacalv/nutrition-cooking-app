import { Row, Col, Typography, Form, Input, Button, Alert } from 'antd'
import { useState } from 'react'
import styles from '../styles/sign.module.css'
import { useAuth } from '../contexts/AuthContext'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

const { Title, Text } = Typography
export default function Signup() {
  const router = useRouter()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  async function onFinish(values) {
    setLoading(true)
    const { name, email, password, password_confirm } = values

    if(password !== password_confirm) {
      setError('Passwords do not match!')
      return;
    }
    try {
      setError('')
      await signup({name,email,password})
      router.push('/login')

    } catch(err) {
      setError(err)
    }
    setLoading(false)

  }
  return (
    <div className={styles.middle_container}>
      <Head>
        <meta 
          name="description" 
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
        <title>Sign up - Nutrition cooking</title>
      </Head>
      <Form 
        className={styles.middle_box}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Title className="text-center">Sign Up</Title>
          </Col>
        </Row>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input 
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input 
            type="email" 
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input 
            type="password" 
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password_confirm"
          rules={[
            {
              required: true,
              message: 'Please input your password confirmation!',
            },
          ]}
        >
          <Input 
            type="password" 
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex flex-hc">
            <Button 
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              Sign Up
            </Button>

          </div>
        </Form.Item>
        <Row justify="center">
          <Col span={24}>
            <Text className="text-center block">
              Already have an account?{' '} 
              <Link href="/login">
                  Log In
              </Link>
            </Text>
          </Col>
        </Row>
      </Form>
      
    </div>
  )
}