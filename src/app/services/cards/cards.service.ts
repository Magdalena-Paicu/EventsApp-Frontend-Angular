import { Injectable } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { DateTransformService } from 'src/app/pipes/date-transform.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private dateTransformService: DateTransformService) {}

  getCards(): Card[] {
    return [
      {
        id: 0,
        title: 'Cursuri Gatit',
        location: 'Union Square',
        author: 'OtherAdminName',
        imageUrl: './assets/img/gatit.png',
        startDateTime: new Date(2023, 1, 24, 9, 43),
        endDateTime: new Date(2023, 10, 24, 9, 43),
        duration: new Date(2023, 1, 24, 9, 43),
        address: 'Piata Victoriei',
        eventLink: '',
        ticketLink: '',
        createdBy: 'OtherAdminName',
        isPetFriendly: false,
        isKidFriendly: false,
        isFree: true,
        isDraft: false,
        imgSrc: null,
        isFavorite: false,
      },
      {
        id: 1,
        title: 'Robotii de azi',
        location: 'Union Square',
        author: 'OtherAdminName',
        imageUrl: './assets/img/roboti.png',
        startDateTime: new Date(2023, 8, 24, 9, 0),
        endDateTime: new Date(2023, 8, 24, 12, 0),
        duration: new Date(2023, 1, 24, 9, 43),
        address: 'Complex Studentesc',
        eventLink: '',
        ticketLink: '',
        createdBy: 'OtherAdminName',
        isPetFriendly: false,
        isKidFriendly: false,
        isFree: true,
        isDraft: true,
        imgSrc: null,
        isFavorite: false,
      },
    ];
  }
  getMyCards(): Card[] {
    return [
      {
        id: 0,
        title: 'Concurs Pictura',
        location: 'Union Square',
        author: 'AdminName',
        imageUrl: './assets/img/concurs-pictura.png',
        startDateTime: new Date(2023, 1, 24, 9, 43),
        endDateTime: new Date(2023, 10, 24, 9, 43),
        duration: new Date(2023, 1, 24, 9, 43),
        address: 'Piata Victoriei',
        eventLink: '',
        ticketLink: '',
        createdBy: 'OtherAdminName',
        isPetFriendly: false,
        isKidFriendly: false,
        isFree: true,
        isDraft: false,
        imgSrc: null,
        isFavorite: false,
      },
    ];
  }
  transformCardsDateFormat(cards: Card[]): any[] {
    return cards.map((card) => {
      return {
        ...card,
        startDateTime: this.dateTransformService.transformStartDate(
          card.startDateTime
        ),
      };
    });
  }
  getCardById(id: any) {
    const cards: Card[] = this.getMyCards();
    return cards.find((card) => {
      card.id === id;
    });
  }
}
