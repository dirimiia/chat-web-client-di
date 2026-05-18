import { ActiveUserCard } from './features/users/components/ActiveUserCard'
import { CreateUserForm } from './features/users/components/CreateUserForm'
import { UserList } from './features/users/components/UserList'
import { useUsers } from './features/users/hooks/useUsers'

function App() {
  const {
    users,
    activeUser,
    errorMessage,
    isCreatingUser,
    createUser,
    selectUser,
  } = useUsers()

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <section className="bg-slate-800 p-8 rounded-xl w-full max-w-md space-y-6">
        <CreateUserForm
          errorMessage={errorMessage}
          isCreatingUser={isCreatingUser}
          onCreateUser={createUser}
        />

        <ActiveUserCard activeUser={activeUser} />

        <UserList
          users={users}
          activeUserId={activeUser?.id ?? null}
          onSelectUser={selectUser}
        />
      </section>
    </main>
  )
}

export default App