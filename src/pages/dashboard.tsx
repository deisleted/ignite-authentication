import Link from 'next/link'
import { useEffect } from 'react'
import { CanRender } from '../components/CanRender'
import { useAuth } from '../contexts/AuthContexts'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../styles/utils/withSSRAuth'
import Navbar from '../components/Navbar'
import MeuPerfil from './meuPerfil'
import UserList from './listarUser'

export default function Dashboard() {
  const { user, signOut, broadcastAuth } = useAuth()

  useEffect(() => {
    api
      .get('/me')
      .then(({ data }) => console.log(data))
      .catch(console.error)
  }, [])

  function handleSignOut() {
    broadcastAuth.current.postMessage('signOut')
    signOut()
  }

  return (
    <>
      <Navbar />
      <UserList />
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => ({ props: {} }))

//  <MeuPerfil />
