import { Router } from '@angular/router';
import { PreloaderComponent } from './../preloader/preloader.component';
import { RegistrationService } from './registration.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private regService: RegistrationService,
    private preloader: PreloaderComponent,
    private router: Router
  ) { }

  get fnc(){return this.registrationForm.controls;}

  ngOnInit(): void {
  }

  doRegistration(){
      if(this.fnc.login.errors?.['minlength']) return;
      if(this.preloader.isLoading === false){
          this.preloader.isLoading = true;
          this.regService.registration(this.registrationForm.value).subscribe(
              () => {
                  this.router.navigate(['/login']);
                  this.preloader.isLoading = false;
              }
          );
      }
  }

  navigateLogIn(){
      this.router.navigate(['/login']);
  }
}
