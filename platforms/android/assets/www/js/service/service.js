app.service('VideosService', function($http, $q) {
    var self = this;
    self.videos = false;
    this.getAll = function() {
        var deferred = $q.defer(); // on utilise le service $q pour attendre les données
        if (self.videos !== false) { // si les vidéos sont déjà récupérées
            deferred.resolve(self.videos);
        } else { // sinon
            $http.get('json/videos.json').success(function(data, status) {
                self.videos = data; // on sauvegarde les données
                deferred.resolve(data); // la promesse retournera les données récupérées
            }).error(function(data, status) {
                deferred.reject('Impossible de récupérer les vidéos'); // la promesse retournera une erreur
            });
        }
        return deferred.promise; // on retourne la promesse
    }
    this.get = function(id) {
        var deferred = $q.defer();
        // on fait appel à la fonction getAll pour récupérer toutes les vidéos et on utilise then pour attendre la promesse puis on fait appel à deux fonctions de callback
        var videos = self.getAll().then(function(videos) {
            // fonction de succès
            angular.forEach(videos, function(video) {
                if (video.id == id) {
                    deferred.resolve(video); // on retourne la vidéo quand les id sont égaux
                }
            });
        }, function(msg) {
            // fonction d'erreur
            deferred.reject(msg);
        })
        return deferred.promise; // on retourne la promesse
    }
});