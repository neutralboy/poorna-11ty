/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./_includes/*html", "./static/*.html", "./post/*.md"],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        'code::before': {
                            content: '""'
                        },
                        'code::after': {
                            content: '""'
                        }
                    }
                }
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
