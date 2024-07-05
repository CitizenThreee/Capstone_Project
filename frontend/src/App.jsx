import './App.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/UserProvider'
import { UserGroupsProvider } from './context/UserGroupsProvider'

function App() {
  return (
    <>
      <UserProvider>
        <UserGroupsProvider>
          <AppRoutes></AppRoutes>
        </UserGroupsProvider>
      </UserProvider>
    </>
  )
}

export default App
