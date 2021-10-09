const apiHost = process.env.npm_config_apihost || 'localhost';

module.exports = {
    '/api': {
        target: `http://${apiHost}:8008`,
        secure: false
    }
};
