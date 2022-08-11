/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				Roboto: ["Roboto", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.25s ease-in-out",
				"fade-out": "fadeOut 0.25s forwards",
				"slide-in": "slideIn 0.30s ease-in-out",
				"slide-out": "slideOut 0.30s ease-in-out",
			},
			boxShadow: {
				cartModal:
					"rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px;",
				productImage: "rgb(0 0 0 / 5%) 0px 5px 5px",
			},
			keyframes: {
				fadeIn: {
					"0%": {
						opacity: 0,
					},
					"100%": {
						opacity: 1,
					},
				},

				fadeOut: {
					"0%": {
						opacity: 1,
					},
					"100%": {
						opacity: 0,
					},
				},

				slideIn: {
					"0%": {
						transform: "translateX(100%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},

				slideOut: {
					"0%": {
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(100%)",
					},
				},
			},
		},
	},
	plugins: [],
};
