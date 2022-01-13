import { AuthorizationService } from './../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user:string | null = '';

    constructor(
      private authSer: AuthorizationService,
      private router: Router
    ) { }

    ngOnInit(): void {
        this.user = this.authSer.user;
    }

    logout(){
        this.authSer.logout();
        this.router.navigate(['/login']);
    }
}
