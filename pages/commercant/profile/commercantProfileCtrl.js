export let commercantProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', function($scope, Factory, Upload, $state) {
    $('title').html('profile')
    $('body').removeClass('bg')

    $scope.sauvegarder = function(dataUrl, picName) {
        Upload.upload({
            url: Factory.url('/commercant/profile'),
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, picName),
                profile: $scope.profile
            }
        }).then(function(response) {
            console.log(response.data)
            $state.go('commercant.index')
        }, function(error) {
            console.log(error)
        });
    }
}]
