
Router.configure({
  layoutTemplate: 'layout'
  // loadingTemplate: 'loading'
});


// Default route
Router.route('/', function () {
    Router.go('singleview');
});

// Dashboard
Router.map(function(){
    this.route('singleview', function(){
        this.render('singleview');
    });
    this.route('submenu', function(){
        this.render('submenu');
    });
});
