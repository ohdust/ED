import { PreloaderComponent } from './../preloader/preloader.component';
import { ChatroomService } from './chatroom.service';
import { AuthorizationService } from './../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMessage, IUserData, IRooms } from './message.interface';


@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.scss']
})

export class ChatroomComponent implements OnInit {
  rooms:IRooms[] = [];
  roomName:string = '' ;

  currentRoom:string = "";
  newMessage: string = '';
  messageList: IMessage[] = [];

  userData:IUserData = {
      user: '',
      userid: ''
  }

  constructor(
      public authService: AuthorizationService,
      private router: Router,
      private chatservice: ChatroomService,
      private preloader: PreloaderComponent,
  ) { }

  ngOnInit(): void {
      this.userData.user = localStorage.getItem('login');
      this.userData.userid = this.authService.id;
      this.getAllRooms();
      this.currentRoom = this.chatservice.activeRoom;

      //this string create stream
      this.chatservice.getNewMessage().subscribe(
          (message) => {
              if(!message) return;
              this.messageList.push(message);
          }
      );
  }

  sendMessage(){
      if(this.newMessage.length === 0) return;
      this.chatservice.sendMessage(this.newMessage);
      this.newMessage = '';
      console.log(this.messageList);
  }

  logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
  }

  joinToTheRoom(name:string, roomId:string){
      this.chatservice.activeRoom = roomId;
      this.chatservice.joinTheRoom(name,roomId);
  }

  getAllRooms(){
      this.chatservice.getRooms().subscribe(
          res => {
              this.rooms = res;
          }
      );
  }

  getMessages(roomId:string){
      this.chatservice.getMessagesByRoomId(roomId).subscribe(
          res => {
              this.messageList = res;
          }
      );
  }

  createRoom(){
      if(this.preloader.isLoading === false) {
          this.preloader.isLoading = true;
          this.chatservice.createRoom(this.userData.userid, this.roomName).subscribe((res) =>{
              this.rooms.push(res);
              this.chatservice.activeRoom = res.room_id;
              this.preloader.isLoading = false;
          });
      }
  }

  deleteRoom(roomId:string){
      if(confirm("Are you sure?")){
          if(this.preloader.isLoading === false){
              this.preloader.isLoading = true;
              this.chatservice.deleteRoomById(roomId).subscribe();
          }
          this.rooms = this.rooms.filter((room) => room.room_id !== roomId);
          this.preloader.isLoading = false;
      }
  }

  deleteMessage(messageId:string){
      if(confirm("Are you sure?")){
          if(this.preloader.isLoading === false){
              this.preloader.isLoading = true;
              this.chatservice.deleteMessageById(messageId).subscribe();
          }
          this.messageList = this.messageList.filter((message) => message.messageid !== messageId);
          this.preloader.isLoading = false;
      }
  }
}
