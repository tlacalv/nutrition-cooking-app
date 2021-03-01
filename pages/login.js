import { Row, Col, Typography, Form, Input, Button, Alert } from 'antd'
import { useState } from 'react'
import styles from '../styles/sign.module.css'
import { useAuth } from '../contexts/AuthContext'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

const { Title, Text } = Typography
export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  async function onFinish(values) {
    setLoading(true)
    const { email, password } = values

    try {
      setError('')
      await login(email, password)
      router.push('/')

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
        <title>Log In - Nutrition cooking</title>
      </Head>
      <Form 
        className={styles.middle_box}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Title className="text-center">Log In</Title>
          </Col>
        </Row>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
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
        
        <Form.Item>
          <div className="flex flex-hc">
            <Button 
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={loading}
            >
              Sign Up
            </Button>

          </div>
        </Form.Item>
        <Row justify="center">
          <Col span={24}>
            <Text className="text-center block">
              Don't have an account?{' '} 
              <Link href="/signup">
                  Sign Up
              </Link>
            </Text>
          </Col>
        </Row>
      </Form>
      
    </div>
  )
}