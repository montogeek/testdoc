import tailwindcss from 'tailwindcss';

export default {
    plugins: [require('postcss-import'), tailwindcss('./tailwind.config.js')]
};
