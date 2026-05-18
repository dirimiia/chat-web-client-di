import axios from 'axios'
import { useState } from 'react'
import { createUserInApi } from '../api/usersApi'
import type { CreateUserFormValues, User } from '../types/User'
import {
  doesUserEmailAlreadyExist,
  doesUserNameAlreadyExist,
  isEmailEmpty,
  isEmailInvalid,
  isNameEmpty,
} from '../utils/userValidation'

const EMPTY_ERROR_MESSAGE = ''
const EMPTY_USERS: User[] = []

const EMPTY_NAME_ERROR_MESSAGE = 'Please enter a name'
const EMPTY_EMAIL_ERROR_MESSAGE = 'Please enter an email'
const INVALID_EMAIL_ERROR_MESSAGE = 'Please enter a valid email'
const USER_NAME_ALREADY_EXISTS_ERROR_MESSAGE = 'This user name already exists'
const USER_EMAIL_ALREADY_EXISTS_ERROR_MESSAGE = 'This email already exists'
const DEFAULT_CREATE_USER_ERROR_MESSAGE = 'Could not create user. Please try again.'
const CONFLICT_ERROR_MESSAGE = 'This user already exists'

const CONFLICT_STATUS_CODE = 409

export function useUsers() {
  const [users, setUsers] = useState<User[]>(EMPTY_USERS)
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const [errorMessage, setErrorMessage] = useState(EMPTY_ERROR_MESSAGE)
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  async function createUser(formValues: CreateUserFormValues) {
    const trimmedName = formValues.name.trim()
    const trimmedEmail = formValues.email.trim().toLowerCase()

    if (isNameEmpty(trimmedName)) {
      setErrorMessage(EMPTY_NAME_ERROR_MESSAGE)
      return false
    }

    if (isEmailEmpty(trimmedEmail)) {
      setErrorMessage(EMPTY_EMAIL_ERROR_MESSAGE)
      return false
    }

    if (isEmailInvalid(trimmedEmail)) {
      setErrorMessage(INVALID_EMAIL_ERROR_MESSAGE)
      return false
    }

    if (doesUserNameAlreadyExist(users, trimmedName)) {
      setErrorMessage(USER_NAME_ALREADY_EXISTS_ERROR_MESSAGE)
      return false
    }

    if (doesUserEmailAlreadyExist(users, trimmedEmail)) {
      setErrorMessage(USER_EMAIL_ALREADY_EXISTS_ERROR_MESSAGE)
      return false
    }

    setIsCreatingUser(true)

    try {
      const createdUser = await createUserInApi({
        name: trimmedName,
        email: trimmedEmail,
      })

      setUsers((currentUsers) => [...currentUsers, createdUser])
      setActiveUser(createdUser)
      setErrorMessage(EMPTY_ERROR_MESSAGE)

      return true
    } catch (error) {
      setErrorMessage(getCreateUserErrorMessage(error))
      return false
    } finally {
      setIsCreatingUser(false)
    }
  }

  function selectUser(userId: string) {
    const selectedUser = users.find((user) => user.id === userId)

    if (selectedUser === undefined) {
      return
    }

    setActiveUser(selectedUser)
  }

  return {
    users,
    activeUser,
    errorMessage,
    isCreatingUser,
    createUser,
    selectUser,
  }
}

function getCreateUserErrorMessage(error: unknown) {
  if (
    axios.isAxiosError(error) &&
    error.response?.status === CONFLICT_STATUS_CODE
  ) {
    return CONFLICT_ERROR_MESSAGE
  }

  return DEFAULT_CREATE_USER_ERROR_MESSAGE
}