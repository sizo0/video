var app = angular.module('MyVideos', ['ngRoute']); // création d'un nouveau module et utilisation du service ngRoute
app.config(function($routeProvider) {
    $routeProvider.when('/', { // si on est à la racine, on fait appel à home.html
        templateUrl: 'include/home.html',
        controller: 'Home'
    }).when('/about', { // /about, on fait appel à about.html
        templateUrl: 'include/about.html',
        controller: 'About'
    /*}).when('/video/:id', { // /video/:id, on fait appel à video.html (id représente une valeur passée dans l'url qu'on peut récupérer par $routeParams)
        templateUrl: 'include/video.html',
        controller: 'Play'*/
    }).otherwise({ // sinon, on redirige vers la page d'accueil
        redirectTo: '/'
    });
});
$(document).ready(function() {
    document.addEventListener('deviceready', function() {
        //code cordova
        //navigator.splashscreen.hide();
        document.addEventListener("menubutton", function(){
          //alert("menu button");
        }, false);
      document.addEventListener('touchmove', function(e) {
          //e.preventDefault();
      }, false);
      window.addEventListener('orientationchange', function(e){
          switch (window.orientation) {
              case 90:
              case -90:
                  //landscape
                  break;
              default:
                  //portrait
          }
          //changeSize($("#home"));
      });
    }, false);
});
function getWindowSizes() {
  var windowHeight = 0, windowWidth = 0;
  if (typeof (window.innerWidth) == 'number') {
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
      
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      windowHeight = document.documentElement.clientHeight;
      windowWidth = document.documentElement.clientWidth;
      
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
     windowHeight = document.body.clientHeight;
     windowWidth = document.body.clientWidth;
  }
  return [windowWidth, windowHeight];
}

function changeSize ($element) {
    var size = getWindowSizes();
    $element.css({
        backgroundSize: size[0] + "px" + " " + size[1] + "px"
    });
}