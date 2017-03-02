export let employeProfileCtrl = ['$scope', 'Upload', function($scope, Upload) {
    $('title').html('Profile')
    $('.datepicker').pickadate()

    $scope.sauvegarder = function (dataUrl, picName) {
        console.log(Upload.dataUrltoBlob(dataUrl, picName))
        // Upload.upload({
        //     url: Factory.url('/'),
        //     method: 'POST',
        //     data: {
        //         file: Upload.dataUrltoBlob(dataUrl, picName),
        //         etudiant: $scope
        //     },
        // }).then(function(response) {
        // }, function(response) {
        // }, function(evt) {
        // });
    }
}]
