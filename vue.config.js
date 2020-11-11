module.exports = {
  devServer: {
    proxy: {
      // vue 脚手架处理跨域
      // key: value
      //  key - 前缀  /migu
      // value - 跟 http-proxy-middleware 相同的一个配置
      '/migu': {
        target: 'https://api.asilu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/migu': ''
        }
      },
      '/api': {
        target: 'https://mhd.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
