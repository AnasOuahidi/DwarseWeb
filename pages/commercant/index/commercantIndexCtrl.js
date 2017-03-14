export let commercantIndexCtrl = ['$scope', function($scope) {
    $('title').html('Accueil')
    $('body').removeClass('bg')
    $('.carousel').carousel({
      interval: 2000
    })
}]
