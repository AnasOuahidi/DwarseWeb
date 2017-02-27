export let appCtrl = ['$scope', '$state', '$uibModal', 'AuthService', 'Factory', 'AUTH_EVENTS', function($scope, $state, $uibModal, AuthService, Factory, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthorized, (event, args) => {
        $uibModal.open({
            animation: true,
            template: require('./../../modals/notAuthorized.html'),
            size: 'md'
        })
    })

    $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
        AuthService.logout()
        $uibModal.open({
            animation: true,
            template: require('./../../modals/notAuthenticated.html'),
            size: 'md'
        })
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

    $scope.validationLogin = (login) => {
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
}]
