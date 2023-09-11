/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'quantify-bold': ['Quantify-Bold', 'cursive'],
				'goldplay-bold': ['Goldplay-Medium', 'cursive']
			},
			colors: {
				'beam-dark-blue': '#196479',
				'beam-light-blue': '#96C8C7',
				'beam-dark-green': '#43956D',
				'beam-chartruese': '#D3E656',
				'beam-yellow': '#FFE134',
				'beam-red': '#FE5A1C',
				'beam-orange': '#FF9E28'
			},
			screens: {
				'mobile-width': {
					max: '1400px'
				}
			}
		}
	},
	plugins: []
}
