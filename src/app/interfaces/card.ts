import { SafeUrl } from '@angular/platform-browser';

export interface Card {
  id: number;
  title: string;
  location: string;
  author: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  duration: Date;
  address: string;
  eventLink: string;
  ticketLink: string;
  createdBy: string;
  isPetFriendly: boolean;
  isKidFriendly: boolean;
  isFree: boolean;
  isDraft: boolean;
  imgSrc: SafeUrl;
  isFavorite: boolean;
}
