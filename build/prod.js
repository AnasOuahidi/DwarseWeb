const fs = require('fs')
let factoryFile = fs.readFileSync('./js/Services/Factory.js').toString().split('\n')
for (let i = 0; i < factoryFile.length; i++) {
    if (factoryFile[i].match('dns:')) {
        factoryFile.splice(i, 1)
        var j = i--
    }
}
factoryFile.splice(j, 0, '        dns: \'https://dwarse.herokuapp.com\',')
let factoryText = factoryFile.join('\n')
fs.writeFile('./js/Services/Factory.js', factoryText, function(err) {
    if (err) return console.log(err)
})
