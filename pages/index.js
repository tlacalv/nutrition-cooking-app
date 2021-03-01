import {useAuth} from '../contexts/AuthContext'
import {Button} from 'antd'

export default function HomePage() {
  const { currentUser, logout } = useAuth()

  async function logoutBtn() {
    console.log(await logout())
  }
  return <div>Welcome to nutrition app {currentUser?.name} <Button type="danger"
  size="large" onClick={logoutBtn}>Logout</Button></div>
}