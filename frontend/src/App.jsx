import './App.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/UserProvider'
import { UserGroupsProvider } from './context/UserGroupsProvider'
import { CurrentGroupProvider } from './context/CurrentGroupProvider'

function App() {
  return (
    <>
      <UserProvider>
        <UserGroupsProvider>
          <CurrentGroupProvider>
            <AppRoutes></AppRoutes>
          </CurrentGroupProvider>
        </UserGroupsProvider>
      </UserProvider>
    </>
  )
}

export default App
