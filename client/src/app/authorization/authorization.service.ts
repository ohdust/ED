import { IUserData } from './../chatroom/message.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { io } from 'socket.io-client';


interface IUser {
  login:string;
  password: string;
}

interface IAuth {
  login:string;
  token:string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private authUrl = 'http://localhost:3000/';
    //socket = io('http://localhost:3000');

    user:string | null  = '';
    id: string = '';
    token:string = '';


    constructor(private http: HttpClient) { }

    createUser(user:IUser):Observable<IUser>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': "application/json"
            }),
            withCredentials: true
        };
        return this.http.post<IUser>(this.authUrl + "registration", user, httpOptions)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
    }

    login(user:IUser):Observable<void>{
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
            withCredentials: true
        };
        return this.http.post<IAuth>(this.authUrl + "authorize", user, httpOptions)
      .pipe(
          map(res => {
              this.token = res.token;
              this.user = res.login;
              localStorage.setItem('token', this.token);
              localStorage.setItem('login', this.user );
          }),
          catchError(err => {
              return throwError(err);
          })
      );
    }

    auth():Observable<void>{
        const token = localStorage.getItem("token");
        const httpOptions = {
            headers: new HttpHeaders({
                "Authorization": `Bearer ${token}`
            }),
            withCredentials: true
        };

        return this.http.get<IUserData>(this.authUrl + "auth", httpOptions)
            .pipe(
                map(res => {
                    this.user = res.user;
                    this.id = res.userid;
                }),
            );
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        return console.log('user logout');
    }
}

