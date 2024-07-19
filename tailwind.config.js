/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#233D90",
				secondary: "#FF8946",
			}
		},
	},
	plugins: [],
}

