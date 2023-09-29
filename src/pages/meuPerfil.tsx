import Link from 'next/link'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContexts'
import { api } from '../services/apiClient'
import styled from './meuPerfil.module.css'

const MeuPerfil = () => {
  const { user, signOut } = useAuth()

  const [userData, setUserData] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('/me')
        setUserData(response.data)
        setNewName(response.data.name)
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error)
      }
    }

    if (!user) {
      signOut()
    } else {
      fetchUserData()
    }
  }, [user])

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setPasswordsMatch(event.target.value === confirmPassword)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    setPasswordsMatch(event.target.value === password)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!passwordsMatch) {
      alert('As senhas não coincidem. Por favor, insira senhas iguais.')
      return
    }

    try {
      const response = await api.put('/me/editar', {
        email: userData.email,
        newName,
        newPassword: password,
      })

      setShowSuccessAlert(true) // Exibir o alerta de sucesso
      console.log('Dados atualizados com sucesso:', response.data)
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error)
      // Trate o erro, se necessário
    }
  }

  return (
    <div className={styled.container}>
      {userData && (
        <form onSubmit={handleSubmit} className={styled.form}>
          <div>
            <h1>Editar Perfil</h1>
            <span>
              Preencha os campos abaixo para realizar a edição do perfil.
            </span>
          </div>
          <div>
            <label htmlFor="name" className={styled.label}>
              Nome:
            </label>
            <input
              className={styled.input}
              type="text"
              id="name"
              name="name"
              value={newName}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={styled.label}>
              Email:
            </label>
            <input
              className={styled.input}
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="password" className={styled.label}>
              Nova Senha:
            </label>
            <input
              className={styled.input}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styled.label}>
              Confirme a Senha:
            </label>
            <input
              className={styled.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />

            {showSuccessAlert && (
              <div style={{ color: 'green' }}>
                Usuário atualizado com sucesso!
              </div>
            )}

            {!passwordsMatch && confirmPassword && (
              <div style={{ color: 'red' }}>
                As senhas não coincidem. Por favor, insira senhas iguais.
              </div>
            )}
          </div>
          <button className={styled.button} type="submit">
            Salvar Alterações
          </button>
        </form>
      )}
    </div>
  )
}

export default MeuPerfil
