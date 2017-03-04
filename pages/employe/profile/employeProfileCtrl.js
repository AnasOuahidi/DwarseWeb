export let employeProfileCtrl = ['$scope', 'Upload', 'Factory', function($scope, Upload, Factory) {
    $('title').html('Profile')
    $('.datepicker').pickadate()

    $scope.sauvegarder = function (dataUrl, picName) {
        // Upload.upload({
        //     url: Factory.url(''),
        //     method: 'POST',
        //     data: {
        //         file: Upload.dataUrltoBlob(dataUrl, picName),
        //         test: $scope
        //     }
        // }).then(function(response) {
        //     console.log(response.data)
        // }, function(error) {
        //     console.log(error)
        // }, function(evt) {
        //     console.log(evt)
        // });
    }
}]
