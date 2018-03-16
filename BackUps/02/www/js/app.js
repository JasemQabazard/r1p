// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('r1p', ['ionic', 'chart.js', 'validation.match', 'r1p.controllers', 'r1p.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    cache: false,
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'IndexController'
                }
            }
        })

  .state('app.change', {
    url: '/change',
    views: {
      'menuContent': {
          templateUrl: 'templates/change.html',
          controller:'EntryController'
      }
    }
  })

    .state('app.new', {
        url: '/new',
        views: {
            'menuContent': {
                templateUrl: 'templates/new.html',
                controller: 'NewController'
            }
        }
    })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
            templateUrl: 'templates/about.html',
            controller: 'AboutController'
        }
      }
    })
    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
            templateUrl: 'templates/help.html',
            controller: 'HelpController'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
