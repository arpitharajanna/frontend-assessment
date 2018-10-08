import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Contact} from '../contact';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  loader: boolean;
  contacts: Contact [] = [];

  constructor(private fb: FormBuilder,private contactService: ContactService) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
      this.contactForm = this.fb.group({
       
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required]
      });
    }

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

}
