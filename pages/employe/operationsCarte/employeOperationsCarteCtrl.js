export let employeOperationsCarteCtrl = ['$scope', 'Factory', '$http', function($scope, Factory, $http) {
    $('title').html('operationsCarte')
    $scope.opposition = () => {
        window.swal({
            title: "Vous êtes sur de vouloir opposer votre carte?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Confirmer"
        }, function() {
            $http.get(Factory.url('/employe/operationCartes'), null, Factory.jsonHerders).then((response) => {

            }, (error) => {
                swal(
                    'Opposition effectuée avec succès!',
                    'Carte opposée.',
                    'success'
                )
                console.log(error)
            })
        })
    }
    $http.get(Factory.url('/employe/consultation/solde'), null, Factory.jsonHerders).then((response) => {
        let solde = response.data.solde
        console.log(solde)
    }, (error) => {
        if (error.status == 400) {
            $scope.error = ''
        }
    })
}]

