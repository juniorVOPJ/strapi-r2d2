import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import axios from "axios";
import { auth } from "@strapi/helper-plugin";
import {
  Button,
  TextInput,
  SingleSelect,
  SingleSelectOption,
  Layout,
  HeaderLayout,
  ContentLayout,
  Main,
  Box,
  Card,
  CardBody,
  CardContent,
  Grid,
  GridItem,
  IconButton,
  ActionLayout,
  Tooltip,
  Stack,
  Divider,
} from "@strapi/design-system";
import { PaperPlane, Command, Trash, Cog, Picture } from "@strapi/icons";
import Response from "../Response";
import Help from "../Help";
import LoadingOverlay from "../Loading";
import ClearChatGPTResponse from "../ClearChatGPTResponse";
import Integration from "../Integration";

const imageFormats = [
  "Escolha um formato de imagem",
  "1024x1024",
  "1024x1792",
  "1792x1024",
]

const Home = () => {
  const { formatMessage } = useIntl();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [responses, setResponses] = useState([]);
  const [format, setFormat] = useState(imageFormats[0])
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApiIntegrationModalVisible, setIsApiIntegrationModalVisible] =
    useState(false);
  const [
    isClearChatGPTResponseModalVisible,
    setIsClearChatGPTResponseModalVisible,
  ] = useState(false);

  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.get("jwtToken")}`,
      "Content-Type": "application/json",
    },
  });

  const clearResponses = () => {
    setResponses([]);
    setIsClearChatGPTResponseModalVisible(false);
  };

  const handleInputChange = (e) => {
    setError(false);
    setContent(e.target.value);
  };

  const handleImageSizeChange = (e) => {
    setFormat(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!content) {
      setError("O prompt é necessário");
      return;
    }

    let response;

    if (e.target.name === "picture") {
      if (format === imageFormats[0]) {
        setError("O tamanho da imagem é necessário")
        return;
      }
      setLoading(true);
      const { data } = await instance.post("/strapi-r2d2/generateImage", {
        prompt: content,
        size: format,
      });
      response = data;
    } else {
      setLoading(true);
      const { data } = await instance.post("/strapi-r2d2/prompt", {
        prompt: content,
      });
      response = data
    }

    if (response.error || !response.response) {
      setLoading(false);
      setError(response.error);
      return;
    }

    setResponses([
      ...responses,
      {
        you: content,
        bot: response.response,
      },
    ]);

    setLoading(false);
    setContent("");
  };

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  return (
    <Layout>
      <Helmet title={"strapi-r2d2"} />
      <Main aria-busy={false}>
        <HeaderLayout
          title={"R2D2"}
          subtitle={formatMessage({
            id: "chatgpt-header",
            defaultMessage: "Plugin ChatGPT para o Strapi",
          })}
        />

        <ActionLayout
          startActions={
            <Stack horizontal gap={2}>
              <Button
                variant="secondary"
                startIcon={<Command />}
                onClick={() => setIsModalVisible(true)}
              >
                Terminal
              </Button>
              <Button
                variant="secondary"
                startIcon={<Cog />}
                onClick={() => setIsApiIntegrationModalVisible(true)}
              >
                API
              </Button>
              <SingleSelect onChange={handleImageSizeChange} value={format}>
                {imageFormats.map((format, idx) => (
                  <SingleSelectOption key={idx} value={format}>
                    {format}
                  </SingleSelectOption>
                ))}
              </SingleSelect>
            </Stack>
            }
          endActions={
            <Tooltip description="Limpar histórico" position="left">
              <IconButton
                disabled={loading || responses.length === 0}
                onClick={() => setIsClearChatGPTResponseModalVisible(true)}
                icon={<Trash />}
              />
            </Tooltip>
          }
        />

        <ContentLayout>
          <ClearChatGPTResponse
            isOpen={isClearChatGPTResponseModalVisible}
            setIsOpen={setIsClearChatGPTResponseModalVisible}
            onConfirm={clearResponses}
          />
          <Card style={{ position: "relative" }}>
            <CardBody
              style={{
                height: "64vh",
                overflowY: "scroll",
              }}
            >
              <CardContent>
                <LoadingOverlay isLoading={loading} />
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "auto",
                      justifyContent: "flex-end",
                    }}
                  >
                    {responses.map((response, index) => (
                      <>
                        <Response key={index + "123"} data={response} />
                        <Box paddingTop={2} paddingBottom={4}>
                          <Divider />
                        </Box>
                      </>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </CardContent>
            </CardBody>
          </Card>

          <Box>
            <form>
              <Grid spacing={2} gap={2} paddingTop={4}>
                <GridItem col={10}>
                  <TextInput
                    id="chatInput"
                    placeholder="Digite sua mensagem ..."
                    aria-label="Content"
                    name="content"
                    error={error}
                    onChange={handleInputChange}
                    value={content}
                    disabled={loading}
                    onpaste={(e) => {
                      e.preventDefault();
                      setError(false);
                    }}
                  />
                </GridItem>
                <GridItem style={{width: 80}}>
                  <Button
                    size="L"
                    name="prompt"
                    startIcon={<PaperPlane />}
                    value="prompt"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Diálogo
                  </Button>
                </GridItem>
                <GridItem style={{float: screenLeft}}>
                  <Button
                    size={"L"}
                    name="picture"
                    value="picture"
                    onClick={handleSubmit}
                    startIcon={<Picture />}>
                    Imagem
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </Box>
        </ContentLayout>

        <Help
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
        <Integration
          isOpen={isApiIntegrationModalVisible}
          onClose={() => setIsApiIntegrationModalVisible(false)}
        />
      </Main>
    </Layout>
  );
};

export default Home;
