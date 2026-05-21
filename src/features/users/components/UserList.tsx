import type { User } from '../types/User'

type UserListProps = {
  users: User[]
  activeUserId: string | null
  isLoading: boolean
  errorMessage: string
  onSelectUser: (userId: string) => void
}

const NO_USERS_MESSAGE = 'No users created yet.'
const LOADING_USERS_MESSAGE = 'Loading users...'
const ACTIVE_USER_LABEL = 'active'

const BASE_USER_BUTTON_CLASS_NAME =
  'flex w-full items-center justify-between rounded-lg border px-4 py-2 text-left transition'

const ACTIVE_USER_BUTTON_CLASS_NAME =
  'border-violet-500 bg-violet-950 text-violet-200'

const DEFAULT_USER_BUTTON_CLASS_NAME =
  'border-transparent bg-slate-700 hover:bg-slate-600'

export function UserList({
  users,
  activeUserId,
  isLoading,
  errorMessage,
  onSelectUser,
}: UserListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Created users</h2>

      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
      {isLoading ? (
        <p className="text-sm text-slate-400">{LOADING_USERS_MESSAGE}</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-400">{NO_USERS_MESSAGE}</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => {
            const isActiveUser = user.id === activeUserId

            const userButtonClassName = isActiveUser
              ? ACTIVE_USER_BUTTON_CLASS_NAME
              : DEFAULT_USER_BUTTON_CLASS_NAME

            return (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => onSelectUser(user.id)}
                  className={`${BASE_USER_BUTTON_CLASS_NAME} ${userButtonClassName}`}
                >
                  <span>
                    <span className="block">{user.name}</span>
                    <span className="block text-xs text-slate-400">
                      {user.email}
                    </span>
                  </span>

                  {isActiveUser && (
                    <span className="text-xs font-semibold text-violet-300">
                      {ACTIVE_USER_LABEL}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}