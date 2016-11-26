module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE ========
    // =====================================
    app.get('/', function (req, res) {
        // user required for the navbar
        res.render('pages/home',{
        });
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
        successRedirect : '/', // redirect to the secure profile section
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
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

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
