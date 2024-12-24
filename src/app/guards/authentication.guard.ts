import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';


export const authenticationGuard: CanActivateFn = (route, state) => {

    debugger;

    const router = inject(Router);

    const localData = localStorage.getItem("authUser");
    if(localData != null) {
        return true;
    } else {
        router.navigateByUrl("/login");
        return false;
    }

}



/*  /////////////////////////////////////////////////////////////////////////////////////////////////

@InjectableIn ({
    ProvidedIn : 'root'
})

export class authenticationGuard implements CanActivate {
    authService: any;
    router: any;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        throw new Error('Method not implemented.');
    }

    construtor(private authService : AuthenticationService, private router : Router) {   
    } 

    CanActivate(
        route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot) : Observable<Boolean | UrlTree> | Promise<Boolean | UrlTree> | Boolean | UrlTree {
        let authenticated = this.authService.isAuthenticated();
        if(authenticated == false) {
            this.router.navigateByUrl("/login")
            return false;  
        } else {
            return true
        }
        
    }
    
}
function InjectableIn(arg0: { ProvidedIn: string; }): (target: typeof authenticationGuard) => void | typeof authenticationGuard {
    throw new Error('Function not implemented.');
} */

