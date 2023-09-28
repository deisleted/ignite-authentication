import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { api } from '../services/apiClient';
import EditUserModal from '../components/EditUserModal';



interface UserData {
  id: string;
  email: string;
  name: string;
  ativo: boolean;
  roles: string[];
}

const UserTable = () => {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState([]);
  const [modalUserData, setModalUserData] = useState(null);
  const [activeSuccessMessage, setActiveSuccessMessage] = useState('');
  const [disibleSuccessMessage, setDisibleSuccessMessage] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('/users/all');
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    }

    if (!user) {
      signOut();
    } else {
      fetchUserData();
    }
  }, [user, signOut]);



  // Editar Usuário
  const handleEditUser = (userId) => {
    const selectedUser = userData.find(user => user.id === userId);
    setModalUserData(selectedUser); // Defina os dados do usuário selecionado para o modal
    setIsEditModalOpen(true); // Abra o modal de edição
  };
  
  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null); // Limpa os dados do usuário ao fechar o modal
  };


  // Ativar ou desativar Usuario
  const handleActiveUser = (userId) => {
    updateUserStatus(userId, true);
    setActiveSuccessMessage('Usuário Ativiado com Sucesso');
  };
  
  const handleDisableUser = (userId) => {
    updateUserStatus(userId, false);
    setDisibleSuccessMessage('Usuário Desativado com Sucesso');
  };
  
  const updateUserStatus = (userId, active) => {
    api.patch(`/users/${userId}`, { ativo: active })
      .then((response) => {
        console.log(`Usuário ${active ? 'ativado' : 'desativado'} com sucesso!`, response.data);
  
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user.id === userId ? { ...user, ativo: active } : user
          )
        );
      })
      .catch((error) => {
        console.error(`Erro ao ${active ? 'ativar' : 'desativar'} o usuário:`, error);
      });
  };

  
  // Resetar Senha
  const handleResetPassword = async (userId) => {
    try {
      // Faça a requisição para a rota de resetar senha com o ID do usuário
      await api.patch(`/users/reset-password/${userId}`);
      console.log('Senha do usuário resetada com sucesso.');
      setResetSuccessMessage('Senha do usuário resetada com sucesso.');
    } catch (error) {
      console.error('Erro ao resetar a senha do usuário:', error);
    }
  };

  return (
    <div>
      <Link href="/dashboard">
        <a>
          <button>Voltar à Página Principal</button>
        </a>
      </Link>

      <h1>Lista de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nome</th>
            <th>Ativo</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.ativo ? 'Sim' : 'Não'}</td>
              <td>{user.roles}</td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button onClick={() => handleActiveUser(user.id)} value="true">
                  <i className="fas fa-ban"></i> Ativar
                </button>
                <button onClick={() => handleDisableUser(user.id)} value="false">
                  <i className="fas fa-ban"></i> Desativar
                </button>
                <button onClick={() => handleResetPassword(user.id)}>
                  <i className="fas fa-key"></i> Resetar Senha
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <EditUserModal isOpen={isEditModalOpen} onClose={closeModal} userData={modalUserData} />


      {resetSuccessMessage && <div>{resetSuccessMessage}</div>}
      {activeSuccessMessage && <div>{activeSuccessMessage}</div>}
      {disibleSuccessMessage && <div>{disibleSuccessMessage}</div>}

    </div>
  );
};

export default UserTable;
