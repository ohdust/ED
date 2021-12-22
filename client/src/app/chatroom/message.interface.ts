/* eslint-disable camelcase */
export interface IMessage{
  login:string;
  userId: string;
  name: string;
  message:string;
  messages:string[];
  date: Date;
}

export interface IRooms{
  room_id: string;
  name: string;
  messages:string;
  closed: boolean;
  createrid:string;
}

export interface IUserData{
    user:string | null;
    userid: string;
}

export interface IRoom{
  roomName: string;
  userId:string;
}

