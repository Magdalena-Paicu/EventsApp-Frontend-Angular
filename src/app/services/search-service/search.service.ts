import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  private searchSubjectByTitle = new Subject<string>();
  public searchSubjectByTitle$ = this.searchSubjectByTitle.asObservable();

  private searchSubjectFreeEvents = new Subject<boolean>();
  public searchSubjectFreeEvents$ = this.searchSubjectFreeEvents.asObservable();

  private searchSubjectWithTicketEvents = new Subject<boolean>();
  public searchSubjectWithTicketEvents$ =
    this.searchSubjectWithTicketEvents.asObservable();

  searchEventByTitle(title: string) {
    this.searchSubjectByTitle.next(title);
  }
  searchFreeEvents(free: boolean) {
    this.searchSubjectFreeEvents.next(free);
  }
  searchEventsWithTicket(withTicket: boolean) {
    this.searchSubjectWithTicketEvents.next(withTicket);
  }
}
