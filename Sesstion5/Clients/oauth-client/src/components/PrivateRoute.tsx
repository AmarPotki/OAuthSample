import { useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import AuthService from '../services/AuthService';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

export default function ProtectedRoute({isAuthenticated, authenticationPath, redirectPath, setRedirectPath, ...routeProps}: ProtectedRouteProps) {
  const currentLocation = useLocation();
    const authService: AuthService = new AuthService();
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname);
    }
  }, [isAuthenticated, setRedirectPath, currentLocation]);

  if(authService.isLogin()) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }} />;
  }
};

