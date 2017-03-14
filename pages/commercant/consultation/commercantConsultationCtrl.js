export let commercantConsultationCtrl = ['$scope', 'Factory', '$http','NgTableParams' , function($scope, Factory, $http, NgTableParams) {
    $('title').html('consultation')

    $http.get(Factory.url('/commercant/consultation/solde'), null, Factory.jsonHerders).then((response) => {
        $scope.solde = response.data.solde
    }, (error) => {
        if (error.status == 400) {
            $scope.error = ''
        }

    })
    $http.get(Factory.url('/commercant/consultation/historique'), null, Factory.jsonHerders).then(function(response)
        {
            console.log(response.data)
            $scope.tableauHistorique = []
            for (let i = 0; i < response.data.length; i++) {
                let dateTime = response.data[i].date
                let historique = {
                    id: response.data[i].id,
                    date : dateTime.substring(0,10),
                    time : dateTime.substring(13,21),
                    nomEmp: response.data[i].carte.employe.nom,
                    prenomEmp: response.data[i].carte.employe.prenom,
                    libelleEmployeur : response.data[i].carte.employe.employeur.libelle,
                    montant : response.data[i].montant

                }
                $scope.tableauHistorique.push(historique)
            }
            $scope.tableParams = new NgTableParams({count: 20}, {counts: [], dataset: $scope.tableauHistorique})
        }, function(error) {
            console.log(error)
        }
    )
}]

