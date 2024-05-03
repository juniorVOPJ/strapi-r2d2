import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Stack,
  Flex,
  Typography,
  Button,
} from "@strapi/design-system";

import { ExclamationMarkCircle, Trash } from "@strapi/icons";
const ClearChatGPTResponse = ({ isOpen, setIsOpen, onConfirm }) => {
  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      title="Confirmação"
      isOpen={isOpen}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Tem certeza de que deseja limpar o histórico do chatGPT?
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setIsOpen(false)} variant="tertiary">
            Cancelar
          </Button>
        }
        endAction={
          <Button
            onClick={onConfirm}
            variant="danger-light"
            startIcon={<Trash />}
          >
            Confirmar
          </Button>
        }
      />
    </Dialog>
  );
};

export default ClearChatGPTResponse;
