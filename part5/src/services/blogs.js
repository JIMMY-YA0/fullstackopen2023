import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => (token = `Bearer ${newToken}`)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  //set up token to headers
  const config = { headers: { Authorization: token } }
  const request = await axios.post(baseUrl, object, config)
  return request.data
}

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object)
  return request.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { setToken, getAll, create, update, remove }
