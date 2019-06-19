var Encore = require('@symfony/webpack-encore');

const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project
    content: [
        './templates/**/*.html',
        './templates/**/*.twig',
        // etc.
    ],
    extractors: [
        {
            extractor: class {
                static extract(content) {
                    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
            },

            // Specify all of the extensions of your template files
            extensions: ['html', 'twig']
        }
    ]
})

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        Encore.isProduction() ? purgecss : null
    ]
}