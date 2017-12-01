import { Component, OnInit } from '@angular/core';
import { NatureService } from '../shared/service/nature.service';
import { Nature } from '../shared/domain/nature';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-tableau-natures',
  templateUrl: './tableau-natures.component.html',
  styleUrls: ['./tableau-natures.component.css']
})
export class TableauNaturesComponent implements OnInit {

  /* Role  */
  public nature: Nature[] = [];
  public suppression: Boolean;
  public natureASupprimer: Nature;

  closeResult: string;

  constructor(private natureService: NatureService, private modalService: NgbModal, public auth:AuthService) { }

  ngOnInit() {
    this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
  }
  
  /* Modal */
  openSupprimer(contentSup, nature: Nature) {
    this.natureASupprimer = nature;
    this.modalService.open(contentSup).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 
  }
  
  openAjout(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 

    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  /* Modal */

  /* Sauvegarder */
  sauvegarder(nom: HTMLInputElement, facture: HTMLInputElement, versement: HTMLInputElement): void {

    let fact;
    fact = facture.value;

    let vers;
    vers = versement.value;

    if(vers === true){
      vers = 1;
    }
    else if(vers === false){
      vers = 0;
    }
    else if(fact === true){
      fact = 1;
    }
    else if(fact === false){
      fact = 0;
    }

    let nature: Nature = new Nature(0, nom.value, null, null, fact, vers, null, null);
    
    this.natureService.sauvegarder(nature)
  }

  /* -- Ne peux supprimer une nature si elle est toujours associé à une mission --  */
  validerSuppression(nature: Nature) {
    /* this.suppression = true;
    this.natureASupprimer = nature; */
    return false;
  }

  supprimer(id: number) {
    this.natureService.supprimerNature(id);
    this.suppression = false;
  }
  /* -- Ne peux supprimer une nature si elle est toujours associé à une mission --  */

}
