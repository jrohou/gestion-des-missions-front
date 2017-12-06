import { Component, OnInit } from '@angular/core';
import { NatureService } from '../shared/service/nature.service';
import { Nature } from '../shared/domain/nature';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { FormBuilder } from '@angular/forms';
import { FormGroup, AbstractControl } from '@angular/forms/src/model';
import { AuthService } from '../shared/service/auth.service';
import { ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MissionService } from '../shared/service/mission.service';
import { Mission } from '../shared/domain/mission';
import { isObservable } from '@angular/core/src/util/lang';
import * as sha1 from 'sha1';

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
  private miss: Mission;
  private mission: Mission[];

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
  private natuGroupForm: FormGroup;


  /* Paramètre success */
  successMessage: string;

  /* Paramètre Alert */
  alertMessage: string;
  staticAlertClosed = false;


  deletable: boolean

  public get natureForm() { return this.natuGroupForm.get('natureForm') }
  public get factureForm() { return this.natuGroupForm.get('factureForm') }
  public get TJMForm() { return this.natuGroupForm.get('TJMForm') }
  public get versementForm() { return this.natuGroupForm.get('versementForm') }
  public get primeForm() { return this.natuGroupForm.get('primeForm') }

  constructor(private natureService: NatureService, private modalService: NgbModal, private fb: FormBuilder, public auth: AuthService, private missionService: MissionService) {
    this.natuGroupForm = this.fb.group({
      natureForm: ['', [this.natureUniqueValidator(), Validators.required]],
      factureForm: false,
      TJMForm: null,
      versementForm: false,
      primeForm: null
    }, { validator: Validators.compose([this.tauxJournalierValidator('factureForm', 'TJMForm'), this.pourcentagePrimeValidator('versementForm', 'primeForm')]) });
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
    this.natureService.naturePeutEtreSupprimee(nature.id).subscribe(bool => {
      this.deletable = bool;
      console.log(this.deletable)
      this.modalService.open(contentSup).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })

  }

  byDisplay(item1: any, item2: any): boolean {
    return item1.display === item2.display;
  }

  /* Modification */
  openModif(contentUpdate, nature: Nature) {
    this.natureAmodifier = nature;
    this.natuGroupForm.patchValue({
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
    this.resetForm();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.resetForm();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /* Modal */

  /* ResetForm */
  resetForm(): void {
    this.natureAmodifier = null;
    this.natuGroupForm.reset({
      natureForm: '',
      factureForm: { display: 'Oui/Non', value: null },
      TJMForm: null,
      versementForm: { display: 'Oui/Non', value: null },
      primeForm: null
    })
  }

  /* SauvegarderOuModifier */
  sauvegarderOuModifer() {
    let id: number;
    let nom: string;
    let dd: Date = new Date();

    if (this.natureAmodifier === null) {
      id = 0;
    }
    else {
      id    = this.natureAmodifier.id;
      dd    = this.natureAmodifier.dateDebutValidite;
    }

    let tjm: number;
    if (this.factureForm.value.value === false) {
      tjm = null
    }
    else {
      tjm = this.TJMForm.value
    }

    let prime: number;
    if (this.versementForm.value.value === false) {
      prime = null;
    }
    else {
      prime = this.primeForm.value;
    }

    const nature = new Nature(id, this.natureForm.value, dd, null,
      this.factureForm.value.value, this.versementForm.value.value, tjm, prime);
    console.log(nature)
    this.natureService.modifierNature(nature)
      .subscribe(natUpd => {
        this._success.next(`La nature ${this.natureForm.value} a été ajouté avec succès`);
        this.natureService.listerNature().subscribe(listeNature => { this.nature = listeNature; })
      }, exception => {
        console.log(exception);
        this._alert.next(exception);
      });
  }

  supprimer(id: number) {
    this.natureService.supprimerNature(id)
  }

  /* Validator */
  natureUniqueValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let success: boolean = true
      this.nature.forEach(nat => {
        if ((nat.nom.toLowerCase() === control.value.toLowerCase()) || (nat.nom.toUpperCase() === control.value.toUpperCase())) {
          if (this.natureAmodifier === null) {
            success = false
          }
        }
      })
      return success ? null : { 'natureUniqueValidator': { value: 'Une nature de même nom existe déjà' } };
    };
  }

  tauxJournalierValidator(factureFormString: string, TJMFormString: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      let success: boolean = true
      let alert: string;
      if ((group.controls[factureFormString].value.value === true && group.controls[TJMFormString].value === null) || (group.controls[factureFormString].value.value === true && group.controls[TJMFormString].value === '')) {
        success = false
        alert = 'Le taux doit être déclaré';
      }

      if (group.controls[factureFormString].value.value === true && group.controls[TJMFormString].value < 0) {
        success = false
        alert = 'Le taux doit être positif'
      }
      return success ? null : { 'tauxJournalierValidator': { value: alert } };
    };
  }

  pourcentagePrimeValidator(versPrimeFormString: string, primeFormString: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      let success: boolean = true
      let alert: string;
      if ((group.controls[versPrimeFormString].value.value === true && group.controls[primeFormString].value === null) || (group.controls[versPrimeFormString].value.value === true && group.controls[primeFormString].value === '')) {
        success = false
        alert = 'Le pourcentage de la prime doit être déclaré';
      }

      if ((group.controls[versPrimeFormString].value.value === true && group.controls[primeFormString].value > 10) || (group.controls[versPrimeFormString].value.value === true && group.controls[primeFormString].value < 0)) {
        success = false
        alert = 'Le pourcentage prime doit être entre 0% et 10%'
      }
      return success ? null : { 'pourcentagePrimeValidator': { value: alert } };
    };
    /* -- Ne peux supprimer une nature si elle est toujours associé à une mission --  */
  }

  checkAdmin(): boolean {
    return this.auth.role == sha1('admin')
  }
}
