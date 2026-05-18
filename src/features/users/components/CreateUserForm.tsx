import { useState } from 'react'
import type React from 'react'
import type { CreateUserFormValues } from '../types/User'

type CreateUserFormProps = {
  errorMessage: string
  isCreatingUser: boolean
  onCreateUser: (formValues: CreateUserFormValues) => Promise<boolean>
}

const CREATE_USER_BUTTON_TEXT = 'Create'
const CREATING_USER_BUTTON_TEXT = 'Creating...'

export function CreateUserForm({
  errorMessage,
  isCreatingUser,
  onCreateUser,
}: CreateUserFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const wasUserCreated = await onCreateUser({
      name,
      email,
    })

    if (wasUserCreated) {
      setName('')
      setEmail('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold">Create user</h1>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm">
          Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg px-4 py-2 text-black"
          placeholder="Enter name"
          disabled={isCreatingUser}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg px-4 py-2 text-black"
          placeholder="Enter email"
          disabled={isCreatingUser}
        />
      </div>

      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isCreatingUser}
        className="w-full rounded-lg bg-violet-600 py-2 font-semibold hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCreatingUser ? CREATING_USER_BUTTON_TEXT : CREATE_USER_BUTTON_TEXT}
      </button>
    </form>
  )
}