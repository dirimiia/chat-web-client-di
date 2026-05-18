export type User = {
  id: string
  name: string
  email: string
  profileImageUrl: string | null
  createdAt: string
  updatedAt: string
}

export type CreateUserFormValues = {
  name: string
  email: string
}

export type CreateUserRequest = {
  name: string
  email: string
}