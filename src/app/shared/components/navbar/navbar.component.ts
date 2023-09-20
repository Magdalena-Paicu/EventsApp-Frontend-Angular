import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { NavbarService } from 'src/app/services/navbar-service/navbar.service';
import { SearchService } from 'src/app/services/search-service/search.service';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';
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
  role: string = '';
  clickFavorite: boolean = false;
  clickHome: boolean = true;
  matchingUser: User[];
  imageSrc: SafeUrl;
  users: User[] = [];
  frontendTitle: string = 'Title From Frontend';

  constructor(
    private searchCardsService: SearchService,
    private dialogService: DialogService,
    private router: Router,
    private navbarService: NavbarService,
    private userService: UsersService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userStore.getRoleFromStore().subscribe((val) => {
      let role = this.userService.getRoleFromToken();
      this.role = val || role;
    });
    this.isConfirmed = this.userService.isLoggedIn();
  }

  mouseEnterProfile() {
    this.clickprofile = true;
  }

  mouseLeaveProfile() {
    this.clickprofile = false;
  }

  sendSearchCards() {
    this.searchCardsService.searchEventByTitle(this.searchCards);
  }

  openModal() {
    this.dialogService.openMyAccountDialog();
  }

  logout() {
    this.router.navigate(['login']);
    this.userService.clearToken();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigate(['create-account']);
  }

  onFavoriteHomeClick() {
    this.isConfirmed = this.userService.isLoggedIn();
    this.clickFavorite = !this.clickFavorite;
    this.clickHome = !this.clickHome;
    this.navbarService.emitClickFavorite(this.clickFavorite);
    this.navbarService.emitClickHome(this.clickHome);
  }

  goToMaps() {
    this.router.navigate(['/maps']);
  }
}
