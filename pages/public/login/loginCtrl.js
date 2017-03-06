export let loginCtrl = ['$scope', 'AuthService', '$state', '$http', 'USER_ROLES', 'Factory', function($scope, AuthService, $state, $http, USER_ROLES, Factory) {
    $('title').html('Login')
    $('body').addClass('bg')
    $scope.type = 'password'
    $scope.icone = 'fa-eye-slash'
    $scope.showPassword = function() {
        $scope.type = 'text'
        $scope.icone = 'fa-eye'
    }
    $scope.hidePassword = function() {
        $scope.type = 'password'
        $scope.icone = 'fa-eye-slash'
    }
    $('.form').find('input, textarea').on('keyup blur focus', function(e) {
        var $this = $(this),
            label = $this.prev('label')
        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight')
                label.removeClass('activePass highlight')
            } else {
                if ($this.attr('id') == 'password' || $this.attr('id') == 'password2') {
                    label.addClass('activePass highlight')
                } else {
                    label.addClass('active highlight')
                }
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight')
                label.removeClass('activePass highlight')
            } else {
                label.removeClass('highlight')
            }
        } else if (e.type === 'focus') {
            if ($this.val() === '') {
                label.removeClass('highlight')
            }
            else if ($this.val() !== '') {
                label.addClass('highlight')
            }
        }
    })
    $scope.authentifier = function() {
        $http.post(Factory.url("/auth/login"), $scope.auth, Factory.jsonHerders).then((response) => {
            if (response.data.authToken && response.data.authToken.value && response.data.role) {
                AuthService.login(response.data.authToken.value, response.data.role)
                if (response.data.employeur && response.data.employeur !== null) {
                    return $state.go('employeur.index', {}, {reload: true})
                }
                if (response.data.commercant && response.data.commercant !== null) {
                    return $state.go('commercant.index', {}, {reload: true})
                }
                if (response.data.employe && response.data.employe !== null && response.data.employe.nom && response.data.employe.nom !== null) {
                    return $state.go('employe.index', {}, {reload: true})
                }
                if (response.data.role == USER_ROLES.employeur) {
                    return $state.go('employeur.profile', {}, {reload: true})
                }
                if (response.data.role == USER_ROLES.commercant) {
                    return $state.go('commercant.profile', {}, {reload: true})
                }
                if (response.data.role == USER_ROLES.employe) {
                    return $state.go('employe.profile', {}, {reload: true})
                }
            } else {
                $scope.error = "Problème thechnique!"
                console.log(response)
            }
        }, (error) => {
            console.log(error)
            if (error.status == 400) {
                $scope.error = error.data.message
            }
        })
    }
    $scope.goInscription = function() {
        $state.go('inscription', {}, {reload: true})
    }
}]
