
const comesFromContact = (req, res, next) => {
    req.fromContact = req.baseUrl.includes('contacts')
    next()
}

const comesFromProject = (req, res, next) => {
    req.fromProject = req.baseUrl.includes('projects')
    next()
}

module.exports = { comesFromContact, comesFromProject }