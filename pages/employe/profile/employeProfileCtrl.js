export let employeProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', function($scope, Factory, Upload, $state) {
    $('title').html('Profile')
    $('body').removeClass('bg')
    let $input = $('.datepicker').pickadate({
        selectYears: true,
        selectMonths: true,
        min: new Date(1960, 0, 1),
        format: 'Le d mmmm yyyy',
        formatSubmit: 'yyyy-mm-dd'
    })
    var datearray = window.moment().format('DD/MM/YYYY').split('/')
    var day = datearray[0]
    var month = datearray[1] - 1
    var picker = $input.pickadate('picker')
    picker.set('select', new Date(1990, month, day))
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
    $scope.sauvegarder = function(dataUrl, picName) {
        $scope.profil = window._.clone($scope.profile)
        delete $scope.profil.dateNaissance
        $scope.profil.dateNaissance = $("input[name='dateNaissance_submit']").val()
        Upload.upload({
            url: Factory.url('/employe/profile'),
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, picName),
                profile: $scope.profil
            }
        }).then(function(response) {
            console.log(response.data)
            $state.go('employe.index')
        }, function(error) {
            console.log(error)
        })
    }
}]
