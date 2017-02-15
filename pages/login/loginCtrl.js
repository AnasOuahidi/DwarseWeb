export let loginCtrl = ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $('title').html('Login page')
    $('body').addClass('bg')
    $('nav').hide()
    $scope.auth = {
        login: "",
        password: ""
    }
    $scope.authentifier = function() {
        AuthService.login($scope.auth.login, $scope.auth.password).then((data) => {
            $state.go('index', {}, {reload: true})
        }, function(err) {
            if (err.status == 400) {
                $scope.error = err.data.message
            }
            console.log(err)
        })
    }
}]
