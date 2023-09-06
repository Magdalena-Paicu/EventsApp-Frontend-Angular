import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from 'src/app/interfaces/card';
import { ImagesService } from '../images/images.service';
import { switchMap, map, take, takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  baseApiUrl: string = environment.baseApiUrl;
  sanitizer: any;

  constructor(
    private http: HttpClient,
    private imageUpload: ImagesService,
    sanitizer: DomSanitizer
  ) {
    this.sanitizer = sanitizer;
  }
  getAllEventsWithImages(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseApiUrl + '/api/Events').pipe(
      //pana aici se obtine lista de evenimente
      // dupa pipe incep sa se aplice operatori
      switchMap((events: Card[]) => {
        // primeste lista de evenimente din observabilul de mai sus si face un alt observable
        const imageRequests = events.map((event: Card) =>
          this.imageUpload.getImagebyName(event.imageUrl).pipe(
            map((blob: Blob) => {
              const objectUrl = URL.createObjectURL(blob);
              event.imgSrc = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
              return event;
            })
          )
        );
        return forkJoin(imageRequests);
      })
    );
  }

  getEventById(idEvent: string): Observable<Card> {
    return this.http.get<Card>(this.baseApiUrl + '/api/Events/' + idEvent);
  }

  searchFreeEvents(free: boolean): Observable<Card[]> {
    return this.http.get<Card[]>(
      this.baseApiUrl + '/api/Search/searchIsFree?isFree=' + free
    );
  }

  searchWithTicketEvents(withTicket: boolean): Observable<Card[]> {
    return this.http.get<Card[]>(
      `${this.baseApiUrl}/api/Search/searchWithTicket?withTicket=${withTicket}`
    );
  }

  searchEventsByTitle(title: string): Observable<Card[]> {
    return this.http.get<Card[]>(
      `${this.baseApiUrl}/api/Search/searchByTitle?title=${title}`
    );
  }
}
