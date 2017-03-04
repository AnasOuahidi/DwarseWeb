export function Factory() {
    let factory = {
        token: null,
        // dns: 'http://localhost:8000',
        dns: 'http://dwarse.dev',
        jsonHerders: {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        },
        xmlHerders: {
            headers: {
                'Accept': 'application/xml',
                'Content-Type': 'application/xml'
            }
        },
        url(url) {
            if (url === '/auth/authtokens' || url === '/auth/users' || url === '/auth/login') {
                return `${this.dns}${url}`
            }
            return `${this.dns}${url}?token=${this.token}`
        }
    }
    return factory
}
