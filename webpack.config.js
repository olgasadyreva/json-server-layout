const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: './[name][ext]',
	},

	devServer: {
		static: {
			directory: './dist',
			watch: true,
		},
		port: 3000,
		open: true,
		hot: true,
		proxy: [
			{
				context: ['/api'],
				target: 'http://localhost:4545',
				pathRewrite: { '^/api': '' },
				changeOrigin: true,
				secure: false,
				// Добавляем bypass для статических файлов
				bypass: function (req, res, proxyOptions) {
					// Пропускаем запросы к статическим файлам
					if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf|ico)$/)) {
						console.log('Static file bypass:', req.url);
						return req.url;
					}
					// Пропускаем запросы к bootstrap-icons
					if (req.url.includes('bootstrap-icons') || req.url.includes('cdn.jsdelivr.net')) {
						console.log('Bootstrap icons bypass:', req.url);
						return req.url;
					}
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: {
						list: [
							{ tag: 'img', attribute: 'src', type: 'src' },
							{ tag: 'img', attribute: 'srcset', type: 'srcset' },
							{ tag: 'link', attribute: 'href', type: 'src' },
						],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
}
