module.exports = {
  eslint: {
    // enable: false,
  },
  devServer: {
    // port: 9090,
  },
  // entry: ['react-hot-loader/patch', './src'],
  webpack: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
};
