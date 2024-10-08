import './App.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/UserProvider'
import { CurrentGroupProvider } from './context/CurrentGroupProvider'
import { GroupsProvider } from './context/GroupsProvider'
import { CurrentTabProvider } from './context/CurrentTabProvider'

//Container for all the context providers and app routes
function App() {
  return (
    <>
      <UserProvider>
        <GroupsProvider>
          <CurrentGroupProvider>
            <CurrentTabProvider>
              <AppRoutes></AppRoutes>
            </CurrentTabProvider>
          </CurrentGroupProvider>
        </GroupsProvider>
      </UserProvider>
    </>
  )
}

export default App
