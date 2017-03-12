export let employeurEmployesCtrl = ['$scope', 'NgTableParams', '$http', 'Factory', '$uibModal', function($scope, NgTableParams, $http, factory, $uibModal) {
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
    $http.get(factory.url('/employeur/employe'), null, factory.jsonHerders).then(function(response) {
        let employes = response.data
        let listeEmployes = []
        for (let i = 0; i < employes.length; i++) {
            let datenaissance = employes[i].employe.dateNaissance
            let employe = {
                id: employes[i].employe.id,
                photo: employes[i].employe.photo ? employes[i].employe.photo : '-',
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
        $scope.tableParams = new NgTableParams({count: 2}, {
            counts: [],
            dataset: listeEmployes
        })
    }, function(error) {
        console.log(error);
    });
    // $(window).resize();
    // $(document).ready(function() {
    //     console.log($("table").next().addClass("text-center"))
    // });
    $scope.enployesAdd = function() {
        let ajoutEmployeModal = $uibModal.open({
            animation: true,
            template : require('./../employeesAdd.html'),
            controller: ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
                $scope.valider = function() {
                    ajoutEmployeModal.close()
                    $http.post(factory.url('/employeur/ajoutEmployeModals'), $scope.newEmploye, factory.jsonHerders).then(function(response) {
                    }, function(error) {
                        console.log(error)
                    })
                }
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                }
            }]
        })
    };
}]

