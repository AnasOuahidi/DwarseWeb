export let loginCtrl = ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $('body').css('background', "url('http://www.lachamade.com/wp-content/uploads/2013/11/table-restaurant.jpg') no-repeat center center fixed")
    $('body').css('-webkit-background-size', 'cover')
    $('body').css('background-size', 'cover')
    $('nav').hide()
    $('title').html('Login page')
    $scope.login = (data) => {
        AuthService.login(data.username, data.password).then((data) => {
            console.log(data)
            $state.go('index', {}, {reload: true})
        }, function(err) {
            console.log(err)
        })
    }
}]
