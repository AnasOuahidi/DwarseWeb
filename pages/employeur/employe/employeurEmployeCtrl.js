export let employeurEmployeCtrl = ['$scope', 'NgTableParams', '$http', 'Factory', '$uibModal', function($scope, NgTableParams, $http, Factory, $uibModal) {
    $('title').html('employes')
    let calculerAge = (datenaissance) => {
        var jr = datenaissance.substring(2)
        var mois = datenaissance.substring(3, 5)
        var an = datenaissance.substring(6, 10)
        var date = window.moment()
        date.set('year', an)
        date.set('month', mois - 1)
        date.set('day', jr)
        var age = window.moment().diff(date, 'years')
        return age
    }
    $http.get(Factory.url('/employeur/employe'), null, Factory.jsonHerders).then(function(response) {
        let employes = response.data
        let listeEmployes = []
        for (let i = 0; i < employes.length; i++) {
            let datenaissance = employes[i].employe.dateNaissance
            let employe = {
                id: employes[i].employe.id,
                photo: employes[i].employe.photo ? employes[i].employe.photo : 'https://s3.amazonaws.com/dwarse/assets/img/user.png',
                nom: employes[i].employe.nom ? employes[i].employe.nom : '-',
                prenom: employes[i].employe.prenom ? employes[i].employe.prenom : '-',
                email: employes[i].email ? employes[i].email : '-',
                age: employes[i].employe.dateNaissance ? calculerAge(datenaissance) : '-',
                telephone: employes[i].employe.numTel ? employes[i].employe.numTel : '-',
                categorie: employes[i].employe.carte.categorie.libelle ? employes[i].employe.carte.categorie.libelle : '-',
                etat: employes[i].employe.carte.opposed ? 'Opposée' : 'Activée',
                etatIcon: employes[i].employe.carte.opposed
            }
            listeEmployes.push(employe)
        }
        $scope.tableParams = new NgTableParams({count:10}, {
            counts: [],
            dataset: listeEmployes
        })
    }, function(error) {
        console.log(error);
    });


    $scope.addEmploye = function() {
        let ajoutEmployeModal = $uibModal.open({
            animation: true,
            template: require('./../ajoutEmployeModal.html'),
            scope: $scope,
            controller: ['$scope', '$http', 'Factory', function($scope, $http, Factory) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
                $scope.valider = function() {
                    ajoutEmployeModal.close()
                    $http.post(Factory.url('/employeur/employe'), $scope.newEmploye, Factory.jsonHerders).then(function(response) {
                    }, function(error) {
                        console.log(error)
                    })
                }
                $scope.cancel = function() {
                    ajoutEmployeModal.close();
                }
            }]
        })
    };

    $scope.opposer = function(id) {
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
                    $http.post(Factory.url('/employeur/opposition'), {id: id}, Factory.jsonHerders).then(function(response){
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

