let USER="USER"
export const setStor=(user)=>{
    localStorage.setItem(USER,JSON.stringify(user))
}
export const getStor=()=>{
    return JSON.parse(localStorage.getItem(USER))||{}
}
export const removeStore=()=>{
    localStorage.removeItem(USER)
}