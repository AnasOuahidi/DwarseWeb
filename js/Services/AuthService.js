export let AuthService = ['USER_ROLES', '$localStorage', 'Factory', function(USER_ROLES, $localStorage, Factory) {
    let token
    let role
    let isAuthenticated = false
    useCredentials()

    function useCredentials() {
        token = $localStorage.token
        role = $localStorage.role
        if (token && role) {
            isAuthenticated = true
        }
        Factory.token = token
    }

    let login = function(token, role) {
        $localStorage.token = token
        $localStorage.role = role
        useCredentials()
    }

    let logout = function() {
        token = undefined
        role = undefined
        isAuthenticated = false
        delete $localStorage.token
        delete $localStorage.role
        Factory.token = null
    }

    let isAuthorized = function(authorizedRoles) {
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1)
    }

    return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {
            return isAuthenticated
        },
        getRole: function() {
            return role
        }
    }
}]
