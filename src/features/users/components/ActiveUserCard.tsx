import type { User } from '../types/User'

type ActiveUserCardProps = {
  activeUser: User | null
}

const NO_ACTIVE_USER_MESSAGE = 'No active user selected yet.'

export function ActiveUserCard({ activeUser }: ActiveUserCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-sm font-semibold text-slate-400">Active user</h2>

      {activeUser === null ? (
        <p className="mt-2 text-slate-300">{NO_ACTIVE_USER_MESSAGE}</p>
      ) : (
        <div className="mt-2">
          <p className="text-lg font-semibold text-violet-300">
            {activeUser.name}
          </p>

          <p className="text-sm text-slate-400">{activeUser.email}</p>
        </div>
      )}
    </div>
  )
}