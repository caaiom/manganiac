function MangaController($scope, $http) {
    
    $scope.listEditions = function () {
        $http.get('http://localhost:1337/getAllItens').success(function (retorno) {
            $scope.itens = retorno.mangas;
        });
    };

    $scope.insertEdition = function() {
        $scope.editions.push({
            title: $scope.edition.title,
            author: $scope.edition.author,
            currentVolume: $scope.edition.currentVolume,
            lastVolumePurchased: $scope.edition.lastVolumePurchased,
            rate: $scope.edition.rate,
            publisher: $scope.edition.publisher,
            buyImportance: $scope.edition.buyImportance,
            price: $scope.edition.price,
            finished: $scope.edition.finished,
            linkToDescription: $scope.edition.linkToDescription
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