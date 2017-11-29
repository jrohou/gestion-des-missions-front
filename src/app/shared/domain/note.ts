import { Mission } from './mission'
import { NatureNote} from './nature-note'
export class Note {

    constructor(public id:number, public date:Date, public nature:NatureNote, public montant:number, public mission:Mission ) {

    }
}
