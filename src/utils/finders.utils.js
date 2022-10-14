
const searchByMulti = async (service, contact, user_id) => {
    const { rut, email, alias, last_name, name } = contact

    const contactExist = async () => {
        try {
            if(rut) {
                return await findContact(service, rut, 'findByRut', user_id)
            } 
            if(email) {
                return await findContact(service, email, 'findByEmail', user_id)
            } 
            if(alias) {
                return await findContact(service, alias, 'findByAlias', user_id)
            } 
            // if(last_name) {
            //     return await findContact(service, last_name, 'findByLastName')
            // } 
            // if(alias) {
            //     return await findContact(service, alias, 'findByName')
            // } 
            return false
        } catch(error) {
            throw new Error(error)
        }
    }

    return contactExist()
}

const findContact = async (service, param, finder, user_id) => {
    const findedContact = await service[finder](param, user_id)
    if(findedContact) return findedContact
    return false
}

module.exports = { searchByMulti }