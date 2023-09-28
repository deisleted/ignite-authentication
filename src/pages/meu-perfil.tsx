import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { api } from '../services/apiClient';

const MeuPerfil = () => {
  const { user, signOut } = useAuth();

  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('/me');
        setUserData(response.data);
        setNewName(response.data.name); 
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    }

    if (!user) {
      signOut();
    } else {
      fetchUserData();
    }
  }, [user]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!passwordsMatch) {
      alert('As senhas não coincidem. Por favor, insira senhas iguais.');
      return;
    }

    try {
      const response = await api.put('/me/editar', {
        email: userData.email,
        newName,
        newPassword: password,
      });

      setShowSuccessAlert(true); // Exibir o alerta de sucesso
      console.log('Dados atualizados com sucesso:', response.data);
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      // Trate o erro, se necessário
    }
  };

  return (
    <div>
      <Link href="/dashboard">
        <a>
          <button>Voltar à Página Principal</button>
        </a>
      </Link>

      <h1>Meu Perfil</h1>
      {userData && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newName} 
              onChange={handleNameChange} 
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="password">Nova Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
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
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />

      {showSuccessAlert && (
        <div style={{ color: 'green' }}>Usuário atualizado com sucesso!</div>
      )}




          {!passwordsMatch && confirmPassword && (
            <div style={{ color: 'red' }}>As senhas não coincidem. Por favor, insira senhas iguais.</div>
          )}



          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      )}
    </div>
  );
};

export default MeuPerfil;
