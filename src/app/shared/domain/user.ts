export class User {
    constructor(public matricule:string, public nom:string, public prenom:string, public email:string, public dateNaissance:Date, public sexe:string, public adresse:string, public password:string, public photo:string, public subalternes:string[], public departement:string){

    }
}
