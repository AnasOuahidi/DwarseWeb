export let employeProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', function($scope, Factory, Upload, $state) {
    $('title').html('Profile')
    $('.datepicker').pickadate()
    $('body').removeClass('bg')

    $scope.sauvegarder = function(dataUrl, picName) {
        Upload.upload({
            url: Factory.url('/employe/profile'),
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, picName),
                profile: $scope.profile
            }
        }).then(function(response) {
            console.log(response.data)
            $state.go('employe.index')
        }, function(error) {
            console.log(error)
        });
    }
}]
