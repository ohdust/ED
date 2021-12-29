import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from './registration.interfaces';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http:HttpClient) { }

    registrationUrl = 'http://localhost:3000/registration'

    registration(user:IUser):Observable<IUser>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': "application/json"
            }),
            withCredentials: true
        };
        return this.http.post<IUser>(this.registrationUrl, user, httpOptions).pipe();
    }
}
