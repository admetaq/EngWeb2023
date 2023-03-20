var axios = require('axios')

// Student list
module.exports.list = () => {
    return axios.get('http://localhost:3000/users?_sort=name')
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getUsers = id => {
    return axios.get('http://localhost:3000/users/' + id)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addUser = a => {
    return axios.post('http://localhost:3000/users', a)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}
