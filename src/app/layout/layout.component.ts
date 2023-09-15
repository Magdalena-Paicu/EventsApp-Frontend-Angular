import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search-service/search.service';
import { ViewEncapsulation } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { AuthService } from '../services/auth-services/auth.service';
import { DialogService } from '../services/dialog-service/dialog.service';
import { UserStoreService } from '../services/user-store/user-store.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit {
  constructor(
    private userStore: UserStoreService,
    private userService: UsersService,
    private dialogService: DialogService,
    private searchService: SearchService
  ) {}

  selectedToggle: string = 'all-events';
  selectedDate: Date = new Date();
  selectedCards: string = 'all-events';
  isOpen: boolean = false;
  isSelectedDate: boolean = false;
  @ViewChild('picker') picker: MatDatepicker<any>;
  role: string = '';
  isConfirmed: boolean = false;
  isFree: boolean = false;
  isWithTicket: boolean = false;

  changeIsFree() {
    this.searchService.searchFreeEvents(this.isFree);
  }
  changeWithTicket() {
    this.searchService.searchEventsWithTicket(this.isWithTicket);
  }
  onSelectedCardsView(view: string) {
    this.selectedCards = view;
  }

  onSelectedTagButton(index: number) {
    this.buttons.buttons[index].selected =
      !this.buttons.buttons[index].selected;
  }

  selectDate() {
    this.isSelectedDate = !this.isSelectedDate;
  }

  open() {
    this.picker.open();
    this.isOpen = true;
  }

  close() {
    this.picker.close();
    this.isOpen = false;
  }

  buttons = {
    buttons: [
      {
        name: 'galerie arta',
        selected: false,
        icon: '🎨',
      },
      {
        name: 'food',
        selected: false,
        icon: '🍔',
      },
      {
        name: 'concert',
        selected: false,
        icon: '🎶',
      },
      {
        name: 'festival',
        selected: false,
        icon: '🎶',
      },
      {
        name: 'teatru',
        selected: false,
        icon: '🎭',
      },
      {
        name: 'expozitie',
        selected: false,
        icon: '🏜',
      },
      {
        name: 'food street',
        selected: false,
        icon: '🍔',
      },
      {
        name: 'spectacol',
        selected: false,
        icon: '🎭',
      },
      {
        name: 'pet friendly',
        selected: false,
        icon: '🐶',
      },
      {
        name: 'kid friendly',
        selected: false,
        icon: '👨‍🦲',
      },
    ],
  };

  openNewEventDialog() {
    this.dialogService.openNewEventDialog();
  }

  ngOnInit(): void {
    this.userStore.getRoleFromStore().subscribe((value) => {
      let role = this.userService.getRoleFromToken();
      this.role = value || role;
    });
    this.selectedCards = this.selectedToggle;
  }
}
