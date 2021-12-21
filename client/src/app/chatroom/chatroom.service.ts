import { AuthorizationService } from './../authorization/authorization.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';

import { io } from 'socket.io-client';
import { IRooms, IMessage } from './message.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatroomService {
  chatUrl = 'http://localhost:3000/';
  socket = io('http://localhost:3000');
  message$: Subject<IMessage> = new Subject();

  userId:string = '';
  activeRoom:string = '';
  curentRoom:string = '';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient, public logUser: AuthorizationService) { }

  //send data to the server
  public sendMessage(message:string){
      this.socket.emit('message', this.activeRoom.toString() , {login: this.logUser.user, message});
  }
  // get rooms
  getRooms():Observable<IRooms[]>{
      const token = localStorage.getItem("token");
      const httpOptions = {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${token}`,
              'Content-Type': "application/json"
          }),
          withCredentials: true
      };
      return this.http.get<IRooms[]>(this.chatUrl + 'chat/',httpOptions)
          .pipe();
  }

  //take messages from concrete room
  getMessagesByRoomId(roomId:string):Observable<string[]>{
      const httpOptions = {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${this.token}`,
              'Content-Type': "application/json"
          }),
          withCredentials: true
      };
      return this.http.post<string[]>(this.chatUrl + 'chat/' + `${roomId}`, roomId, httpOptions).pipe();
  }

  createRoom(userId: string, roomName:string):Observable<IRooms>{
      const data = {name: roomName,user_id: userId};
      const httpOptions = {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${this.token}`,
              'Content-Type': "application/json"
          }),
          withCredentials: true
      };
      return this.http.post<IRooms>(this.chatUrl + 'chat', data, httpOptions).pipe();
  }

  // join you to a room after click on the room
  joinTheRoom(roomname:string, roomId:string){
      this.socket.emit('join-room', {
          name: roomname, roomId: JSON.stringify(roomId), login: this.logUser.user
      });
  }

  //Get new Messages use socket
  public getNewMessage(){
      this.socket.on('message', (message) =>{
          this.message$.next(message);
          console.log(message);
      });
      return this.message$;
  }

  //delete room by id
  deleteRoomById(roomId:string):Observable<string>{
      console.log(roomId);
      const token = localStorage.getItem("token");
      const httpOptions = {
          headers: new HttpHeaders({
              "Authorization": `Bearer ${token}`,
              'Content-Type': "application/json"
          }),
          withCredentials: true
      };
      return this.http.delete<string>(
          this.chatUrl + 'chat/' + 'delete/' +`${roomId}`,httpOptions);
  }
}
