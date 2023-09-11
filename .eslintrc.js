module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'@vue/standard',
		'eslint:recommended'
	],
	parserOptions: {
		parser: '@babel/eslint-parser'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 0,
		'vue/html-indent': ['error', 'tab'], // enforce tabs in template
		indent: ['error', 'tab'] // enforce tabs in script and js files
	}
}
