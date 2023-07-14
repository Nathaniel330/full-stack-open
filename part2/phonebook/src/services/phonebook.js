import axios from 'axios'

const getAll = () => {
    return axios
        .get('http://localhost:3001/persons')
        .then(response => {
            return response.data
        })
}

const create = (newObject) => {
    return axios
        .post('http://localhost:3001/persons', newObject)
        .then(response => response.data)
}

const update = (id, newObject) => {
    return axios
        .put(`http://localhost:3001/persons/${id}`, newObject)
        .then(response => response.data)
}

const remove = (id) => {
    return axios
        .delete(`http://localhost:3001/persons/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll, create, update, remove
}