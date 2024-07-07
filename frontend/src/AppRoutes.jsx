import {Routes, Route, Navigate, Outlet} from "react-router-dom"
import Home from "./pages/Home"
import User from "./pages/User"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Group from "./pages/Group"
import GroupRelations from "./pages/GroupRelations"
import GroupRequests from "./pages/GroupRequests"
import GroupSettings from "./pages/GroupSettings"
import GroupUsers from "./pages/GroupUsers"
import { useUserContext } from "./context/UserProvider"
import CreateGroup from "./pages/CreateGroup"

function SigninRedirect({ redirectPath = '/signin', children}) {
    const { user } = useUserContext();

    if(!user.email) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet/>;
}

function UserRedirect({ redirectPath = '/', children }) {
    const { user } = useUserContext();

    if(user.email) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet/>
}

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<Home {...props}></Home>}/>
            <Route path="user" element={<SigninRedirect><User {...props}></User></SigninRedirect>}/>
            <Route path="signin" element={<UserRedirect><SignIn {...props}></SignIn></UserRedirect>}/>
            <Route path="signup" element={<UserRedirect><SignUp {...props}></SignUp></UserRedirect>}/>
            <Route path="create" element={<SigninRedirect><CreateGroup {...props}></CreateGroup></SigninRedirect>}/>
            <Route path=":groupId" element={<SigninRedirect><Group {...props}></Group></SigninRedirect>}/>
            <Route path=":groupId/settings" element={<SigninRedirect><GroupSettings {...props}></GroupSettings></SigninRedirect>}/>
            <Route path=":groupId/users" element={<SigninRedirect><GroupUsers {...props}></GroupUsers></SigninRedirect>}/>
            <Route path=":groupId/relations" element={<SigninRedirect><GroupRelations {...props}></GroupRelations></SigninRedirect>}/>
            <Route path=":groupId/requests" element={<SigninRedirect><GroupRequests {...props}></GroupRequests></SigninRedirect>}/>
        </Routes>
    )
}