import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card';
import { UploadFile } from 'src/app/interfaces/upload-file';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { CardsService } from 'src/app/services/cards/cards.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { ImagesService } from 'src/app/services/images/images.service';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-event-cards',
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.scss'],
})
export class EventCardsComponent implements OnChanges, OnInit {
  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private navbarService: NavbarService,
    private cardsServices: CardsService,
    private imageUpload: ImagesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private eventService: EventsService
  ) {
    this.subscriptionFavorite =
      this.navbarService.isFavoriteClickedObservable.subscribe(
        (clicked: boolean) => {
          this.isFavoriteClicked = clicked;
        }
      );
  }

  isFavorite: boolean = false;
  isConfirmed: boolean = false;
  isAdmin: boolean = false;
  isFavoriteClicked: boolean = false;
  isHomeClicked: boolean = false;
  @Input() selectedCards: string = 'my-events';
  searchEventsCards: any[] = [];
  noEventsYet: string = 'No Event Yet';
  noEventsYetText: string =
    'Click the " + Add New Event" button to add some events, and you\'ll see the events here next time you visit this page.';
  needToLogin: string = 'Need to Login';
  needToLoginText: string =
    'To add events to your favorites list,please log in to your account, or create one.';
  private subscriptionFavorite: Subscription;
  images: UploadFile[];
  imgSrc: SafeUrl;
  mostPopular: Card[];
  eventsAll: Card[];
  myEvents: Card[] = this.cardsServices.getMyCards();

  ngOnDestroy() {
    this.subscriptionFavorite.unsubscribe();
  }

  ngOnChanges() {
    if (this.selectedCards === 'all-events') {
      this.searchEventsCards = this.eventsAll;
    } else {
      this.searchEventsCards = this.myEvents;
    }
  }

  hasPassed(event: any): boolean {
    const eventData = new Date(event.endDateTime);
    const currentData = new Date();
    return eventData < currentData;
  }

  openModal() {
    this.dialogService.openPleaseLoginDialog();
  }

  openDeleteModal() {
    this.dialogService.openDeletingEventDialog();
  }

  addToFavorite(event: any) {
    event.isFavorite = !event.isFavorite;
  }

  favoriteEvents: Card[] = this.cardsServices
    .getCards()
    .filter((card) => card.isFavorite === true && !this.hasPassed(card));

  loadImages() {
    this.imageUpload.getAllImages().subscribe((data) => {
      this.images = data;
      console.log(this.images);
    });
  }

  navigateToEventDetail(eventId: number) {
    this.router.navigate(['event-details/', eventId]);
  }

  ngOnInit(): void {
    this.eventService.getAllEventsWithImages().subscribe((events) => {
      this.eventsAll = events;
      this.mostPopular = events;
    });

    this.selectedCards = 'all-events';
    this.isConfirmed = this.authService.isConfirm;
    this.isAdmin = this.authService.isAdmin;
  }
}
