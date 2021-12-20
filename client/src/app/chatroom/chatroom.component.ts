import { PreloaderComponent } from './../preloader/preloader.component';
import { ChatroomService } from './chatroom.service';
import { AuthorizationService } from './../authorization/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMessage, IUserData } from './message.interface';

@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.scss']
})

export class ChatroomComponent implements OnInit {
  newMessage: string = '';
  messageList: IMessage[] = [];
  roomName:string = '' ;
  //chatUser:string = '';
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
      this.chatservice.getNewMessage().subscribe(
          (message) => {
              if(!message) return;
              this.messageList.push(message);
          }
      );
  }

  createRoom(){
      if(this.preloader.isLoading === false) {
          this.preloader.isLoading = true;
          this.chatservice.createRoom(this.userData.userid, this.roomName).subscribe(() =>{
              this.preloader.isLoading = false;
              this.roomName = '';
          });

      }
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
}
