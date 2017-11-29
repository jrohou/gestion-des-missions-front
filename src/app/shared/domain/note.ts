import { Mission } from './mission'
export class Note {

    constructor(public id:number, public date:Date, public nature:string, public mission:Mission ) {

    }
}
