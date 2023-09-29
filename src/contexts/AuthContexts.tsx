import Router from 'next/router'
import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '../services/apiClient'

type User = {
  email: string
  ativo: boolean
  id: string
  permissions: string[]
  name: string
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
  broadcastAuth: MutableRefObject<BroadcastChannel>
}

type AuthProvidedrProps = {
  children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'auth.token')
  destroyCookie(undefined, 'auth.refreshToken')

  Router.push('/')
}

export function AuthContextProvider({ children }: AuthProvidedrProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = useMemo(() => Boolean(user), [user])
  const broadcastAuth = useRef<BroadcastChannel>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    broadcastAuth.current = new BroadcastChannel('auth')

    broadcastAuth.current.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break

        default:
          break
      }
    }
  }, [broadcastAuth])

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    async function loadInitialData() {
      if (!token) return

      api
        .get('/me')
        .then((response) => {
          const { email, permissions, name, roles, id, ativo } = response.data

          setUser({
            email,
            ativo,
            id,
            name,
            permissions,
            roles,
          })
        })
        .catch(() => {
          signOut()
        })
    }

    loadInitialData()
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token, refreshToken, permissions, roles, name, id, ativo } =
        response.data

      if (!ativo) {
        alert('Usuário não está ativo. Entre em contato com o suporte.')
        return
      }

      setCookie(undefined, 'auth.token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })
      setCookie(undefined, 'auth.refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      })

      setUser({
        email,
        name,
        ativo,
        id,
        permissions,
        roles,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('E-mail or password incorrect.')
      } else {
        setErrorMessage('Failed to authenticate. Check your credentials.')
      }

      console.error('Error during authentication:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, broadcastAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
