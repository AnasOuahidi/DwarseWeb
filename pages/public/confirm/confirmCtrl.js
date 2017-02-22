export let confirmCtrl = ['$scope', '$state', '$stateParams', '$http', 'Factory', function($scope, $state, $stateParams, $http, Factory) {
    $('title').html('Confirmation du compte')
    $('body').addClass('bg')
    $scope.showLogo = true
    if ($(document).width() < 500) {
        $scope.showLogo = false
    }
    $scope.showLoader = true
    if (!$stateParams.token || $stateParams.token.length !== 64) {
        $scope.showLoader = false
        $scope.tokenError = true
    } else {
        $http.post(Factory.url('/auth/authtokens'), {token: $stateParams.token}, Factory.jsonHerdersWithoutToken).then(function(response) {
            $scope.showLoader = false
            $scope.withSuccess = true
            $scope.userLogin = response.data.login
        }, function(error) {
            $scope.showLoader = false
            if (error.status === 400) {
                $scope.messageError = error.data.message
                $scope.hasError = true
            }
            console.log(error)
        })
    }

    $scope.goInscription = function() {
        $state.go('inscription', {}, {reload: true})
    }

    $scope.goConnexion = function() {
        $state.go('login', {}, {reload: true})
    }
}]
