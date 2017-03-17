export let employeConsultationCtrl = ['$scope', '$http', 'Factory', 'NgTableParams',function($scope , $http , Factory, NgTableParams) {
    $('title').html('consultation')


    $http.get(Factory.url('/employe/consultation/historique'), null, Factory.jsonHerders).then(function(response) {
        let transactions = response.data
        $scope.listeTransactions = []

        for (let i = 0; i < transactions.length; i++) {
        	$scope.active = !transactions[i].carte.opposed
        	let dateTime = transactions[i].date
            let transaction = {
				prenom : transactions[i].carte.employe.prenom,
				nom : transactions[i].carte.employe.nom,
				date : dateTime.substring(0,10),
				time : dateTime.substring(13,21),
				restaurant : transactions[i].lecteur.commercant.libelle,
				montant : transactions[i].montant,
            }
          $scope.listeTransactions.push(transaction)
        }
        $scope.tableParams = new NgTableParams({count:5}, {
            counts: [],
            dataset: $scope.listeTransactions
        })
    }, function(error) {
        console.log(error);
    })

    $http.get(Factory.url('/employe/consultation/solde'), null, Factory.jsonHerders).then(function(response) {
        $scope.solde = response.data.solde
    }, function(error) {
        console.log(error);
    })

        $scope.opposer = function() {
        swal({
                title: 'Etes vous sur?',
                text: "Attention, cette Action est irréversible!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'Oui, opposez la carte',
                cancelButtonText: "Non, Annuler!",
                closeOnConfirm: false,
                closeOnCancel: true,
            },
            function(isConfirm) {
                if (isConfirm) {
                    $http.post(Factory.url('/employe/opposition'), null, Factory.jsonHerders).then(function(response){
                    	$scope.active = false;
                        swal(
                            'Opposée!',
                            'Votre carte est Opposée',
                            'success');

                    }, function(error) {
                        console.log(error)
                    })
                }
            }
        )}



}]