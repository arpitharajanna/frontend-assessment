import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Contact} from './contact';
// import { CONTACTS } from './example-data';
import { ContactService } from './contact.service';
// import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts';
  // contacts: Contact [] = [];
  // contacts=CONTACTS;
  selectedContact: Contact;
  contactForm: FormGroup;
  loader: boolean;
  showform:false;
  contacts: Contact [] = [];

  constructor(private fb:FormBuilder,private contactService: ContactService) { }

 ngOnInit(){
  this.getContacts();
  this.createForm();
}
// this is used to display the seletecd contact
onSelect(contact: Contact): void {
  this.selectedContact = contact;
 
  document.getElementById("div1").style.display='none';
  document.getElementById("div2").style.display="block";
}
//this function is used to render the list of contacts
getContacts(): void {
  this.contactService.getContacts()
        .subscribe(contacts => this.contacts = contacts);
         
}
//this funtion is used to delete the selected contact
delete(contact: Contact): void {
  this.contacts = this.contacts.filter(h => h !== contact);
  this.contactService.deleteHero(contact).subscribe();

}
//this is a reactive form builder which gets the values of the form
private createForm() {
  this.contactForm = this.fb.group({
   
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required]
  });
}

//on submit of the form this will push the new contact to the contacts list and displays in the table
onSubmit() {
   const contact= this.contactForm.value;
   
  this.contactService.create(contact)
  
    .subscribe((contact:Contact) => {
      this.contacts.push(contact);
       this.loader = false;
      this.contactForm.reset({position: ''});
    },
      (error) => {
        console.error(error);
        this.loader = false;
      });
      console.log(this.contacts)
    
}

 showForm(){
  
       document.getElementById("div1").style.display='block';
       document.getElementById("div2").style.display='none'
       
       
     }
     
   
   
 

 }
 

