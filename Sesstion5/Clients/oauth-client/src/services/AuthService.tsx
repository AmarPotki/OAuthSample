
import { Log, User, UserManager } from 'oidc-client';

export default class AuthService {
    static isLogin() {
        throw new Error('Method not implemented.');
    }
    public userManager: UserManager;

    /**
     *
     */
    constructor() {
        const settings = {
            authority: 'https://localhost:5001/',
            client_id: 'react',
            redirect_uri: `http://localhost:3000/auth-callback`,
            response_type: "code", 
            scope: "openid profile",
          };
          this.userManager = new UserManager(settings);
      
          Log.logger = console;
          Log.level = Log.INFO;        
    }
    public login(){
      return  this.userManager.signinRedirect();
    }
    public redirectToSts(state: string) :Promise<void> {
        var redirectConfig = {
          state: state
        };
      return  this.userManager.signinRedirect(redirectConfig);
      }

      redirectCallback() {
        this.userManager.signinRedirectCallback().then(user=>{

        })
      }
      public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
      }
      public getUser(): Promise<User | null> {
        return this.userManager.getUser();
      }
      public isLogin() {
        return this.getUser() !=null;
      }
}