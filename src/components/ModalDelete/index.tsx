import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './styles.scss';

interface IModalDelete {
  title: string;
  show: boolean;
  setShow: (show: boolean) => void;
  id: string;
  deleteAction: (id: string) => void;
}

const ModalDelete = ({ title, show, setShow, id, deleteAction }: IModalDelete): React.ReactElement => (
  <Modal show={show} onHide={() => setShow(false)} className="modal">
    <Modal.Header closeButton closeVariant="white">
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShow(false)}>
        Cancelar
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          deleteAction(id);
          setShow(false);
        }}
      >
        Excluir
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalDelete;
