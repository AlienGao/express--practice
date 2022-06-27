const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost",
    port: '8080',
    https: false,
    proxy: 'http://127.0.0.1:3000/api',
  }
});
