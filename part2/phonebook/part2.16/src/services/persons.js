import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (nameObject) => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { get, create, remove }