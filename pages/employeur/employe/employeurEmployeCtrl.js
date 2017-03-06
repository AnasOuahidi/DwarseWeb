export let employeurEmployeCtrl = ['$scope', 'NgTableParams', '$http', 'Factory', '$uibModal', function($scope, NgTableParams, $http, Factory, $uibModal) {
    $('title').html('employe')

    $http.get(Factory.url('/employeur/employe'), null, Factory.jsonHerders).then(function(response) {
        $scope.tableauEmployes = []
        for (let i = 0; i < response.data.length; i++) {
            let date = response.data[i].employe.dateNaissance.substring(0, 10)
            let dateArray = date.split('/')
            let day = parseInt(dateArray[0])
            let month = parseInt(dateArray[1])
            let year = parseInt(dateArray[2])
            let momentDate = window.moment()
            momentDate.set('year', year)
            momentDate.set('month', month - 1)
            momentDate.set('date', day)
            let age = window.moment().diff(momentDate, 'years')
            let employe = {
                id: response.data[i].employe.id,
                email: response.data[i].email,
                nom: response.data[i].employe.nom,
                prenom: response.data[i].employe.prenom,
                age: age,
                numTel: response.data[i].employe.numTel,
                categorie: "",
                opoosed: "",
                photo: response.data[i].employe.photo
            }
            $scope.tableauEmployes.push(employe)
        }
        $scope.tableParams = new NgTableParams({count: 20}, {counts: [], dataset: $scope.tableauEmployes})
    }, function(error) {
        console.log(error)
    })

    $scope.opposer = function(id) {
        console.log(id)
    }

    $scope.addEmploye = function() {
        let ajoutEmployeModal = $uibModal.open({
            animation: true,
            template: require('./../ajoutEmployeModal.html'),
            size: 'md',
            scope: $scope,
            controller: ['$scope', '$http', 'Factory', function($scope, $http, Factory) {
                $scope.sauvegarder = function() {
                    ajoutEmployeModal.close()
                    $http.post(Factory.url('/employeur/employe'), $scope.newEmploye,  Factory.jsonHerders).then(function(response) {
                        console.log(response.data)

                    }, function(error) {
                        console.log(error)
                    })
                }
            }]
        })
    }
}]
