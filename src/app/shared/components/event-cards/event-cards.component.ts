import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card';
import { UploadFile } from 'src/app/interfaces/upload-file';
import { CardsService } from 'src/app/services/cards/cards.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { SearchService } from 'src/app/services/search-service/search.service';
import { UsersService } from 'src/app/services/users/users.service';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';

@Component({
  selector: 'app-event-cards',
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.scss'],
})
export class EventCardsComponent implements OnChanges, OnInit {
  constructor(
    private dialogService: DialogService,
    private navbarService: NavbarService,
    private cardsServices: CardsService,
    private router: Router,
    private eventService: EventsService,
    private searchService: SearchService,
    private userService: UsersService,
    private userStore: UserStoreService
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
  role!: string;
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
  mostPopular: Card[];
  eventsAll: Card[];
  myEvents: Card[] = this.cardsServices.getMyCards();
  isFree: boolean = false;
  withTicket: boolean = false;
  searchValue: string = '';
  favoriteEvents: Card[] = [];

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
    this.eventService.addToFavorite(event);
    console.log('evenimentul s-a adaugat!');
  }

  navigateToEventDetail(eventId: number) {
    this.router.navigate(['event-details/', eventId]);
  }
  filterByFree() {
    this.eventService.searchFreeEvents(this.isFree).subscribe((events) => {
      this.eventsAll = events;
    });
  }
  filteredWithTicket() {
    this.eventService
      .searchWithTicketEvents(this.withTicket)
      .subscribe((events) => {
        this.eventsAll = events;
      });
  }

  filteredByTitle() {
    this.eventService
      .searchEventsByTitle(this.searchValue)
      .subscribe((events) => {
        this.eventsAll = events;
      });
  }
  ngOnInit(): void {
    this.selectedCards = 'all-events';
    this.isConfirmed = this.userService.isLoggedIn();

    this.userStore.getRoleFromStore().subscribe((val) => {
      this.role = val;
      console.log(this.role);
    });

    this.eventService.getAllEventsWithImages().subscribe((events) => {
      this.eventsAll = events;
      this.mostPopular = events.slice(2, 6);
    });

    this.searchService.searchSubjectFreeEvents$.subscribe((value) => {
      this.isFree = value;
      this.filterByFree();
    });
    this.searchService.searchSubjectWithTicketEvents$.subscribe((value) => {
      this.withTicket = value;
      this.filteredWithTicket();
    });
    this.searchService.searchSubjectByTitle$.subscribe((value) => {
      this.searchValue = value;
      this.filteredByTitle();
    });
  }
}
