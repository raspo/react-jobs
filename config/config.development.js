module.exports = {
    http: {
        port: 3001 // 80 for prod
    },
    https: {
        port: 3000 // 443 for prod
    },
    db: {
        uri: 'mongodb://localhost/reactjobs',
        username: false,
        password: false
    },
    ssl: {
        key: 'ssl/server.key',
        cert: 'ssl/server.crt'
    }
};
