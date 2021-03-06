import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const create = (nameObject) => {
    return axios.post(baseUrl, nameObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { get, create, remove }