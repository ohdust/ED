/* eslint-disable camelcase */
export interface IMessage{
  login:string;
  userId: string;
  name: string;
  message:string;
  messages:string[];
  date: Date;
  messageid: string
}

export interface IRooms{
  room_id: string;
  name: string;
  messages:string;
  closed: boolean;
  creater_id:string;
  mescount:string;
}

export interface IUserData{
    user:string | null;
    userid: string;
}

export interface IRoom{
  roomName: string;
  userId:string;
}

