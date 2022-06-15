import { Component, OnInit } from '@angular/core';
import { BasicPlayerProperties } from 'src/app/model/basic-player-properties';
import { PlayerDataService } from 'src/app/services/player-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  playerData: BasicPlayerProperties;
  rawPlayerData: string | undefined;
  rawMatchData: string | undefined;
  profileIcon: number | undefined;

  constructor(private playerDataService: PlayerDataService) {}

  ngOnInit(): void {
    this.playerDataService.rawPlayerData.subscribe(
      (data: string | undefined) => {
        this.rawPlayerData = data;
      }
    );
    this.playerDataService.rawMatchData.subscribe(
      (data: string | undefined) => {
        this.rawMatchData = data;
      }
    );
    this.playerDataService.responsePlayerData.subscribe(
      (data: BasicPlayerProperties | undefined) => {
        this.profileIcon = data?.profileIconId;
      }
    );
  }
}
