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
        $http.get('http://localhost:1337/api/getAllItens').success(function (retorno) {
            $scope.mangas = retorno.mangas;
        });
    };

    $scope.insertEdition = function() {
        $http.post('http://localhost:1337/api/insertItem', $scope.manga).success(function() {
            $scope.mangas.push($scope.manga);
            $scope.manga = new Manga();
        });
    }

    $scope.deleteEdition = function (index) {
        var MangaToDelete = $scope.mangas[index];
        console.log(MangaToDelete);
        $http.post('http://localhost:1337/api/deleteItem', MangaToDelete).success(function() {
            $scope.mangas.splice(index, 1);
            alert("Deleted.");
        });
    }

    $scope.updateEdition = function (index) {
        var MangaToUpdate = $scope.mangas[index];

        $http.post('http://localhost:1337/api/updateItem', MangaToUpdate).success(function() {
            alert("Updated.");
        });
    }

    $scope.listEditions();
}