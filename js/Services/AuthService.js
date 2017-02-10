export let AuthService = ['$q', '$http', 'USER_ROLES', '$localStorage', 'Factory', function($q, $http, USER_ROLES, $localStorage, Factory) {
    let token
    let role
    let isAuthenticated = false
    useCredentials()

    function storeUserCredentials(token, role) {
        $localStorage.token = token
        $localStorage.role = role
        useCredentials()
    }

    function useCredentials() {
        token = $localStorage.token
        role = $localStorage.role
        if (token && role) {
            isAuthenticated = true
        }
        // Factory.token = token
        // Factory.role = role
        // Set the token as header for your requests!
        // $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
        token = undefined
        role = undefined
        isAuthenticated = false
        // $http.defaults.headers.common['X-Auth-Token'] = undefined
        delete $localStorage.token
        delete $localStorage.role
        // Factory.token = null
        // Factory.role = null
    }

    let login = function(login, password) {
        return $q(function(resolve, reject) {
            $http.post("http://localhost:8000/auth/authtokens", {login: login, password: password}).then((response) => {
                console.log(response)
                // if (response.data.token && response.data.role) {
                //     storeUserCredentials(response.data.token, response.data.role)
                // } else {
                //     reject(response)
                // }
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }

    let logout = function() {
        destroyUserCredentials()
    }

    let isAuthorized = function(authorizedRoles) {
        if (!window.angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles]
        }
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
