export let loginCtrl = ['$scope', 'AuthService', '$state', 'USER_ROLES', function($scope, AuthService, $state, USER_ROLES) {
    $('title').html('Login')
    $('body').addClass('bg')
    $scope.showLogo = true
    if ($(document).width() < 500) {
        $scope.showLogo = false
    }
    $scope.type = 'password'
    $scope.icone = 'fa-eye'
    $scope.showPassword = function() {
        $scope.type = 'text'
        $scope.icone = 'fa-eye-slash'
    }
    $scope.hidePassword = function() {
        $scope.type = 'password'
        $scope.icone = 'fa-eye'
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
        AuthService.login($scope.auth.login, $scope.auth.password).then((data) => {
            console.log(data)
            // check if it's the first time
            if (data.role == USER_ROLES.employe) {
                return $state.go('employe.index', {}, {reload: true})
            }
            if (data.role == USER_ROLES.employeur) {
                return $state.go('employeur.index', {}, {reload: true})
            }
            if (data.role == USER_ROLES.commercant) {
                return $state.go('commercant.index', {}, {reload: true})
            }
        }, function(err) {
            if (err.status == 400) {
                $scope.error = err.data.message
            }
            console.log(err)
        })
    }
    $scope.goInscription = function() {
        $state.go('inscription', {}, {reload: true})
    }
}]
