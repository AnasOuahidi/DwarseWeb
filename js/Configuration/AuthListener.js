export let authListener = ['$rootScope', '$state', 'Factory', 'AuthService', 'AUTH_EVENTS', function($rootScope, $state, Factory, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState, fromParams) => {
        if (!AuthService.isAuthenticated()) {
            if ('data' in next && 'authorizedRoles' in next.data) {
                event.preventDefault()
                $state.go('login')
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated)
                return;
            }
        }
        if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault()
                $state.go(fromState.name)
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized)
                return;
            }
        }
    })
}]
