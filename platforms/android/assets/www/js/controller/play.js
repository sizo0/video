app.controller('Play', function($scope, VideosService, $routeParams, $rootScope, $sce) {
    $scope.video = {}; // objet vide à l'init
    $rootScope.header = ""; // header vide à l'init
    // demande au modèle la récupération d'une vidéo grâce à l'id qui est passé par url, puis l'utilisation de then pour attendre la promesse
    VideosService.get($routeParams['id']).then(function(video) {
        // fonction succès
        $scope.video = video; // fournir la vidéo à la vue
        $rootScope.header = video.title.toUpperCase(); // modification du header
        $scope.video.link = $sce.trustAsResourceUrl(String(video.link)); // dire à angluar js que le lien est fiable
        var name = video.link;
        window.Video.startVideoActivity();
        window.VideoPlugin.playVideo(name);
        //window.VideoPlugin.playVideo(video.link));
    }, function(msg) {
        // fct erreur
        console.log(msg);
    });
});