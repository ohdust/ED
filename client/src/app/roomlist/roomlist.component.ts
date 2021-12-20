import { ChatroomService } from './../chatroom/chatroom.service';
import { Component, OnInit } from '@angular/core';
import { IRooms } from '../chatroom/message.interface';
import { ChatroomComponent } from '../chatroom/chatroom.component';

@Component({
    selector: 'app-roomlist',
    templateUrl: './roomlist.component.html',
    styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {

    rooms:IRooms[] = [];

    constructor(private chServ: ChatroomService, private chatCom: ChatroomComponent) { }

    ngOnInit(): void {
        this.getAllRooms();
    }

    joinToTheRoom(name:string, roomId:string){
        console.log(roomId);
        //console.log(`join to the ${name} with id: ${roomId}`);
        this.chServ.activeRoom = roomId;
        this.chServ.joinTheRoom(name,roomId);

        // .subscribe((message: any) =>{
        //     console.log(message);
        //     this.chatCom.messageList.push(message);
        //     this.chServ.activeRoom = roomId;
        // });
    }

    getAllRooms(){
        this.chServ.getRooms().subscribe(
            res => {
                this.rooms = res;
            }
        );
    }
}
