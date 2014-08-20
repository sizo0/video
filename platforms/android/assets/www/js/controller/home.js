app.controller('Home', function($scope, VideosService, $rootScope, $location, $sce) {
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
    $scope.playVideo = function(id){
        VideosService.get(id).then(function(video) {
            // fonction succès
            var name = video.link;
            try {
                // appel à la fonction java pour lire la vidéo
                window.Video.startVideoActivity(name.toString());
            } catch (e) {
                alert(e.message);
            }
        }, function(msg) {
            // fct erreur
            console.log(msg);
        });
    }
    document.addEventListener("backbutton", function(e) {
        e.preventDefault();
        $location.url('/home');
        console.log('home');
    }, false);
});