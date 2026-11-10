const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'Photographies aériennes de la Loire-Atlantique | La Loire-Atlantique vue du ciel',
    // Replaces the {{siteHost}} token in markdown pages (default-page template).
    siteHost: 'ortho44-2018.netlify.app',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [autoprefixer()],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    'gatsby-plugin-netlify-cms',
  ],
};
