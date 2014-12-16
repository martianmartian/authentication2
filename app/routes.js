// app/routes.js

module.exports = function(app,passport){
  //===
  // HOME PAGE (with login links) ===
  //====
  app.get('/',function(req,res){
    res.render('index.ejs'); // load the index.ejs file
  });

  app.get('/login',function(req,res){
    // render the page and pass in any flash data if exists
    res.render('login.ejs',{message: req.flash('loginMessage')});

  });

  app.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash : true
  }));

  app.get('/signup',function(req,res){
    //render the page and pass in any flash data if exists
    res.render('signup.ejs',{message: req.flash('signupMessage')})
  });

  app.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));


  app.get('/profile',isLoggedIn,function(req,res){
    res.render('profile.ejs',{
      user: req.user // get the user out of session and pass to template
    });
  });


  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
  });
};


function isLoggedIn(req,res,next){
  // if user is authenticated in the session, carry on
  if(req.isAuthenticated())
    return next();
  // if they aren't, redirect them to the home page
  res.redirect('/');
}





























