import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { User } from '../interfaces/user';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private eventService: EventsService
  ) {}

  users: User[] = [];
  events: Event[];
  search: string;

  ngOnInit(): void {}
}
