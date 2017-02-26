export function Factory() {
    let factory = {
        token: null,
        role: null,
        dns: 'https://dwarse.herokuapp.com',
        jsonHerdersWithToken: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': this.token
            }
        },
        jsonHerdersWithoutToken: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        },
        xmlHerdersWithToken: {
            headers: {
                'Accept': 'application/xml',
                'Content-Type': 'application/xml',
                'X-Auth-Token': this.token
            }
        },
        xmlHerdersWithoutToken: {
            headers: {
                'Accept': 'application/xml',
                'Content-Type': 'application/xml'
            }
        },
        url(url) {
            return `${this.dns}${url}`
        }
    }
    return factory
}
