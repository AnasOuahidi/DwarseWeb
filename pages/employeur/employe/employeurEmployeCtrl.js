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
        $scope.listeEmployes = []
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
          $scope.listeEmployes.push(employe)
        }
        $scope.tableParams = new NgTableParams({sorting: { categorie: "desc" }}, {
            counts: [],
            dataset: $scope.listeEmployes
        })
      $('table').next().addClass('text-center')
    }, function(error) {
        console.log(error);
    })
    $scope.addEmploye = function() {
        let ajoutEmployeModal = $uibModal.open({
            animation: true,
            template: require('./../ajoutEmployeModal.html'),
            scope: $scope,
            controller: ['$scope', '$http', 'Factory', function($scope, $http, Factory) {
                $scope.valider = function() {
                    ajoutEmployeModal.close()
                    $http.post(Factory.url('/employeur/employe'), $scope.newEmploye, Factory.jsonHerders).then(function(response) {
                      let employe = {
                        id: response.data.employe.id,
                        photo: 'https://s3.amazonaws.com/dwarse/assets/img/user.png',
                        nom: '-',
                        prenom: '-',
                        email: response.data.email,
                        age: '-',
                        telephone: '-',
                        categorie: response.data.employe.carte.categorie.libelle,
                        etat: 'Activée',
                        etatIcon: false
                      }
                      $scope.listeEmployes.push(employe)
                      $scope.tableParams.reload()
                      $scope.tableParams.total($scope.listeEmployes.length)
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
                      for (let i = 0; i < $scope.tableParams.data.length; i++) {
                        if ($scope.tableParams.data[i].id == id) {
                          $scope.tableParams.data[i].etat = 'Opposée'
                          $scope.tableParams.data[i].etatIcon = true
                        }
                      }
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

