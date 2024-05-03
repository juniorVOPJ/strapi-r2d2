import React from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  Typography,
  Box,
} from "@strapi/design-system";

const Help = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <ModalLayout onClose={() => onClose(!isOpen)} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Ajuda
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography variant="omega">
              Você pode usar prompts como os seguintes para obter uma resposta significativa do chatGPT:
            </Typography>
            <br />
            <br />
            <Typography variant="omega">
              <ol>
                <li>1. Crie um questionário com 5 perguntas de múltipla escolha que avaliem a compreensão dos alunos sobre [conceito que está sendo ensinado]</li>
                <li>2. Encontre o bug com este código: [postar código abaixo].</li>
                <li>3. O que exatamente esse regex faz? rege(x(es)?|xps?)</li>
                <li>4. Descreva [tópico de sua escolha] em detalhes</li>
                <li>5. Forneça uma definição para o termo médico 'taquicardia'</li>
              </ol>
            </Typography>
            <br />
            <Typography variant="omega">
              <a href="https://prompts.chat" target="_blank">
                Clique aqui
              </a>{" "}
              para obter mais solicitações do ChatGPT.
            </Typography>
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
};

export default Help;
