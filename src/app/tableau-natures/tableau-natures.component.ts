import { Component, OnInit } from '@angular/core';
import { NatureService } from '../shared/service/nature.service';
import { Nature } from '../shared/domain/nature';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  selector: 'app-tableau-natures',
  templateUrl: './tableau-natures.component.html',
  styleUrls: ['./tableau-natures.component.css']
})
export class TableauNaturesComponent implements OnInit {

  /* Role  */
  item: String = "admin"
  public nature: Nature[] = [];
  public suppression: Boolean;
  public natureASupprimer: Nature;
  public natureAmodifier: Nature;

  displayedFactureNature(): any {
    if (this.natureAmodifier == null) {
      return { display: 'Oui/Non', value: null }
    }
    if (this.natureAmodifier.facturee) {
      return { display: 'Oui', value: true }
    }
    return { display: 'Non', value: false }
  }

  public facture: any[] = [{ display: 'Oui/Non', value: null }, { display: 'Oui', value: true }, { display: 'Non', value: false }];

  /* variable pour la modal */
  closeResult: string;

  //ng alert
  private _success = new Subject<string>();
  private _alert = new Subject<string>();

  staticAlertClosed = false;
  /* Paramètre success */
  successMessage: string;

  /* Paramètre Alert */
  alertMessage: string;

  constructor(private natureService: NatureService, private modalService: NgbModal, private fb:FormBuilder) { }

  ngOnInit() {
    this.fb.group({
      natureForm : '',
      factureForm : null,
      TJMForm : 0,
      versementForm : null,
      primeForm : 0
    })
    this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })

    setTimeout(() => this.staticAlertClosed = true, 20000);

    /* OK */
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);

    /* Alert */
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
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

  byDisplay(item1: any, item2: any): boolean {
    return item1.display == item2.display
  }

  /* Modification */
  openModif(contentUpdate, nature: Nature) {
    this.natureAmodifier = nature;


    this.modalService.open(contentUpdate).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /* Ajout */
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
      return `with: ${reason}`;
    }
  }
  /* Modal */

  /* Récupère les valeurs dans le champs input */
  tauxE: string;
  setTjm($event) {
    if ($event.target.value != '') {
      this.tauxE = $event.target.value;
    }
  }

  /* Récupère les valeurs dans le champs input */
  primeE: string;
  setPrime($event) {

    if ($event.target.value != '' || $event.target.value <= 10) {
      this.primeE = $event.target.value;
    }
  }

  /* Méthode Sauvegarder */
  sauvegarder(nom: HTMLInputElement, facture: HTMLInputElement, versement: HTMLInputElement) {

    let boulet: boolean = true;

    let fact;
    fact = facture.value;

    let vers;
    vers = versement.value;

    let dateNow = new Date();
    dateNow.toLocaleDateString();

    if (boulet == true) {
      if (nom.value === '') {
        this._alert.next(`${new Date()} - Le champs nom est vide`);
        boulet = false;
      }
      else {
        let nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, parseFloat(this.tauxE), parseFloat(this.primeE));
        /* let nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, null, null); */
        console.log(nature);
        this.natureService.sauvegarder(nature)
          .subscribe(nat => {
            this._success.next(`La nouvelle nature ${nom.value} a été ajouté avec succès`);
            this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })

            this.tauxE = '';
            this.primeE = '';
          }, exception => {
            console.log(exception);
            this._alert.next(`${new Date()} - Le nom existe déjà.`);
          });
      }
    }

  }


  modifier(id: number) {
    this.natureService.modifierNature(id);
  }


  /* supprimer(id: number) {
    this.natureService.supprimerNature(id);
    this.suppression = false;
  } */
  /* -- Ne peux supprimer une nature si elle est toujours associé à une mission --  */

}
