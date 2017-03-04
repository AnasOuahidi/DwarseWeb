export let inscriptionCtrl = ['$scope', '$http', '$state', 'Factory', function($scope, $http, $state, Factory) {
    $('title').html('Inscription')
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
    $('.tab a').on('click', function(e) {
        e.preventDefault()
        $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
        var target = $(this).attr('href')
        $('.tab-content > div').not(target).hide()
        $(target).fadeIn(600)
    })
    $scope.goConnexion = function() {
        $state.go('login', {}, {reload: true})
    }
    $scope.inscription = function(form) {
        if (form.$name === 'inscFormCommercant') {
            $scope.inscr.role = 'ROLE_COMMERCANT'
        } else if (form.$name === 'inscFormEmployeur') {
            $scope.inscr.role = 'ROLE_EMPLOYEUR'
        }
        $http.post(Factory.url('/auth/users'), $scope.inscr, Factory.jsonHerders).then((response) => {
            window.swal("Bravo", "Votre compte a été crée, un mail vous a été envoyé pour le confirmer", "success")
            $state.go('login')
        }, (error) => {
            if (error.status == 400) {
                $scope.error = ''
                window._.forEach(error.data.children, function(value, key) {
                    if (value.errors) {
                        $scope.error += value.errors + ' - '
                    }
                })
                $scope.error = $scope.error.slice(0, -3);
            }
            console.log(error)
        })
    }
}]
