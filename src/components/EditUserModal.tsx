import ReactModal from 'react-modal';


interface UserData {
  id: string;
  email: string;
  name: string;
  ativo: boolean;
  roles: string[];
}


interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}
const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, userData }) => {
  if (!userData) {
    return null; 
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} 
    >
      <h2>Editar Usuário</h2>
      <form>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={userData.name || ''} required />

        <label htmlFor="role">role:</label>
        <input type="text" id="role" value={userData.roles || ''} required />
    
        <label htmlFor="email">email:</label>
        <input type="text" id="email" value={userData.email || ''} required />
      </form>
      <button type="submit">Salvar Alterações</button>
      <button onClick={onClose}>Fechar</button>
    </ReactModal>
  );
};


export default EditUserModal;
