const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/cocktailsApp',
        options: {useNewUrlParser: true}
    },
    google: {
        clientId: '968306197446-7v11ok6h7o5tmleojfjc336c3ik2tu4o.apps.googleusercontent.com',
    }
};