const https = require('https')

const DEFAULT_PARAMS = {
    method: 'get',
    timeout: 2000
}

class Request {

    errorTimeout = (reject, urlRequest) => () => reject(new Error(`timeout at [${urlRequest}] :(`))

    raceTimeoutDelay(url, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(this.errorTimeout(reject, url), timeout)
        })
    }
    async get(url) {
        return new Promise((resolve, reject) => {

            https.get(url, res => {
                const items = []
                res
                    .on('data', data => items.push(data))
                    .on("end", () => resolve(JSON.parse(items.join(""))))
            })
                .on("error", reject)
        })
    }

    async makeRequest({ url, method = DEFAULT_PARAMS.method, timeout = DEFAULT_PARAMS.timeout }) {
        return Promise.race([
            this[method](url),
            this.raceTimeoutDelay(url, timeout)
        ])
    }

}

module.exports = Request