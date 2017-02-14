export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('login', {
            cache: false,
            url: '/login',
            template: require('./../../pages/login/login.html'),
            controller: 'loginCtrl'
        })
        .state('index', {
            cache: false,
            url: '/',
            template: require('./../../pages/index/index.html'),
            controller: 'indexCtrl'
            // data: {
            //     authorizedRoles: [USER_ROLES.employeur, USER_ROLES.employe, USER_ROLES.commercant]
            // }
        })
    $urlRouterProvider.otherwise(($injector, $location) => {
        let state = $injector.get('$state')
        let auth = $injector.get('AuthService')
        let USER_ROLES = $injector.get('USER_ROLES')
        if (auth.isAuthenticated()) {
            if (auth.getRole() === USER_ROLES.employe) {
                return state.go('index')
            }
            if (auth.getRole() === USER_ROLES.employeur) {
                return state.go('index')
            }
            if (auth.getRole() === USER_ROLES.commercant) {
                return state.go('index')
            }
        } else {
            state.go('login')
        }
    })
}]
