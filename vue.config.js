const path = require('path');
module.exports = {
   
    chainWebpack: config => {
        // Remove prefetch plugin and that's it!
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@themeConfig': path.resolve(__dirname, 'theme.config.js'),                
            }
        }
    }
};

process.env.VUE_APP_API_BASE_URL = "https://blogbook.trustdigital.space/api/v1/";

