/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					50: "#eef4ff",
					100: "#dbe6fe",
					200: "#bfd3fd",
					300: "#92b5fb",
					400: "#5f8ef7",
					500: "#3968f0",
					600: "#264ce4",
					700: "#1f3dcf",
					800: "#1f34a8",
					900: "#1f3184",
					950: "#161e4d",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
}
