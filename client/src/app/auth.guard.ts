import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public auth: AuthorizationService){}

    canActivate(){
        if(this.auth.user){
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }

}
