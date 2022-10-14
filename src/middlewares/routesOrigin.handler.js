
const comesFromContact = (req, res, next) => {
    req.fromContact = req.baseUrl.includes('contacts')

    next()
}

module.exports = { comesFromContact }