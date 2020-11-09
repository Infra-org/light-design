const {paths} = require('./utils');

const fileLoader = (name) => ({
      loader: 'file-loader',
      options: {
            publicPath: '',
            context: paths.miniprogram || paths.root,
            name
      }
});

module.exports = [
      {
            test: /\.ts$/,
            exclude: paths.node_modules,
            use: [
                  'cache-loader',
                  'ts-loader'
            ]
      },
      {
            test: /.wxml/,
            use: [fileLoader('[path][name].[ext]'), 'mini-program-webpack-loader']
      },
      {
            test: /\.wxss$/,
            use: [fileLoader('[path][name].[ext]'), 'mini-program-webpack-loader']
      },
      {
            test: /\.less$/,
            use: [
                  fileLoader('[path][name].wxss'),
                  {
                        loader: 'less-loader'
                  }
            ]
      },
      {
            test: /.wxs$/,
            use: [fileLoader('[path][name].[ext]'), 'babel-loader', 'mini-program-webpack-loader']
      },
      {
            test: /\.json/,
            type: 'javascript/auto',
            use: [fileLoader('[path][name].[ext]')]
      },
      {
            test: /\.(svg|png|jpg|jpeg|gif)$/,
            include: paths.miniprogram,
            use: fileLoader('[path][name].[ext]')
      }
];
