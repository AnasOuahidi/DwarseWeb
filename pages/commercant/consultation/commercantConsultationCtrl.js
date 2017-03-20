export let commercantConsultationCtrl = ['$scope', 'Factory', '$http', 'NgTableParams', function ($scope, Factory, $http, NgTableParams) {
	$('title').html('consultation')
	$scope.soldeAvenir = 0

	$http.get(Factory.url('/commercant/consultation/solde'), null, Factory.jsonHerders).then((response) => {
		$scope.solde = response.data.solde
	}, (error) => {
		if (error.status == 400) {
			$scope.error = ''
		}

	})
	$http.get(Factory.url('/commercant/consultation/historique'), null, Factory.jsonHerders).then(function (response) {
			$scope.tableauHistorique = []
			for (let i = 0; i < response.data.length; i++) {
				let dateTime = response.data[i].date
				let date = dateTime.substring(0, 10)
				let historique = {
					id: response.data[i].id,
					date: date,
					time: dateTime.substring(13, 21),
					nomEmp: response.data[i].carte.employe.nom,
					prenomEmp: response.data[i].carte.employe.prenom,
					libelleEmployeur: response.data[i].carte.employe.employeur.libelle,
					montant: response.data[i].montant,
					etatTransaction: response.data[i].avenir ? 'A venir' : 'Terminé',
					etat: response.data[i].avenir
				}
				$scope.tableauHistorique.push(historique)
				if ($scope.tableauHistorique[i].etat) {
					$scope.soldeAvenir += $scope.tableauHistorique[i].montant
				}
			}

			$scope.tableParams = new NgTableParams({sorting: {date: "desc"}}, {
				counts: [],
				dataset: $scope.tableauHistorique
			})
			$("table").next().addClass("text-center")
		}, function (error) {
			console.log(error)
		}
	)
}]

