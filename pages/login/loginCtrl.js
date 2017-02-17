export let loginCtrl = ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $('title').html('Login page')
    $('body').addClass('bg')
    $('nav').hide()
    $scope.ajuster = function(form) {
        if (!form.$valid) {
            setTimeout(function() {
                $('label').addClass('text-center')
            }, 0)
            if (form.$error.required && form.$error.required.length === 1) {
                $('.inner-container').height('36%')
            }
            if (form.$error.angularValidator && form.$error.angularValidator.length === 1) {
                $('.inner-container').height('41%')
            } else if (form.$error.angularValidator && form.$error.angularValidator.length === 2) {
                $('.inner-container').height('49%')
            }
            if (form.$error.angularValidator && form.$error.angularValidator.length === 2 && form.$error.required && form.$error.required.length === 1) {
                $('.inner-container').height('46%')
            }
            if (form.$error.required && form.$error.required.length === 2) {
                $('.inner-container').height('41%')
            }
            if (form.$error.angularValidator) {
                setTimeout(function() {
                    for (let i = 0; i < form.$error.angularValidator.length; i++) {
                        $('.' + form.$error.angularValidator[i].$name + ' label').css('margin-left', '14%')
                        $('.' + form.$error.angularValidator[i].$name + ' label').css('margin-right', '12%')
                    }
                }, 0)
            }
            if (form.$error.required) {
                setTimeout(function() {
                    for (let i = 0; i < form.$error.required.length; i++) {
                        $('.' + form.$error.required[i].$name + ' label').css('margin-left', '22%')
                        $('.' + form.$error.required[i].$name + ' label').css('margin-right', '22%')
                    }
                }, 0)
            }
        }
    }
    $scope.authentifier = function() {
        AuthService.login($scope.auth.login, $scope.auth.password).then((data) => {
            $state.go('index', {}, {reload: true})
        }, function(err) {
            if (err.status == 400) {
                $('.inner-container').height('36%')
                $scope.error = err.data.message
            }
            console.log(err)
        })
    }
}]
