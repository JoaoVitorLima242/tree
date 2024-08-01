import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: string) => void;
}

export const AddMemberModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddMemberModalProps) => {
  const [name, setName] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Member</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => onSubmit(name)}
            disabled={!name}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
