import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject, userToken) => {
  setToken(userToken)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject, userToken) => {
  setToken(userToken)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const comment = async (newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject.id}/comments`, newObject)
  return response.data
}

const remove = async (id, userToken) => {
  setToken(userToken)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line
export default { getAll, create, update, remove, setToken, comment }