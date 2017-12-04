import { Component, OnInit } from '@angular/core';
import { NatureService } from '../shared/service/nature.service';
import { Nature } from '../shared/domain/nature';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-tableau-natures',
  templateUrl: './tableau-natures.component.html',
  styleUrls: ['./tableau-natures.component.css']
})
export class TableauNaturesComponent implements OnInit {

  /* Role  */
  item: String = 'admin';
  public nature: Nature[] = [];
  public suppression: Boolean;
  public natureASupprimer: Nature;
  public natureAmodifier: Nature;
  public facture: any[] = [{ display: 'Oui/Non', value: null }, { display: 'Oui', value: true }, { display: 'Non', value: false }];
  public versementPrime: any[] = [{ display: 'Oui/Non', value: null }, { display: 'Oui', value: true }, { display: 'Non', value: false }];
  private boulet = true;


  displayedFactureNature(): any {
    if (this.natureAmodifier == null) {
      return { display: 'Oui/Non', value: null };
    }
    if (this.natureAmodifier.facturee) {
      return { display: 'Oui', value: true };
    }
    return { display: 'Non', value: false };
  }

  displayedVersementPrime(): any {
    if (this.natureAmodifier == null) {
      return { display: 'Oui/Non', value: null };
    }
    if (this.natureAmodifier.versementPrime) {
      return { display: 'Oui', value: true };
    }
    return { display: 'Non', value: false };
  }



  /* variable pour la modal */
  closeResult: string;

  // ng alert
  private _success = new Subject<string>();
  private _alert = new Subject<string>();
  private natuForm: FormGroup;
  staticAlertClosed = false;
  /* Paramètre success */
  successMessage: string;

  /* Paramètre Alert */
  alertMessage: string;

  public get natureForm() { return this.natuForm.get('natureForm') }
  public get factureForm() { return this.natuForm.get('factureForm') }
  public get TJMForm() { return this.natuForm.get('TJMForm') }
  public get versementForm() { return this.natuForm.get('versementForm') }
  public get primeForm() { return this.natuForm.get('primeForm') }

  constructor(private natureService: NatureService, private modalService: NgbModal, private fb: FormBuilder, public auth: AuthService) {
    this.natuForm = this.fb.group({
      natureForm: '',
      factureForm: false,
      TJMForm: 0,
      versementForm: false,
      primeForm: 0
    });
  }


  ngOnInit() {
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
    return item1.display === item2.display;
  }

  /* Modification */
  openModif(contentUpdate, nature: Nature) {
    this.natureAmodifier = nature;
    this.natuForm.patchValue({
      natureForm: this.natureAmodifier.nom,
      factureForm: this.displayedFactureNature(),
      TJMForm: this.natureAmodifier.tauxJournalierMoyen,
      versementForm: this.displayedVersementPrime(),
      primeForm: this.natureAmodifier.pourcentagePrime
    });
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
    if ($event.target.value !== '') {
      this.tauxE = $event.target.value;
      console.log(this.tauxE);
    }
  }

  /* Récupère les valeurs dans le champs input */
  primeE: string;
  setPrime($event) {

    if ($event.target.value !== '' || $event.target.value <= 10) {
      this.primeE = $event.target.value;
    }
  }

  /* Méthode Sauvegarder */
  sauvegarder(nom: HTMLInputElement, facture: HTMLInputElement, versement: HTMLInputElement) {
    let fact;
    fact = facture.value;

    let vers;
    vers = versement.value;

    const dateNow = new Date();
    dateNow.toLocaleDateString();

    if (nom.value === '') {
      this._alert.next(` Le champs nom est vide`);
      this.boulet = false;
    }

    if (nom.value !== '' && fact === 'false' && vers === 'false') {
      const nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, parseFloat(this.tauxE), parseFloat(this.primeE));
      /* let nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, null, null); */
      console.log('1er if ajout')
      this.natureService.sauvegarder(nature)
        .subscribe(nat => {
          this._success.next(`La nouvelle nature ${nom.value} a été ajouté avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })

          this.tauxE = '';
          this.primeE = '';
        }, exception => {
          console.log(exception);
          if (parseFloat(this.primeE) > 10) {
            this._alert.next(` La prime est supérieur au maximum légal exigé (10 % maximum).`);
          }
          if (nom.value === nom.value) {
            this._alert.next(`Vous ne pouvez pas inséré deux fois le même nom de nature`);
          }

        });
    }

    if (nom.value !== '' && fact === 'true' && vers === 'false' && this.tauxE !== '') {
      const nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, parseFloat(this.tauxE), parseFloat(this.primeE));
      /* let nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, null, null); */
      console.log('2eme if ajout')
      console.log(nature)
      this.natureService.sauvegarder(nature)
        .subscribe(nat => {
          this._success.next(`La nouvelle nature a été ajouté avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })

          this.tauxE = '';
          this.primeE = '';
        }, exception => {
          console.log(exception);
          if (parseFloat(this.primeE) > 10) {
            this._alert.next(` La prime est supérieur au maximum légal exigé (10 % maximum).`);
          }
        });
    }

    if (nom.value !== '' && fact === 'true' && parseFloat(this.tauxE) !== null && vers === 'true' && parseFloat(this.primeE) !== null) {
      const nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, parseFloat(this.tauxE), parseFloat(this.primeE));
      /* let nature: Nature = new Nature(0, nom.value, dateNow, null, fact, vers, null, null); */
      console.log('2eme if ajout')
      this.natureService.sauvegarder(nature)
        .subscribe(nat => {
          this._success.next(`La nouvelle nature a été ajouté avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })

          this.tauxE = '';
          this.primeE = '';
        }, exception => {
          console.log(exception);
          if (parseFloat(this.primeE) > 10) {
            this._alert.next(` La prime est supérieur au maximum légal exigé (10 % maximum).`);
          }
        });
    }
  }


  modifier(id: number) {

    if (this.natureForm.value === '') {
      this._alert.next(`Le champs nom est vide`);
      this.boulet = false;
    }

    if (this.factureForm.value.value === true && this.versementForm.value.value === false && this.TJMForm.value === null && this.primeForm.value === null) {
      this._alert.next(` Le champ taux journalier moyen est vide.`);
      this.boulet = false;
    }
    if (this.factureForm.value.value === false && this.versementForm.value.value === true && this.TJMForm.value === null && this.primeForm.value === null) {
      this._alert.next(` Le champ pourcentage prime est vide.`);
      this.boulet = false;
    }
    if (this.factureForm.value.value === true && this.versementForm.value.value === true && this.TJMForm.value === '' && this.primeForm.value === '') {
      this._alert.next(`Le champs taux journalier moyen & pourcentage prime sont vides`);
      this.boulet = false;
    }
    if (this.factureForm.value.value === true && this.versementForm.value.value === true && this.TJMForm.value === '') {
      this._alert.next(`Il est impossible d'avoir un taux journalier vide`);
      this.boulet = false;
    }
    if ((this.versementForm.value.value === true && this.primeForm.value > 10)) {
      this._alert.next(` La prime est supérieur au maximum légal exigé (10 % maximum) ou elle est vide`);
      this.boulet = false;
    }
    if ((this.versementForm.value.value === true && this.primeForm.value === '')) {
      this._alert.next(` La prime est vide veuillez la renseigner`);
      this.boulet = false;
    }

    if ((this.factureForm.value.value === false && this.versementForm.value.value === false && this.TJMForm.value === '' && this.primeForm.value === '') || (this.factureForm.value.value === false && this.versementForm.value.value === false)) {
      const nature = new Nature(id, this.natureForm.value, this.natureAmodifier.dateDebutValidite, this.natureAmodifier.dateFinValidite,
        this.factureForm.value.value, this.versementForm.value.value, null, null);
      console.log('1er if modification')
      this.natureService.modifierNature(nature)
        .subscribe(natUpd => {
          this._success.next(`La nature ${this.natureForm.value} a été modifié avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
        }, exception => {
          console.log(exception);
          this._alert.next(exception);
        });
    }

    if (this.factureForm.value.value === true && this.versementForm.value.value === true && this.TJMForm.value !== '' && this.primeForm.value !== '' && this.primeForm.value <= 10) {
      const nature = new Nature(id, this.natureForm.value, this.natureAmodifier.dateDebutValidite, this.natureAmodifier.dateFinValidite,
        this.factureForm.value.value, this.versementForm.value.value, this.TJMForm.value, this.primeForm.value);


      console.log('2er if modification')
      this.natureService.modifierNature(nature)
        .subscribe(natUpd => {
          this._success.next(`La nature ${this.natureForm.value} a été modifié avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
        }, exception => {
          console.log(exception);
          this._alert.next(exception);
        });
    }

    if (this.factureForm.value.value === true && this.versementForm.value.value === false && this.TJMForm.value !== '') {
      const nature = new Nature(id, this.natureForm.value, this.natureAmodifier.dateDebutValidite, this.natureAmodifier.dateFinValidite,
        this.factureForm.value.value, this.versementForm.value.value, this.TJMForm.value, null);


      console.log('3er if modification')
      this.natureService.modifierNature(nature)
        .subscribe(natUpd => {
          this._success.next(`La nature ${this.natureForm.value} a été modifié avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
        }, exception => {
          console.log(exception);
          this._alert.next('Il est impossible de passer une ou plusieurs lettre dans le champs');
        });
    }
    if (this.factureForm.value.value === false && this.versementForm.value.value === true && this.primeForm.value !== '' && this.primeForm.value <= 10) {
      const nature = new Nature(id, this.natureForm.value, this.natureAmodifier.dateDebutValidite, this.natureAmodifier.dateFinValidite,
        this.factureForm.value.value, this.versementForm.value.value, null, this.primeForm.value);


      console.log('4er if modification')
      this.natureService.modifierNature(nature)
        .subscribe(natUpd => {
          this._success.next(`La nature ${this.natureForm.value} a été modifié avec succès`);
          this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
        }, exception => {
          console.log(exception);
          this._alert.next('Il est impossible de passer une ou plusieurs lettre dans le champs');
        });
    }

  }
}
