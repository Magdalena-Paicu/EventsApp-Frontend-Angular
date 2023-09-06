import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { SearchService } from 'src/app/services/search-service/search.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  clickprofile: boolean = false;
  searchCards: string = '';
  isConfirmed: boolean = false;
  isAdmin: boolean = false;
  clickFavorite: boolean = false;
  clickHome: boolean = true;
  matchingUser: User[];
  imageSrc: SafeUrl;
  users: User[] = [];

  constructor(
    private searchCardsService: SearchService,
    private dialogService: DialogService,
    private router: Router,
    private navbarService: NavbarService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {}

  mouseEnterProfile() {
    this.clickprofile = true;
  }

  mouseLeaveProfile() {
    this.clickprofile = false;
  }

  sendSearchCards() {
    this.searchCardsService.searchEventByTitle(this.searchCards);
    console.log(this.searchCards);
  }
  openModal() {
    this.dialogService.openMyAccountDialog();
  }
  logout() {
    this.router.navigate(['login']);
    this.userService.clearToken();
  }
  login() {
    this.router.navigate(['login']);
  }
  register() {
    this.router.navigate(['create-account']);
  }

  onFavoriteHomeClick() {
    this.clickFavorite = !this.clickFavorite;
    this.clickHome = !this.clickHome;
    this.navbarService.emitClickFavorite(this.clickFavorite);
    this.navbarService.emitClickHome(this.clickHome);
  }
}
