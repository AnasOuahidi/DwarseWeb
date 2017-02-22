const path = require('path')
const fse = require('fs-extra')
const fs = require('fs')
const mkdirp = require('mkdirp')
const readlineSync = require('readline-sync')
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.contains = function(element) {
    return this.indexOf(element) > -1
}
let generatePages = (name, role, url, chemin) => {
    let ctrlName
    let routeJsFileContentArray
    let htmlFileName = chemin + '/' + name + '.html'
    if (role) {
        ctrlName = role + name.capitalizeFirstLetter() + 'Ctrl'
        routeJsFileContentArray = [
            `        .state('${role}.${name}', {`,
            `            cache: false,`,
            `            url: '${url}',`,
            `            template: require('./../.${htmlFileName}'),`,
            `            controller: '${ctrlName}',`,
            `            data: {`,
            `                authorizedRoles: [USER_ROLES.${role}]`,
            `            }`,
            `        })`
        ]
    } else {
        ctrlName = name + 'Ctrl'
        routeJsFileContentArray = [
            `        .state('${name}', {`,
            `            cache: false,`,
            `            url: '${url}',`,
            `            template: require('./../.${htmlFileName}'),`,
            `            controller: '${ctrlName}'`,
            `        })`
        ]
    }
    let ctrlFile = ctrlName + '.js'
    let htmlFileContent = '<h1>' + name + ' is created!</h1>'
    let jsFileName = chemin + '/' + ctrlFile
    let jsFileContent = `export let ${ctrlName} = ['$scope', function($scope) {\n` +
        `    $('title').html('${name}')\n` +
        `}]\n`
    let appJsFileImport = `import {${ctrlName}} from '.${chemin}/${ctrlName}'`
    let appJsFileCtrl = `    .controller('${ctrlName}', ${ctrlName})`
    mkdirp(chemin, (err) => {
        if (err) return console.log(err)
        fse.writeFile(htmlFileName, htmlFileContent, (err) => {
            if (err) return console.log(err)
            console.log(htmlFileName + ' a bien été généré!')
        })
        fse.writeFile(jsFileName, jsFileContent, (err) => {
            if (err) return console.log(err)
            console.log(jsFileName + ' a bien été généré!')
        })
        let appFile = fse.readFileSync('./js/app.js').toString().split('\n')
        appFile.splice(2, 0, appJsFileImport)
        appFile.splice(appFile.length - 1, 0, appJsFileCtrl)
        let text = appFile.join('\n')
        fs.writeFile('./js/app.js', text, (err) => {
            if (err) return console.log(err)
            console.log('app.js a bien été configuré!')
        })
        let RouteJsFile = fse.readFileSync('./js/Configuration/Router.js').toString().split('\n')
        RouteJsFile.splice.apply(RouteJsFile, [2, 0].concat(routeJsFileContentArray))
        let textRouteJsFile = RouteJsFile.join('\n')
        fs.writeFile('./js/Configuration/Router.js', textRouteJsFile, (err) => {
            if (err) return console.log(err)
            console.log('Router.js a bien été configuré!')
        })
    })
}
let demanderUrl = (name, role) => {
    if (role) {
        let chemin = './pages/' + role + '/' + name
        let url = readlineSync.question('Quelle est l\'url de la page? (par defaut: /' + role + '/' + name + ') \n')
        url = !url ? '/' + name : url
        if (url.substring(0, 1) != '/') {
            console.log('L\'url doit commencer par: /')
            demanderUrl(name, role)
        } else {
            generatePages(name, role, url, chemin)
        }
    } else {
        let chemin = './pages/public/' + name
        let url = readlineSync.question('Quelle est l\'url de la page? (par defaut: /' + name + ') \n')
        url = !url ? '/' + name : url
        if (url.substring(0, 1) != '/') {
            console.log('L\'url doit commencer par: /')
            demanderUrl(name, role)
        } else {
            generatePages(name, role, url, chemin)
        }
    }
}
let demanderNom = () => {
    let name = readlineSync.question('Quel est le nom de la page ? \n')
    if (!name) {
        console.log(`Le nom de la page est obligatoire!`)
        demanderNom()
    } else {
        let isProtected = readlineSync.keyInYN('Cette page est elle protégée ? \n')
        if (isProtected) {
            let roles = ['Employé', 'Employeur', 'Commerçant'],
                index = readlineSync.keyInSelect(roles, 'Qui a accès à cette page ? \n')
            if (index == -1) {
                return
            }
            let role
            if (index == 0) {
                role = 'employe'
            } else if (index == 1) {
                role = 'employeur'
            } else if (index == 2) {
                role = 'commercant'
            }
            if (getDirectories('./pages/' + role).contains(name)) {
                console.log(`Le nom: ${name} existe déjà!`)
                demanderNom()
            } else {
                demanderUrl(name, role)
            }
        } else {
            if (getDirectories('./pages/public').contains(name)) {
                console.log(`Le nom: ${name} existe déjà!`)
                demanderNom()
            } else {
                let role = false
                demanderUrl(name, role)
            }
        }
    }
}
demanderNom()