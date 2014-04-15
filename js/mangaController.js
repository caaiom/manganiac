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

    $scope.listEditions();

    /**$scope.editaItem = function () {
    	$scope.item.push({
    		produto: $scope.item.produto,
    		quantidade: $scope.item.quantidade
    	}); 
    };**/

    /**$scope.removeItem = function (index) {
    	var deleteItem = confirm("Deseja realmente excluir o item?");
    	if (deleteItem) {
			$scope.itens.splice(index, 1);    		
    	};
    };**/
}