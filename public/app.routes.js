angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider,$locationProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'

        })
      
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
})