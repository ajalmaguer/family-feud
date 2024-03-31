import { FunctionComponent, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, useModal } from '../component-library/Modal';

export const RouteModal: FunctionComponent<{
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}> = ({ title, description, children }) => {
  const editModal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    editModal.open();
    return () => {
      editModal.close();
    };
  }, []);

  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={() => {
        editModal.close();
        navigate(-1);
      }}
      title={title}
      description={description}
    >
      {children}
    </Modal>
  );
};
