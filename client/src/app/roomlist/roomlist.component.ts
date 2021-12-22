import { PreloaderComponent } from './../preloader/preloader.component';
import { ChatroomService } from './../chatroom/chatroom.service';
import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../authorization/authorization.service';
import { IRooms } from '../chatroom/message.interface';

@Component({
    selector: 'app-roomlist',
    templateUrl: './roomlist.component.html',
    styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {

    rooms:IRooms[] = [];
    roomName:string = '' ;
    userId:string = '';

    constructor(
      private authService: AuthorizationService,
      private chServ: ChatroomService,
      private preloader: PreloaderComponent,
    ) { }

    ngOnInit(): void {
        this.userId = this.authService.id;
        this.getAllRooms();
    }

    joinToTheRoom(name:string, roomId:string){
        console.log(roomId);
        //console.log(`join to the ${name} with id: ${roomId}`);
        this.chServ.activeRoom = roomId;
        this.chServ.joinTheRoom(name,roomId);
    }

    getAllRooms(){
        this.chServ.getRooms().subscribe(
            res => {
                this.rooms = res;
                console.log(this.rooms);
            }
        );
    }

    getMessages(roomId:string){
        this.chServ.getMessagesByRoomId(roomId).subscribe(
          
        );
    }

    createRoom(){
        if(this.preloader.isLoading === false) {
            this.preloader.isLoading = true;
            this.chServ.createRoom(this.userId, this.roomName).subscribe((res) =>{
                this.rooms.push(res);
                this.preloader.isLoading = false;
            });
        }
    }

    deleteRoom(roomId:string){
        if(confirm("Are you sure?")){
            if(this.preloader.isLoading === false){
                this.preloader.isLoading = true;
                this.chServ.deleteRoomById(roomId).subscribe();
            }
            this.rooms = this.rooms.filter((room) => room.room_id !== roomId);
            this.preloader.isLoading = false;
        }
    }
}
