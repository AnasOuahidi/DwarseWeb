require('./Libraries/imports')

import {employeProfileCtrl} from '../pages/employe/profile/employeProfileCtrl'
import {commercantIndexCtrl} from '../pages/commercant/index/commercantIndexCtrl'
import {employeurIndexCtrl} from '../pages/employeur/index/employeurIndexCtrl'
import {employeIndexCtrl} from '../pages/employe/index/employeIndexCtrl'
import {loginCtrl} from '../pages/public/login/loginCtrl'
import {confirmCtrl} from '../pages/public/confirm/confirmCtrl'
import {inscriptionCtrl} from '../pages/public/inscription/inscriptionCtrl'
import {appCtrl} from './Controller/appCtrl'
import {ucfirst} from './Filters/ucfirst'
import {Factory} from './Services/Factory'
import {Interceptor} from './Services/Interceptor'
import {AuthInterceptor} from './Services/AuthInterceptor'
import {AuthService} from './Services/AuthService'
import {AUTH_EVENTS, USER_ROLES} from './Configuration/Constants'
import {authListener} from './Configuration/AuthListener'
import {router} from './Configuration/Router'

window.angular.module('dwarse', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngStorage',
    'angularValidator',
    'ngTouch',
    'ngFileUpload',
    'ngImgCrop'
])
    .config(router)
    .run(authListener)
    .constant('AUTH_EVENTS', AUTH_EVENTS)
    .constant('USER_ROLES', USER_ROLES)
    .service('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor)
    .config(['$httpProvider', Interceptor])
    .factory('Factory', Factory)
    .filter('ucfirst', ucfirst)
    .controller('appCtrl', appCtrl)
    .controller('inscriptionCtrl', inscriptionCtrl)
    .controller('confirmCtrl', confirmCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('employeIndexCtrl', employeIndexCtrl)
    .controller('employeurIndexCtrl', employeurIndexCtrl)
    .controller('commercantIndexCtrl', commercantIndexCtrl)
    .controller('employeProfileCtrl', employeProfileCtrl)
