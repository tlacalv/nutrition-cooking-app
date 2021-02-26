import { Row, Col, Typography, Form, Input, Button, Alert } from 'antd'
import { useState } from 'react'
import styles from '../styles/sign.module.css'
import { useAuth } from '../contexts/AuthContext'

const { Title, Text, Link } = Typography
export default function Signup() {
  const { signup } = useAuth()
  const [error, setError] = useState('')


  async function onFinish(values) {
    const { name, email, password, password_confirm } = values

    if(password !== password_confirm) {
      setError('Passwords do not match!')
      return;
    }
    try {
      setError('')
      const {data, message, status } = await signup({name,email,password})
      console.log(data)
      console.log(message)
      console.log(status)


    } catch(err) {
      console.error('submit signup: ', err)
    }

  }
  return (
    <div className={styles.middle_container}>
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
            >
              Sign Up
            </Button>

          </div>
        </Form.Item>
        <Row justify="center">
          <Col span={24}>
            <Text className="text-center block">Already have an account? <Link>Sign In</Link></Text>
          </Col>
        </Row>
      </Form>
      
    </div>
  )
}