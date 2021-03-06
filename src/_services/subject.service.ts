import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor() { }

  private subject = new Subject<any>();
  sendClickEvent() { //supscribe
    this.subject.next();    //point to the last event, has been pointed
  }
  getClickEvent(): Observable<any> { //return event
    return this.subject.asObservable(); //get the last event
  }
}
