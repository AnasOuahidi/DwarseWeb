export let employeurProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', function($scope, Factory, Upload, $state) {
    $('title').html('Profile')
    $('body').removeClass('bg')

    $scope.sauvegarder = function(dataUrl, picName) {
        Upload.upload({
            url: Factory.url('/employeur/profile'),
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, picName),
                profile: $scope.profile
            }
        }).then(function(response) {
            console.log(response.data)
            $state.go('employeur.index')
        }, function(error) {
            console.log(error)
        });
    }
}]
