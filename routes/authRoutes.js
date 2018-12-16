const passport = require('passport'); 
//requires passport npm module, not passport.js

module.exports = app => {
    //http get, route handler
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
                //what access we want to have(scope)
                scope: ['profile', 'email']
        })
    );

    //use passport for this route handler
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }   
    );
    
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.redirect('/'); //logged out user to landing page
    });
    
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    });
};