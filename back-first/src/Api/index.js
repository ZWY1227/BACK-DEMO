import ajax from "./ajax"
export const reqlogin=(username,password)=>ajax("/login",{username,password},"POST")