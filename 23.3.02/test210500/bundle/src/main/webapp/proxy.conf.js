const apiHost = process.env.npm_config_apihost || 'localhost';

module.exports = [
  {
    context: (path, req) => path.includes('/api') || path.includes('/scripts'),
    target: `http://${apiHost}:8008`
  }
];
