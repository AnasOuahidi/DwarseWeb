// export let commercantHistoriqueCtrl = ['$scope', 'Factory', '$http','NgTableParams' , function($scope, Factory, $http, NgTableParams) {
//     $('title').html('historique')
//
//     $http.get(Factory.url('/commercant/consultation/solde'), null, Factory.jsonHerders).then((response) => {
//         $scope.solde = response.data.solde
//     }, (error) => {
//         if (error.status == 400) {
//             $scope.error = ''
//         }
//
//     })
//     $http.get(Factory.url('/commercant/consultation/historique'), null, Factory.jsonHerders).then(function(response)
//         {
//             console.log(response.data)
//             $scope.tableauHistorique = []
//             for (let i = 0; i < response.data.length; i++) {
//                 let historique = {
//                     id: response.data[i].id,
//                     date: response.data[i].date,
//                     nomEmp: response.data[i].carte.employe.nom,
//                     prenomEmp: response.data[i].carte.employe.prenom,
//                     libelleCom: response.data[i].lecteur.commercant.libelle,
//                     montantCarte: response.data[i].carte.solde
//
//                 }
//                 $scope.tableauHistorique.push(historique)
//             }
//             $scope.tableParams = new NgTableParams({count: 20}, {counts: [], dataset: $scope.tableauHistorique})
//         }, function(error) {
//             console.log(error)
//         }
//     )
// }]
