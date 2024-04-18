export interface User {
    id:number,
    user_name:string,
    rol_id:number,
    name:string,
    pwd:string,
    birthDate?:Date,
    phone?:string,
    state?:boolean
}