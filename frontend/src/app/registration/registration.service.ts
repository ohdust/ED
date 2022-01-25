import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from './registration.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http:HttpClient) { }

    registrationUrl = environment.authUrl;

    registration(user:IUser):Observable<IUser>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': "application/json"
            }),
            withCredentials: true
        };
        return this.http.post<IUser>(this.registrationUrl  + 'registration', user, httpOptions).pipe();
    }
}
