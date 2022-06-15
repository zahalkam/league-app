import { Component, OnInit } from '@angular/core';
import { SearchFilter } from 'src/app/model/search-filter';
import { PlayerDataService } from 'src/app/services/player-data.service';

@Component({
  selector: 'app-player-search-form',
  templateUrl: './player-search-form.component.html',
  styleUrls: ['./player-search-form.component.css'],
})
export class PlayerSearchFormComponent implements OnInit {
  filter: SearchFilter = {};

  constructor(private playerDataService: PlayerDataService) {}

  ngOnInit(): void {}

  search(): void {
    this.playerDataService.search(this.filter);
  }
}
