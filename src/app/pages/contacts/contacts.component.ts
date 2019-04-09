import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  private contacts: Array<object>;
  private ajoutForm: FormGroup;

  constructor(private http: HttpClient) {
    this.getContacts();
    // this.addContact();

    this.ajoutForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required])
    });
  }

  private getContacts(): void {
    this.http.get('http://localhost:3000/api/contacts').subscribe(
      (contacts: Array<object>) => {
        this.contacts = contacts;
      }
    );
  }

  private addContact(): void {
    const data = {
      firstName: 'Geoffrey',
      lastName: 'SOulauqes',
      phoneNumber: '8769790',
      email: 'iqshdq@sd.Fr'
    };

    this.http.post<any>('http://localhost:3000/api/contacts', data).subscribe(
      response => {     
        console.log(response)
      }
    );
  }

  private editContact(position: number): void {
    $('#modifModal').modal('show');
    this.ajoutForm.controls.firstName.setValue(this.contacts[position]['firstName']);
    this.ajoutForm.controls.lastName.setValue(this.contacts[position]['lastName']);
    this.ajoutForm.controls.phoneNumber.setValue(this.contacts[position]['phoneNumber']);
    this.ajoutForm.controls.mail.setValue(this.contacts[position]['mail']);
  }

}
