import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import axios from "axios";
import { auth, useNotification } from "@strapi/helper-plugin";
import {
  Layout,
  Button,
  HeaderLayout,
  ContentLayout,
  Grid,
  GridItem,
  Box,
  TextInput,
  Main,
  SingleSelect,
  Typography,
  SingleSelectOption,
  Link,
} from "@strapi/design-system";

import { Check } from "@strapi/icons";

const AiModels = [
  {
    value: "gpt-4",
    label: "Um conjunto de modelos que melhoram o GPT-3.5 e podem entender e gerar linguagem natural ou código"
  },
  {
    value: "gpt-3.5-turbo",
    label: "Um conjunto de modelos que melhoram o GPT-3.5 e podem entender e gerar linguagem natural ou código"
  },
];

const ImageAiModels = [
  {
    value: "dall-e-3",
    label: "O modelo mais recente do DALL-E foi lançado em novembro de 2023."
  },
  {
    value: "dall-e-2",
    label: "O modelo mais recente do DALL-E foi lançado em novembro de 2023."
  }
]

const Settings = () => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const apiKeyRef = useRef("");
  const modelNameRef = useRef("gpt-3.5-turbo");
  const imageModelNameRef = useRef("dalle-3")
  const maxTokensRef = useRef(2048);

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.get("jwtToken")}`,
      "Content-Type": "application/json",
    },
  });

  const [chatGPTConfig, setChatGPTConfig] = useState({
    apiKey: "",
    modelName: "gpt-3.5-turbo",
    maxTokens: 2048,
    aiImageModelName: "dalle-3"
  });

  const setData = (data) => {
    setChatGPTConfig(data);
    // update the refs
    apiKeyRef.current = data.apiKey;
    modelNameRef.current = data.modelName;
    maxTokensRef.current = data.maxTokens;
    imageModelNameRef.current = data.aiImageModelName;
  };

  const handleChatGPTConfigChange = (key) => (e) => {
    console.log("key", e);
    // update the refs
    if (key === "modelName" || key === "aiImageModelName") {
      setChatGPTConfig({
        ...chatGPTConfig,
        [key]: e,
      });
    } else {
      setChatGPTConfig({
        ...chatGPTConfig,
        [key]: e.target.value,
      });
    }

    switch (key) {
      case "apiKey":
        apiKeyRef.current = e.target.value;
        break;
      case "modelName":
        modelNameRef.current = e;
        break;
      case "maxTokens":
        maxTokensRef.current = e.target.value;
        break;
      case 'aiImageModelName':
        imageModelNameRef.current = e;
      default:
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchChatGPTConfig = async () => {
      try {
        const { data } = await instance.get("/strapi-r2d2/config");
        setData(data);
      } catch (error) {
        console.log(error);
        toggleNotification({
          type: "warning",
          message: {
            id: "chatgpt-config-fetch-error",
            defaultMessage: "Erro ao buscar as configurações do chatGPT",
          },
        });
      }
    };
    fetchChatGPTConfig();
    setLoading(false);
  }, []);

  const handelSave = async () => {
    const config = {
      apiKey: apiKeyRef.current,
      modelName: modelNameRef.current,
      maxTokens: maxTokensRef.current,
    };

    // check if the api key  entered
    if (!config.apiKey) {
      toggleNotification({
        type: "warning",
        message: {
          id: "chatgpt-config-api-key-required",
          defaultMessage: "Digite a chave da API",
        },
      });
      return;
    }
    setLoading(true);

    try {
      const { data } = await instance.post("/strapi-r2d2/config/update", {
        ...chatGPTConfig,
      });
      if (data && data.value) {
        setData(JSON.parse(data.value));
      }
      setLoading(false);
      toggleNotification({
        type: "success",
        message: {
          id: "chatgpt-config-save-success",
          defaultMessage: "Configurações do ChatGPT salvas com sucesso",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toggleNotification({
        type: "warning",
        message: {
          id: "chatgpt-config-save-error",
          defaultMessage: "Erro ao salvar as configurações do chatGPT",
        },
      });
    }
  };

  return (
    <Layout>
      <Helmet title={" R Configuration"} />
      <Main aria-busy={false}>
        <HeaderLayout
          title={"Configurações do OpenAI ChatGPT"}
          subtitle={formatMessage({
            id: "chatgpt-config-headder",
            defaultMessage:
              "Configurar a chave da API, o nome do modelo e outros parâmetros",
          })}
          primaryAction={
            <Button
              startIcon={<Check />}
              onClick={handelSave}
              loading={loading}
            >
              Save
            </Button>
          }
        />

        <ContentLayout>
          <Box
            shadow="tableShadow"
            background="neutral0"
            paddingTop={6}
            paddingLeft={7}
            paddingRight={7}
            paddingBottom={6}
            hasRadius
          >
            <Grid gap={6}>
              <GridItem col={6}>
                <TextInput
                  type="text"
                  id="apiKey"
                  name="apiKey"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  label="API Key"
                  refs={apiKeyRef}
                  value={chatGPTConfig.apiKey}
                  onChange={handleChatGPTConfigChange("apiKey")}
                />
              </GridItem>

              <GridItem col={6}>
                <TextInput
                  type="text"
                  id="maxTokens"
                  name="maxTokens"
                  label="Max Tokens"
                  placeholder="2048"
                  refs={maxTokensRef}
                  value={chatGPTConfig.maxTokens}
                  onChange={handleChatGPTConfigChange("maxTokens")}
                />
              </GridItem>
              <GridItem>
                <SingleSelect
                  name="modelName"
                  id="modelName"
                  label="Nome do Modelo"
                  placeholder="Selecione um modelo"
                  refs={modelNameRef}
                  value={chatGPTConfig.modelName}
                  onChange={handleChatGPTConfigChange("modelName")}
                >
                  {AiModels.map((model) => (
                    <SingleSelectOption key={model.value} value={model.value}>
                      {model.value} - {model.label}
                    </SingleSelectOption>
                  ))}
                </SingleSelect>
              </GridItem>
            </Grid>
            <Grid paddingTop={3}>
              <GridItem col={1}>
                  <SingleSelect
                    name="aiImageModelName"
                    id="aiImageModelName"
                    label="Nome do Modelo de Imagem"
                    placeholder="Selecione um modelo de imagem"
                    refs={imageModelNameRef}
                    value={chatGPTConfig.aiImageModelName}
                    onChange={handleChatGPTConfigChange("aiImageModelName")}
                  >
                    {ImageAiModels.map((model) => (
                      <SingleSelectOption key={model.value} value={model.value}>
                        {model.value} - {model.label}
                      </SingleSelectOption>
                    ))}
                  </SingleSelect>
              </GridItem>
            </Grid>
            <Box paddingTop={3}>
              <Typography>
                Você pode definir parâmetros adicionais{" ("}
                <span>
                  <Link
                    href="https://platform.openai.com/docs/api-reference/completions"
                    target="_blank"
                  >
                    ChatGPT
                  </Link>
                </span>
                {") "}
                com a Integração da API, disponível no menu Plugin ChatGPT.
              </Typography>
            </Box>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  );
};

export default Settings;
