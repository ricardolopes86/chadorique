module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.render('pages/index');
    });

    app.get('/entrar', (req, res, next) => {
        res.render('pages/entrar');
    });
}