  
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import { useSessionContext } from "./SessionContext";

export default function Login() {
  const [session, setSession] = useSessionContext();
  const history = useHistory();
    const authService:AuthService=new AuthService();;
  const handleLogin = () => {
    authService.login();
    //setSession({...session, isAuthenticated: true});
    //history.push(session.redirectPath);
  }

  return <button onClick={handleLogin}>Login</button>;
}