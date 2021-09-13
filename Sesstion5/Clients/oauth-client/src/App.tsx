import { Route, Switch } from 'react-router';
import Protected from "./components/Protected";
import Homepage from "./components/HomePage";
import ProtectedRoute, { ProtectedRouteProps } from "./components/PrivateRoute";
import { useSessionContext } from './components/SessionContext';
import Login from './components/Login';
import CallBackLogin from './components/CallBackLogin';


export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({...sessionContext, redirectPath: path});
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Switch>
        <Route exact={true} path='/' component={Homepage} />
        <ProtectedRoute {...defaultProtectedRouteProps} path='/protected' component={Protected} />
        <Route path='/login' component={Login} />
        <Route path='/auth-callback' component={CallBackLogin} />

      </Switch>
    </div>
  );
};