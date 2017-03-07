export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('employe.operationsCarte', {
            cache: false,
            url: '/operationsCarte',
            template: require('./../../pages/employe/operationsCarte/operationsCarte.html'),
            controller: 'employeOperationsCarteCtrl'
        })
        .state('employeur.employe', {
            cache: false,
            url: '/employe',
            template: require('./../../pages/employeur/employe/employe.html'),
            controller: 'employeurEmployeCtrl'
        })
        .state('commercant.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/commercant/profile/profile.html'),
            controller: 'commercantProfileCtrl'
        })
        .state('employeur.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/employeur/profile/profile.html'),
            controller: 'employeurProfileCtrl'
        })
        .state('employe.profile', {
            cache: false,
            url: '/profile',
            template: require('./../../pages/employe/profile/profile.html'),
            controller: 'employeProfileCtrl'
        })
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
