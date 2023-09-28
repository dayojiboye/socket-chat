import { io } from "socket.io-client";
const socket = io("http://172.20.10.3:4000");
export default socket;
