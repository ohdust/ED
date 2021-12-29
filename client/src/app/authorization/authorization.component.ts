import { Router } from '@angular/router';
import { PreloaderComponent } from './../preloader/preloader.component';
import { AuthorizationService } from './authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {

    authForm = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

    get fnc(){return this.authForm.controls;}

    constructor(
      public authorization: AuthorizationService,
      public requestStatus: PreloaderComponent,
      private router: Router,
    ) { }

    ngOnInit(): void {
        this.auth();
    }

    addUser(){
        if(this.requestStatus.isLoading === false){
            this.requestStatus.isLoading = true;
            this.authorization.createUser(this.authForm.value)
            .subscribe(
                () => {
                    this.requestStatus.isLoading = false;
                }
            );
        }
        return;
    }

    doAuth(){
        if(this.requestStatus.isLoading === false){
            this.requestStatus.isLoading = true;
            this.authorization.login(this.authForm.value)
            .subscribe(
                () => {
                    this.router.navigate(['/chat']);
                    this.requestStatus.isLoading = false;
                }
            );
        }
        this.requestStatus.isLoading = false;
    }

    auth(){
        if(this.requestStatus.isLoading === false){
            this.requestStatus.isLoading = true;
            this.authorization.auth()
            .subscribe(
                () => {
                    this.router.navigate(['/chat']);
                    this.requestStatus.isLoading = false;
                }
            );
        }
        this.requestStatus.isLoading = false;
    }

    navigateRegistartion(){
        this.router.navigate(['/registration']);
    }
}
