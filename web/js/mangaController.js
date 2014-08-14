var url = "http://localhost:1337";

function MangaController($scope, $http) {

    function Manga()  {
        this.title = '';
        this.author = '';
        this.currentVolume = 0;
        this.lastVolumePurchased = 0;
        this.rate = 0;
        this.publisher = '';
        this.buyImportance = 0;
        this.price = 0;
        this.finished = false;
        this.linkToDescription = '';
    }
    
    $scope.listEditions = function () {
        $http.get(url + '/api/manga').success(function (retorno) {
            $scope.mangas = retorno.mangas;
        });
    };

    $scope.insertEdition = function() {
        $http.post(url + '/api/manga', $scope.manga).success(function() {
            $scope.mangas.push($scope.manga);
            $scope.manga = new Manga();
        });
    }

    $scope.deleteEdition = function (index) {
        var MangaToDelete = $scope.mangas[index];
        
        var resquest = $http({
          method: "delete",
          url: url + '/api/manga/',
          params: { id: MangaToDelete._id }
        });

        resquest.then(
          function(){
            $scope.mangas.splice(index, 1);
            alert("Deleted.");
        },

        function(err){
            alert('error:' + err);

        });
    }

    $scope.updateEdition = function (index) {
        var MangaToUpdate = $scope.mangas[index];

        $http.put(url + '/api/manga', MangaToUpdate)
        .success(function() {
            alert("Updated.");
        })
        .error(function(err){
          alert("error:" + err);
        })
    }

    $scope.listEditions();
}