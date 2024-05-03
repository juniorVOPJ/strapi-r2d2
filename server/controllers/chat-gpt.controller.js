"use strict";

module.exports = ({ strapi }) => ({
  async prompt(ctx) {
    const data = await strapi
      .plugin("strapi-r2d2")
      .service("R2D2Service")
      .getResponsefromChatGpt(ctx);
    ctx.send(data);
  },

  async getConfig(ctx) {
    const config = await strapi
      .plugin("strapi-r2d2")
      .service("R2D2Service")
      .getConfig();
    ctx.send(config);
  },

  async updateConfig(ctx) {
    const config = await strapi
      .plugin("strapi-r2d2")
      .service("R2D2Service")
      .updateConfig(ctx);
    ctx.send(config);
  },

  async createImage(ctx) {
    const config = await strapi
    .plugin("strapi-r2d2")
    .service("R2D2Service")
    .getImageResponsefromChatGpt(ctx);
    ctx.send(config);
  },
});
