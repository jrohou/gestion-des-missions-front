import { Nature } from './nature'
import { Transport } from './transport';

export class Mission {

    constructor(public id: number, public dateDebut: Date, public dateFin: Date, public nature: Nature, public villeDepart: string, public villeArrivee: String, public transport: Transport, public montantPrime: number, public statut: string) {
    }
}
