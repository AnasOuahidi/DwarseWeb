export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider

// Rotes Employeur

        .state('employeur.index', {
            cache: false,
            url: '/',
            template: require('./../../pages/employeur/index/index.html'),
            controller: 'employeurIndexCtrl'
        })
        .state('employeur', {
            cache: false,
            abstract: true,
            url: '/employeur',
            template: require('./../../pages/employeur/employeur.html'),
            data: {
                authorizedRoles: [USER_ROLES.employeur]
            }
        })
        .state('employeur.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/employeur/profile/profile.html'),
            controller: 'employeurProfileCtrl'
        })
        .state('employeur.employe', {
            cache: false,
            url: '/employe',
            template: require('./../../pages/employeur/employe/employe.html'),
            controller: 'employeurEmployeCtrl'
        })

// Routes commercant

        .state('commercant.index', {
            cache: false,
            url: '/',
            template: require('./../../pages/commercant/index/index.html'),
            controller: 'commercantIndexCtrl'
        })
        .state('commercant', {
            cache: false,
            abstract: true,
            url: '/commercant',
            template: require('./../../pages/commercant/commercant.html'),
            data: {
                authorizedRoles: [USER_ROLES.commercant]
            }
        })
        .state('commercant.consultation', {
            cache: false,
            url: '/consultation',
            template: require('./../../pages/commercant/consultation/consultation.html'),
            controller: 'commercantConsultationCtrl'
        })
        .state('commercant.historique', {
            cache: false,
            url: '/historique',
            template: require('./../../pages/commercant/historique/historique.html'),
            controller: 'commercantHistoriqueCtrl'
        })

        .state('commercant.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/commercant/profile/profile.html'),
            controller: 'commercantProfileCtrl'
        })

//Routes employe 
       
        .state('employe.consultation', {
            cache: false,
            url: '/consultation',
            template: require('./../../pages/employe/consultation/consultation.html'),
            controller: 'employeConsultationCtrl'
        })
        .state('employe.index', {
            cache: false,
            url: '/',
            template: require('./../../pages/employe/index/index.html'),
            controller: 'employeIndexCtrl'
        })
        .state('employe', {
            cache: false,
            abstract: true,
            url: '/employe',
            template: require('./../../pages/employe/employe.html'),
            data: {
                authorizedRoles: [USER_ROLES.employe]
            }
        })
        .state('employe.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/employe/profile/profile.html'),
            controller: 'employeProfileCtrl'
        })

// Publique

        .state('inscription', {
            cache: false,
            url: '/inscription',
            template: require('./../../pages/public/inscription/inscription.html'),
            controller: 'inscriptionCtrl'
        })
        .state('confirm', {
            cache: false,
            url: '/confirm/:token',
            template: require('./../../pages/public/confirm/confirm.html'),
            controller: 'confirmCtrl'
        })
        .state('login', {
            cache: false,
            url: '/login',
            template: require('./../../pages/public/login/login.html'),
            controller: 'loginCtrl'
        })
    $urlRouterProvider.otherwise(($injector, $location) => {
        let state = $injector.get('$state')
        let auth = $injector.get('AuthService')
        let USER_ROLES = $injector.get('USER_ROLES')
        if (auth.isAuthenticated()) {
            if (auth.getRole() === USER_ROLES.employe) {
                return state.go('employe.index')
            }
            if (auth.getRole() === USER_ROLES.employeur) {
                return state.go('employeur.index')
            }
            if (auth.getRole() === USER_ROLES.commercant) {
                return state.go('commercant.index')
            }
        } else {
            state.go('login')
        }
    })
}]
