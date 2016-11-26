module.exports = function (app) {

    // =====================================
    // HOME PAGE ========
    // =====================================
    app.get('/', function (req, res) {
        // user required for the navbar
        res.render('pages/home',{
        });
    });

    app.get('/login', function (req, res) {
        // user required for the navbar
        res.render('pages/login',{
        });
    });

    app.get('/register', function (req, res) {
        // user required for the navbar
        res.render('pages/register',{
        });
    });

    app.get('/admin', function (req, res) {
        // user required for the navbar
        res.render('pages/admin',{
        });
    });

    app.get('/files', function (req, res) {
        // user required for the navbar
        res.render('pages/files',{
        });
    });

    app.get('/settings', function (req, res) {
        // user required for the navbar
        res.render('pages/settings',{
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
