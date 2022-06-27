import request from '@/utils/request'

const userApi = {
  getUser: (params) => request.get('/get_user', { params }),
  getCode: () => request.get('/get_code'),
  registerUser: (params) => request.post('/register_user', params),
  login: (params) => request.post('/login', params),
}

export default userApi
