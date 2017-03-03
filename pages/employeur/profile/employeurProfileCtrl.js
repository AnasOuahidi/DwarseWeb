export let employeurProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', function($scope, Factory, Upload, $state) {
    $('title').html('Profile')
    $('body').removeClass('bg')

    $scope.sauvegarder = function(dataUrl, picName) {
        Upload.upload({
            url: Factory.url('/employeur/profile?token=' + Factory.token),
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, picName),
                profile: $scope.profile
            }
            // ,
            // headers: {
            //     'X-Auth-Token': Factory.token,
            //     'Content-Type': $scope.picFile.type,
            //     'Accept': 'application/json'
            // }
        }).then(function(response) {
            $state.go('employeur.index')
            console.log(response.data)
        }, function(error) {
            $state.go('employeur.index')
            console.log(error)
        });
    }
}]
