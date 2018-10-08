import { Injectable } from '@angular/core';
import {Contact} from './contact';
import { CONTACTS } from './example-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = 'api/contacts'

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getContacts():Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
    
  }
  create(contact:Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact)
    // .pipe(
    //   tap((param: Contact) => this.log('added contact w/ id=${contact.id}')),
    //   catchError(this.handleError<Contact>('create'))
    // );
  }

  deleteHero (contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;

    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteHero'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }

}
