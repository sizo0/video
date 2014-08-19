app.controller('Home', function($scope, VideosService, $rootScope, $location) {
    $scope.videos = []; // tableau de vidéos vide à l'initialisation
    $rootScope.header = 'Accueil'; // header est tjrs égale à Accueil (c'est le scope (vue) qui s'en charge)
    // demander au modèle (service) la récupération de toutes les vidéos et l'utilisation de then pour attendre la promesse
    VideosService.getAll().then(function(videos) {
        // fonction succès
        $scope.videos = videos; // fournir à la vue les vidéos
    }, function(msg) {
        // fonction d'erreur
        console.log(msg);
    });
    // rediriger vers une vidéo
    $scope.goTo = function(url) {
        $location.url(url);
    }
});