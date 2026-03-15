import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios
          .get(baseURL)
          .then(res => res.data)
}

const createPerson = (object) => {
  return axios
          .post(baseURL, object)
          .then(res => res.data)
}

const deletePerson = (id) => {
  return axios
          .delete(`${baseURL}/${id}`)
          .then(res => res.data)
}

const updatePerson = (id, object) => {
  return axios
          .put(`${baseURL}/${id}`, object)
          .then(res => res.data)
}

export default { getPersons, createPerson, deletePerson, updatePerson }
