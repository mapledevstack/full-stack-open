import axios from "axios"

const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
  return axios
          .get(baseURL)
          .then(res => res.data)
}

const create = (object) => {
  return axios
          .post(baseURL, object)
          .then(res => res.data)
}

const update = (id, object) => {
  return axios
          .put(`${baseURL}/${id}`, object)
          .then(res => res.data)
}

export default { getAll, create, update }
