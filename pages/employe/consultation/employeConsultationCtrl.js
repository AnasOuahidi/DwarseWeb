export let employeConsultationCtrl = ['$scope', '$http', 'Factory', 'NgTableParams', '$uibModal',function($scope , $http , Factory, NgTableParams, $uibModal) {
    $('title').html('Consultation')


    $http.get(Factory.url('/employe/consultation/historique'), null, Factory.jsonHerders).then(function(response) {
        let transactions = response.data
        $scope.listeTransactions = []

        for (let i = 0; i < transactions.length; i++) {
            let dateTime = transactions[i].date
            let transaction = {
                id: transactions[i].id,
                idEmpl: transactions[i].carte.employe.id,
				prenom : transactions[i].carte.employe.prenom,
				nom : transactions[i].carte.employe.nom,
				date : dateTime.substring(0,10),
				time : dateTime.substring(13,21),
				restaurant : transactions[i].lecteur.commercant.libelle,
				montant : transactions[i].montant,
            }
          $scope.listeTransactions.push(transaction)
        }
        $scope.tableParams = new NgTableParams({sorting: { date: "desc" }}, {
            counts: [],
            dataset: $scope.listeTransactions
        })
        $("table").next().addClass( "text-center" )
    }, function(error) {
        console.log(error);
    })
    
    $http.get(Factory.url('/employe/consultation/solde'), null, Factory.jsonHerders).then(function(response) {
        $scope.solde = response.data.solde
        $scope.active = !response.data.etat
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

    $scope.consultationFacture = function(id) {
        let trans =window._.find($scope.listeTransactions, {id:id})
        $scope.url = 'https://s3.amazonaws.com/dwarse/pdfs/employes/' + trans.idEmpl + '/' + trans.id + '.pdf'
        $scope.height = $(window).height()
        $uibModal.open({
            animation: true,
            template: require('./../consultationFactureModal.html'),
            scope: $scope
        })
    }
}]
