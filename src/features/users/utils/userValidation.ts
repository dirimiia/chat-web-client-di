import type { User } from '../types/User'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isNameEmpty(name: string) {
  return name.trim().length === 0
}

export function isEmailEmpty(email: string) {
  return email.trim().length === 0
}

export function isEmailInvalid(email: string) {
  return !EMAIL_REGEX.test(email.trim())
}

export function doesUserNameAlreadyExist(users: User[], name: string) {
  const normalizedName = name.trim().toLowerCase()

  return users.some((user) => user.name.toLowerCase() === normalizedName)
}

export function doesUserEmailAlreadyExist(users: User[], email: string) {
  const normalizedEmail = email.trim().toLowerCase()

  return users.some((user) => user.email.toLowerCase() === normalizedEmail)
}