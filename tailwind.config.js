/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
];
export const theme = {
    extend: {},
};
export const plugins = [
    require('tailwind-scrollbar-hide'), // 👈 Add this line
];
