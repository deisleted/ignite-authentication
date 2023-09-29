import React, { useState } from 'react'
import Link from 'next/link'
import { api } from '../services/apiClient'

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [roles, setRoles] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [userCreated, setUserCreated] = useState(false)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordsMatch(confirmPassword === event.target.value)
  }

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value)
    setPasswordsMatch(password === event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (password !== confirmPassword) {
        setPasswordsMatch(false)
        return
      }

      const rolesArray = roles.split(',').map((role) => role.trim())

      const response = await api.post('/createUser', {
        email,
        name,
        password,
        roles: rolesArray,
      })

      setEmail('')
      setName('')
      setPassword('')
      setConfirmPassword('')
      setRoles('')
      setPasswordsMatch(true)
      setUserCreated(true)
    } catch (error) {
      console.error('Error creating user:', error)
      // Handle any errors, e.g., display an error message
    }
  }

  return (
    <div>
      <Link href="/dashboard">
        <a>
          <button>Voltar à Página Principal</button>
        </a>
      </Link>

      <h1>Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirme a Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {!passwordsMatch && confirmPassword && (
            <div style={{ color: 'red' }}>
              As senhas não coincidem. Por favor, insira senhas iguais.
            </div>
          )}
        </div>
        <div>
          <label htmlFor="roles">Roles:</label>
          <select
            id="roles"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            required
          >
            <option value="">Selecione um cargo</option>
            <option value="Administrador">Administrador</option>
            <option value="Recebimento">Recebimento</option>
            <option value="Expedição">Expedição</option>
            <option value="Portaria">Portaria</option>
            <option value="Fornecedor">Fornecedor</option>
          </select>
        </div>
        <button type="submit">Criar Usuário</button>
      </form>

      {!passwordsMatch && confirmPassword && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          As senhas não coincidem. Por favor, insira senhas iguais.
        </div>
      )}

      {userCreated && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          Usuário criado com sucesso!
        </div>
      )}
    </div>
  )
}

export default CreateUser
