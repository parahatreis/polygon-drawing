import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteDrawing: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, handleDeleteDrawing }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warning!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete the current drawing?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            onClick={handleDeleteDrawing}
            variant="ghost"
            colorScheme="red"
            size="md"
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
