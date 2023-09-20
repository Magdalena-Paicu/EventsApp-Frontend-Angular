import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { User } from '../interfaces/user';
import { EventsService } from '../services/events/events.service';
import { ImagesService } from '../services/images/images.service';
import { UploadFile } from '../interfaces/upload-file';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private eventService: EventsService,
    public imageUpload: ImagesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  users: User[] = [];
  events: Event[];
  search: string;
  images: UploadFile[];
  imageSrc: SafeUrl;

  loadImages(): void {
    this.imageUpload.getAllImages().subscribe((data: any[]) => {
      this.images = data.map((image) => image.imageUrl);
    });
  }

  loadImageByName(fileName: string) {
    this.imageUpload.getImagebyName(fileName).subscribe(
      (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      (error) => {
        console.error('A apărut o eroare la obținerea imaginii:', error);
      }
    );
  }
  checkIsActive() {
    const urlTree = this.router.createUrlTree(['/login']);
    const isActive = this.router.isActive(urlTree, false);

    if (isActive) {
      console.log("The 'login' route is currently active.");
    } else {
      console.log("The 'login' route is no currently active.");
    }
  }

  ngOnInit(): void {}
}
