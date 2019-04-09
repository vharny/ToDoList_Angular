import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent {

  private modeEdit: boolean = false;
  private position: number;
  private modeFinish: boolean = false;

  private taches: Array<object> = [
    { titre: 'Boowling', description: 'Allez faire un boowlming avec Walter', dateHeureDebut: '2019-04-11T19:00', dateHeureFin: '2019-04-11T22:00' },
    { titre: 'Boire un verre', description: 'Boire un verre dans avec Donny', dateHeureDebut: '2019-04-11T23:00', dateHeureFin: '2019-04-12T03:00' },
    { titre: 'Se reposer', description: 'Se reposer de la soirée de la veille', dateHeureDebut: '2019-04-12T04:00', dateHeureFin: '2019-05-12T15:00' },
    { titre: 'Déjeuner', description: 'Prendre un petit Déjeuner', dateHeureDebut: '2019-05-12T16:00', dateHeureFin: '2019-05-12T16:30' },
    { titre: 'Boowling', description: 'Retourner au boowling avec Walter et Dony', dateHeureDebut: '2019-05-14T16:00', dateHeureFin: '2019-05-14T19:15' },
    { titre: 'Retrouver son homonyme', description: 'Se rendre chez son homonyme', dateHeureDebut: '2019-05-21T16:00', dateHeureFin: '2019-05-26T19:15' },
    { titre: 'Récuperer le million', description: 'Récuperer le million que mon père à détourner', dateHeureDebut: '2019-10-01T12:00', dateHeureFin: '2019-12-21T14:00' },
    { titre: 'Secourir sa femme', description: 'Il faut sécourir ma femme Buny', dateHeureDebut: '2019-06-30T16:00', dateHeureFin: '2019-07-21T19:15' },
    { titre: 'Retrouver la malette', description: 'retrouvez ma malette remplis d\'argent', dateHeureDebut: '2020-05-01T12:00', dateHeureFin: '2020-09-21T18:00' },
    { titre: 'Boowling', description: 'Faire de nouveau un boowling', dateHeureDebut: '2020-10-01T12:00', dateHeureFin: '2020-10-21T18:00' },
    { titre: 'Disperser les cendres', description: 'Dispercé les cendres de DOny sur une falaise au bord de l\'océan', dateHeureDebut: '2022-02-01T12:00', dateHeureFin: '2022-02-21T12:15' },
    { titre: 'Boowling ', description: 'Faire un boowling avec Walter', dateHeureDebut: '2022-02-01T13:00', dateHeureFin: '2022-02-21T15:45' },
    { titre: 'Soirée', description: 'Boire un coup avec Walter', dateHeureDebut: '2022-02-21T17:00', dateHeureFin: '2022-02-21T23:45' }
  ];

  private ajoutForm: FormGroup;

  constructor() {
    this.ajoutForm = new FormGroup({
      titre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(200)]),
      dateHeureDebut: new FormControl('', [Validators.required, Validators.minLength(4)]),
      dateHeureFin: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  addSubmit():void {
    this.taches.push({
      titre: this.ajoutForm.controls.titre.value,
      description: this.ajoutForm.controls.description.value,
      dateHeureDebut: this.ajoutForm.controls.dateHeureDebut.value,
      dateHeureFin: this.ajoutForm.controls.dateHeureFin.value
    });
    $('#ajoutModal').modal('hide');
    console.log(this.taches);
  }

  editSubmit():void {
    this.taches.splice(this.position, 1, {
      titre: this.ajoutForm.controls.titre.value,
      description: this.ajoutForm.controls.description.value,
      dateHeureDebut: this.ajoutForm.controls.dateHeureDebut.value,
      dateHeureFin: this.ajoutForm.controls.dateHeureFin.value
    });
    $('#ajoutModal').modal('hide'); 
  }

  removeSubmit():void {
    this.taches.splice(this.position, 1);
    $('#removeModal').modal('hide');
  }

  add(): void {
    this.modeEdit = false;
    $('#ajoutModal').modal('show');
  }

  editMode(position: number): void {
    this.modeEdit = true;
    this.position = position;
    $('#ajoutModal').modal('show');
    this.ajoutForm.controls.titre.setValue(this.taches[position]['titre']);
    this.ajoutForm.controls.description.setValue(this.taches[position]['description']);
    this.ajoutForm.controls.dateHeureDebut.setValue(this.taches[position]['dateHeureDebut']);
    this.ajoutForm.controls.dateHeureFin.setValue(this.taches[position]['dateHeureFin']);
  }

  remove(position: number): void {
    this.position = position;
    this.modeFinish = false;
    $('#removeModal').modal('show');
  }

  sort(type: string): void {
    switch (type) {
      case 'plus':
        this.taches.sort(function(a, b) {
          a = new Date(a['dateHeureDebut']);
          b = new Date(b['dateHeureDebut']);
          return a>b ? -1 : a<b ? 1 : 0;
        });
        break;
      case 'moins':
        this.taches.sort(function(a, b) {
          a = new Date(a['dateHeureDebut']);
          b = new Date(b['dateHeureDebut']);
          return b>a ? -1 : b<a ? 1 : 0;
        });
        break;
    }
  }
}
