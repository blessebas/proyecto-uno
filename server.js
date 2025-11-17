require('module-alias/register');
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('@root/config/db.config.js');
const publicRoutes = require('@routes/public.routes');
const setupDevServer = require('@root/config/dev-server.config');

// setup dev server
if (process.env.NODE_ENV === 'development') {
    setupDevServer(app);
}

// connect to db
(async () => {
    try {
        await db.authenticate();
        await db.sync(); // sync models with database
        console.log('DB connected');
    } catch (err) {
        console.log('Error Database Connection : ' + err);
    }
})()

// static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/public.view.ejs');

// middlewares to read form data body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
app.use('/', publicRoutes);

// init server
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log('Server is running on port http://localhost:' + port);
});