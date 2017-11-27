import {Nature} from './nature'

export class Mission {
    id:number

    constructor(public dateDebut:Date, public dateFin:Date, public nature:Nature, public villeDepart:string, public villeArrivee:String, public transport:string, public montantPrime:number, public statut:string){

    }
}
