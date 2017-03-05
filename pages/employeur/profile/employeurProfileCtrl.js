export let employeurProfileCtrl = ['$scope', 'Factory', 'Upload', '$state', '$uibModal', function($scope, Factory, Upload, $state, $uibModal) {
    $('title').html('Profile')
    $('body').removeClass('bg')
    $scope.profile = {}

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, showError)
    } else {
        window.swal('Geolocation', 'Votre navigateur ne supporte pas la géolocalisation!', 'warning')
        setAutocomplete(45.75801, 4.8001016)
    }

    function getPosition(position) {
        $scope.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        setAutocomplete($scope.position.latitude, $scope.position.longitude)
    }

    function setAutocomplete(latitude, longitude) {
        let defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(latitude, longitude))
        let input = document.getElementById('adresse')
        let options = {
            bounds: defaultBounds,
            types: ['address']
        }
        new google.maps.places.Autocomplete(input, options)
    }

    function showError(error) {
        setAutocomplete(45.75801, 4.8001016)
        switch (error.code) {
            case error.PERMISSION_DENIED:
                window.swal('Geolocation', 'Votre avez refusé la permission!', 'error')
                break;
            case error.POSITION_UNAVAILABLE:
                window.swal('Geolocation', 'Votre position est introuvable!', 'error')
                break;
            case error.TIMEOUT:
                window.swal('Geolocation', 'Erreur interne!', 'error')
                break;
        }
    }

    $scope.showMap = function() {
        var mapModal = $uibModal.open({
            animation: true,
            template: `<div style="height: ${Math.trunc($(document).height() * 0.9)}px; width: ${Math.trunc($(document).width() * 0.9)}px; margin-left: -45%" id="map"></div>`,
            size: 'lg'
        })
        mapModal.rendered.then(function() {
            let lat, lon
            if ($scope.position) {
                lat = $scope.position.latitude
                lon = $scope.position.longitude
            } else {
                lat = 45.75801
                lon = 4.8001016
            }
            var myLatlng = new google.maps.LatLng(lat, lon);
            var myOptions = {
                zoom: 15,
                center: myLatlng
            }
            var map = new google.maps.Map(document.getElementById("map"), myOptions);
            var geocoder = new google.maps.Geocoder();

            google.maps.event.addListener(map, 'click', function(event) {
                geocoder.geocode({
                    'latLng': event.latLng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            let adresse = results[0].formatted_address
                            window.swal({
                                title: 'Vous êtes sûre?',
                                text: adresse,
                                type: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#464646',
                                confirmButtonText: 'Oui',
                                cancelButtonText: 'Non'
                            }, function () {
                                $scope.profile.adresse = results[0].formatted_address
                                return mapModal.close()
                            })
                        }
                    }
                })
            })
        })
    }

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
