import { PreloaderComponent } from './../preloader/preloader.component';
import { ChatroomService } from './chatroom.service';
import { AuthorizationService } from './../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { IMessage, IUserData, IRooms } from './message.interface';



@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.scss'],
    animations: [

      trigger('simpleFadeAnimation', [

        state('in', style({opacity: 1})),

        transition(':enter', [
          style({opacity: 0}),
          animate(200)
        ]),

        transition(':leave',
            animate(400, style({opacity: 0})))
      ])
    ]
})

export class ChatroomComponent implements OnInit {

  rooms:IRooms[] = [];
  roomName:string = '' ;
  showCloseConfirmButtons = false;
  showDeleteConfirmButtons = false;
  currentRoomName = "";
  error = false;
  closeRoomConfirm = false;
  showCreatorPopup = false;
  deleteMessageButtons = false;
  newMessage: string = '';
  messageList: IMessage[] = [];

  userData:IUserData = {
      user: '',
      userid: ''
  }

  activeRoom = {
      roomId: '',
      name: "",
      status: false,
      createrId: ""
  };

  constructor(
      public authService: AuthorizationService,
      private chatservice: ChatroomService,
      private preloader: PreloaderComponent,
  ) {}

  ngOnInit(): void {
      this.userData.userid = this.authService.userId;
      this.userData.user = localStorage.getItem('login');
      this.getAllRooms();

      this.chatservice.getNewMessage().subscribe(
          (message) => {
              if(!message) return;
              this.messageList.push(message);
          }
      );
  }

  sendMessage(){
      if(this.newMessage.length === 0 || this.chatservice.activeRoom.status === true) return;
      this.chatservice.sendMessage(this.newMessage);
      this.newMessage = '';
      this.getAllRooms();
  }

  joinToTheRoom(name:string, roomId:string, status:boolean, createrId: string){
      this.chatservice.activeRoom.roomId = roomId;
      this.chatservice.activeRoom.status = status;
      this.chatservice.activeRoom.name = name;
      this.chatservice.activeRoom.createrId = createrId;
      this.activeRoom = this.chatservice.activeRoom;
      this.currentRoomName = name;
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
      if(this.roomName === '' || this.roomName.length < 2 || this.roomName.length > 20) {
          this.error = true;
          return;
      }
      if(this.preloader.isLoading === false) {
          this.preloader.isLoading = true;
          this.chatservice.createRoom(this.roomName).subscribe((res) =>{
              this.rooms.push(res);
              this.roomName = '';
              this.error = false;
              this.chatservice.activeRoom.roomId = res.room_id;
              this.getAllRooms();
              this.showCreatorPopup = false;
              this.preloader.isLoading = false;
          });
      }
  }

  deleteRoom(roomId:string){
      
      if(this.preloader.isLoading === false){
          this.preloader.isLoading = true;
          this.chatservice.deleteRoomById(roomId).subscribe(
              ()=> {
                  this.showDeleteConfirmButtons = false;
              }
          );
      }
      this.rooms = this.rooms.filter((room) => room.room_id !== roomId);
      this.preloader.isLoading = false;
      
  }

  deleteMessage(messageId:string){
      if(this.preloader.isLoading === false){
          this.preloader.isLoading = true;
          this.chatservice.deleteMessageById(messageId).subscribe();
      }
      this.messageList = this.messageList.filter((message) => message.messageid !== messageId);
      this.preloader.isLoading = false;
  }

  closeRoom(roomId:string, createrId:string){
      if(createrId !== this.userData.userid) return;
      if(this.preloader.isLoading === false){
          this.preloader.isLoading = true;
          this.chatservice.closeRoomById(roomId).subscribe(
              ()=> {
                  this.rooms = this.rooms.filter((room) => room.room_id !== roomId);
                  this.showCloseConfirmButtons = false;
                  this.preloader.isLoading === false;
              }
          );
      }

  }

  showCreatePopUpMenu(){
      this.showCreatorPopup = true;
  }

  closeCreatePopUpMenu(){
      this.showCreatorPopup = false;
      this.error = false;
  }
}
