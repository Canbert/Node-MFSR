module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE ========
    // =====================================
    app.get('/', function (req, res) {
        if(req.isUnauthenticated()){
            res.redirect('/login');
        }
        else{
            res.redirect('/messenger');
        }
    });

    app.get('/messenger', function (req, res) {
        if(req.isUnauthenticated()){
            res.redirect('/login');
        }
        else {
            // user required for the navbar
            res.render('pages/messenger', {
                user : req.user // get the user out of session and pass to template
            });
        }
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        if(req.isUnauthenticated()){
            // render the page and pass in any flash data if it exists
            // user required for the navbar
            res.render('pages/login', {
                message: req.flash('loginMessage')
            });
        }
        else{
            res.redirect("/");
        }
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/messenger', // redirect to the secure messenger section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // REGISTER ==============================
    // =====================================
    // show the register form
    app.get('/register', function (req, res) {
        if(req.isUnauthenticated()){
            // render the page and pass in any flash data if it exists
            res.render('pages/register', {
                message: req.flash('signupMessage')
            });
        }
        else{
            res.redirect("/");
        }

    });

    // process the register form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/messenger', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/admin', function (req, res) {
        if(req.isUnauthenticated()){
            res.redirect('/login');
        }
        else {
            // user required for the navbar
            res.render('pages/admin', {
                user : req.user // get the user out of session and pass to template
            });
        }
    });

    app.get('/files', function (req, res) {
        if(req.isUnauthenticated()){
            res.redirect('/login');
        }
        else {
            // user required for the navbar
            res.render('pages/files', {
                user : req.user // get the user out of session and pass to template
            });
        }
    });

    app.get('/settings', function (req, res) {
        if(req.isUnauthenticated()){
            res.redirect('/login');
        }
        else {
            // user required for the navbar
            res.render('pages/settings', {
                user : req.user // get the user out of session and pass to template
            });
        }
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('*', function(req, res){
        res.status(404).render('pages/404');
    });
};
