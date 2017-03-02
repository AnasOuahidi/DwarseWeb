export let appCtrl = ['$scope', '$state', '$uibModal', 'AuthService', 'Factory', 'AUTH_EVENTS', function($scope, $state, $uibModal, AuthService, Factory, AUTH_EVENTS) {
    $scope.isMobile = false
    if ($(document).width() < 500) {
        $scope.isMobile = true
    }
    
    $scope.$on(AUTH_EVENTS.notAuthorized, (event) => {
        window.sweetAlert("Pas Autorisé !", "Vous n'avez pas le droit d'acceder à cette page !", "error")
    })

    $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
        AuthService.logout()
        window.sweetAlert("Session Perdu !", "Vous n'etes plus connecté !", "warning")
    })

    $scope.logout = () => {
        AuthService.logout()
        $state.go('login', {}, {reload: true})
    }

    $scope.validateAlphanumerique = (text) => {
        let textString = text + ''
        let str = textString.replace(/\s+/g, '')
        return window.validator.isAlphanumeric(str)
    }

    $scope.validationEmail = (text) => {
        let textString = text + ''
        let filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        return filter.test(textString)
    }

    $scope.validationLogin = (login) => {   //  ===  validationLogin = function(login) {}
        if (login && $scope.validationEmail(login)) {
            return true
        }
        if (!login || !$scope.validateAlphanumerique(login) || login.length <= 5) {
            return false
        } else {
            return true
        }
    }

    $scope.validationPassword = (password) => {
        if (!password || !$scope.validateAlphanumerique(password) || password.length <= 5) {
            return false
        } else {
            return true
        }
    }

    $scope.validationTelephone = (telephone) => {
        let filtre1 = /^[0-9]{14}$/
        let filtre2 = /^[0-9]{10}$/
        if (!telephone || !filter1.test(telephone) || !filter2.test(telephone)) {
            return false
        }
        else {
            return true
        }
    }

    $scope.validationSiret = (siret) =>{
        let filter = /^[0-9]{14}$/
        if (!siret || !filter.test(siret)) {
            return false
        }else
            return true
    }
}]
