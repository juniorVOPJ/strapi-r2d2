<div align="center">
  <img src="https://github.com/juniorVOPJ/strapi-r2d2/blob/main/logo.png" width="200" height="200" alt="R2D2 Logo" />
</div>
<h1 align="center">Strapi R2D2</h1>

<p align="center">Integre o ChatGPT e o R2D2 em seu aplicativo Strapi. Você obtém uma interface de usuário para interagir com o ChatGPT e pontos de extremidade de API para integrar em seus aplicativos.</p>

# ChatGPT e R2D2 plugin para Strapi

[OpenAI](https://openai.com/) O ChatGPT é um sistema gerador automático de chatbot de IA criado pela Open AI para atendimento ao cliente on-line. É um bate-papo generativo pré-treinado, que utiliza o processamento de linguagem natural (NLP).

[Strapi](https://strapi.io/) é o principal sistema de gerenciamento de conteúdo sem cabeça e de código aberto. Ele é 100% JavaScript, totalmente personalizável e voltado para o desenvolvedor.

## Visão geral: Comece a usar o ChatGPT em seu aplicativo Strapi

Com esse plug-in, você pode adicionar chatbots com o ChatGPT e outras funcionalidades de processamento de linguagem natural ao seu aplicativo Strapi com facilidade. O plug-in fornece uma interface simples para configurar e implantar seus modelos ChatGPT, bem como ferramentas

A configuração do plug-in é muito fácil e pode ser concluída em 2 minutos.

1. Insira suas credenciais da API da OpenAI.
1. Opcionalmente, selecione o modelo que você deseja usar.

Pronto! Agora você pode usar o ChatGPT em seu aplicativo Strapi.

## ✨ Recursos

1. **Fácil de usar**: O plug-in é fácil de usar e pode ser configurado em 10 minutos.
1. **Personalizável**: Você pode personalizar os parâmetros do modelo para atender às suas necessidades.
1. **Código aberto**: O plug-in é de código aberto e pode ser encontrado no [GitHub]().
1. **Generate Pictures**: Pode gerar imagens com base no prompt fornecido.

## 🖐 Requisitos

1. [Node.js](https://nodejs.org/en/) versão 14 ou superior.
1. [Strapi](https://strapi.io/) versão v4.x ou superior.

> O plugin ChatGPT foi projetado para o **Strapi v4.x** e não funcionará com o Strapi v3.x.

## ⏳ Instalação

### 1. Instalar o plugin

```bash
npm install strapi-r2d2
```

ou

```bash
yarn add strapi-r2d2
```

### 2. Ativando o plugin

Vá para `<strapi app root>/config/plugins.js` Adicione o seguinte código.

```js
module.exports = ({ env }) => ({
    // ...
    "strapi-r2d2": {
        enabled: true,
    },
});
```

### 3. Criar e iniciar a interface do usuário do administrador

Depois disso, você precisará criar um novo pacote que inclua o plug-in ChatGPT. Para isso, execute os comandos abaixo:

```bash
npm run build && npm run develop
```

ou

```bash
yarn build && yarn develop --watch-admin
```

O plugin ChatGPT deve aparecer na seção Plugins da barra lateral do Strapi depois que você executar o aplicativo novamente.

Agora você está pronto para integrar o ChatGPT em seu site do Strapi 🎉

## 🔧 Configuração

Você pode configurar facilmente o plug-in ChatGPT no painel de administração do Strapi.

-   Vá para `Configurações` -> `R2D2 -> Configurações` na barra lateral.
-   Na página de configuração, insira todos os campos.
-   Clique em Save para salvar a configuração.

## 📖 Testando o plugin

-   Clique no plugin ChatGPT na seção de plugins da barra lateral.
-   Clique em Integration (Integração) para obter um código de integração de código de amostra.
-   Copie o código e cole-o em seu terminal.

# 📝 Licença

[MIT License](LICENSE.md)

<br/><br/>

# Contatos (Contacts)

[Site](https://vilmojr.com)
[OrcID](https://orcid.org/0000-0001-8912-2538)
[Linkedin](https://www.linkedin.com/in/juniorvopj/)
[Instagram](https://www.instagram.com/junior.vopj)
[Youtube](https://www.youtube.com/@juniorvopj)
[Spotify](https://open.spotify.com/intl-pt/artist/473rn7GqFrubHex9n7uCjz)
[X](https://twitter.com/juniorvopj)
