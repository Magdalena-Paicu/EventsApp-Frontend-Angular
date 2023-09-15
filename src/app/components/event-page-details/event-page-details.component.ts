import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { CardsService } from 'src/app/services/cards/cards.service';

@Component({
  selector: 'app-event-page-details',
  templateUrl: './event-page-details.component.html',
  styleUrls: ['./event-page-details.component.scss'],
})
export class EventPageDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private cardService: CardsService
  ) {}

  idParam: string;
  event: Card;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.idParam = params.get('idEvent');
      this.event = this.cardService.getCardById(this.idParam);
    });
  }
}
