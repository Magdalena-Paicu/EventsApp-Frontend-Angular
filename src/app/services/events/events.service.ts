import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '@angular/router';
import { Card } from 'src/app/interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseApiUrl + '/api/Events');
  }

  getEventById(idEvent: string): Observable<Card> {
    return this.http.get<Card>(this.baseApiUrl + '/api/Events/' + idEvent);
  }
}
