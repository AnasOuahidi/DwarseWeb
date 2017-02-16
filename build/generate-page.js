const fss = require('fs')
const path = require('path')
const fs = require('fs-extra')
const mkdirp = require('mkdirp')
const readline = require('readline')
const readlineSync = require('readline-sync')
const roles = ['commercant', 'employe', 'employeur']
function getDirectories(srcpath) {
    return fss.readdirSync(srcpath)
        .filter(file => fss.statSync(path.join(srcpath, file)).isDirectory())
}
Array.prototype.contains = function(element) {
    return this.indexOf(element) > -1
}
var func3 = function(url, name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl) {
    let routeJsFileContentArray
    let rolesAuto = []
    let autorizedRoles = `                authorizedRoles: [`
    for (let i = 0; i < roles.length; i++) {
        if (readlineSync.keyInYN('Le role ' + roles[i] + ' est il autorisé à acceder à cette page ?\n')) {
            rolesAuto.push(roles[i])
            if (i == 0) {
                autorizedRoles += 'USER_ROLES.' + roles[i] + ','
            } else {
                autorizedRoles += ' USER_ROLES.' + roles[i] + ','
            }
        }
    }
    autorizedRoles += ']'
    if (rolesAuto.length == 0) {
        console.log('Personne n\'aura accès à cette page! Veuillez rechoisir les rôles autorisés à y acceder')
        func3(url, name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl)
    } else {
        if (rolesAuto.length == roles.length) {
            routeJsFileContentArray = [
                `        .state('${name}', {`,
                `            cache: false,`,
                `            url: '${url}',`,
                `            template: require('./../../pages/${name}/${name}.html'),`,
                `            controller: '${name}Ctrl'`,
                `        })`
            ]
        } else {
            routeJsFileContentArray = [
                `        .state('${name}', {`,
                `            cache: false,`,
                `            url: '${url}',`,
                `            template: require('./../../pages/${name}/${name}.html'),`,
                `            controller: '${name}Ctrl',`,
                `            data: {`,
                autorizedRoles,
                `            }`,
                `        })`
            ]
        }
        if (!fs.existsSync(path)) {
            mkdirp(path, function(err) {
                if (err) return console.log(err)
                fs.writeFile(htmlFileName, htmlFileContent, function(err) {
                    if (err) return console.log(err)
                    console.log(htmlFileName + ' a bien été généré!')
                })
                fs.writeFile(jsFileName, jsFileContent, function(err) {
                    if (err) return console.log(err)
                    console.log(jsFileName + ' a bien été généré!')
                })
                let appFile = fs.readFileSync('./js/app.js').toString().split('\n')
                appFile.splice(2, 0, appJsFileImport)
                appFile.splice(appFile.length - 1, 0, appJsFileCtrl)
                let text = appFile.join('\n')
                fs.writeFile('./js/app.js', text, function(err) {
                    if (err) return console.log(err)
                    console.log('app.js a bien été configuré!')
                })
                let RouteJsFile = fs.readFileSync('./js/Configuration/Router.js').toString().split('\n')
                RouteJsFile.splice.apply(RouteJsFile, [2, 0].concat(routeJsFileContentArray))
                let textRouteJsFile = RouteJsFile.join('\n')
                fs.writeFile('./js/Configuration/Router.js', textRouteJsFile, function(err) {
                    if (err) return console.log(err)
                    console.log('Router.js a bien été configuré!')
                })
                setTimeout(function() {
                    console.log('\n \nVisitez l\'url /#' + url + ' pour voir le résultat')
                }, 400)
            })
        } else {
            console.log(path + ' existe déjà!')
        }
    }
}
var func2 = function(name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl) {
    const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl2.question('Quelle est l\'url de la page? (par defaut: /' + name + ') \n', (url) => {
        url = !url ? '/' + name : url
        rl2.close()
        if (url.substring(0, 1) != '/') {
            console.log('L\'url doit commencer par: /')
            func2(name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl)
        } else {
            func3(url, name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl)
        }
    })
}
var func1 = function() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('Quel est le nom de la page ? \n', (name) => {
        rl.close()
        if (!name) {
            console.log(`Le nom de la page est obligatoire!`)
            func1()
        } else if (getDirectories('./pages').contains(name)) {
            console.log(`Le nom: ${name} existe déjà!`)
            func1()
        } else {
            let path = './pages/' + name
            let htmlFileName = path + '/' + name + '.html'
            let htmlFileContent = '<h1>' + name + ' is created!</h1>'
            let jsFileName = path + '/' + name + 'Ctrl.js'
            let jsFileContent = `export let ${name}Ctrl = ['$scope', function($scope) {\n` +
                `    $('title').html('${name}')\n` +
                `}]\n`
            let appJsFileImport = `import {${name}Ctrl} from '../pages/${name}/${name}Ctrl'`
            let appJsFileCtrl = `    .controller('${name}Ctrl', ${name}Ctrl)`
            func2(name, path, htmlFileName, htmlFileContent, jsFileName, jsFileContent, appJsFileImport, appJsFileCtrl)
        }
    })
}
func1()
