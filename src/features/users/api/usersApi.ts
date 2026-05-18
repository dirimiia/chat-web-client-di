import { apiClient } from '../../../shared/api/apiClient'
import type { CreateUserRequest, User } from '../types/User'

const USERS_ENDPOINT = '/users'

export async function createUserInApi(request: CreateUserRequest) {
  const response = await apiClient.post<User>(USERS_ENDPOINT, request)

  return response.data
}