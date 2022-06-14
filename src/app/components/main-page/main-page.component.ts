import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  responseSummonerData: string;
  rawSummonerData: any;
  responseMatchData: string;
  profileIcon: number;
  filter = {
    name: '',
  };
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  search(): void {
    this.httpClient
      .get(
        `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.filter.name}?api_key=RGAPI-5f396edc-6d6b-4ae5-a424-1bc4285ca960`
      )
      .subscribe((data: any) => {
        console.log(data);
        this.profileIcon = data.profileIconId;
        this.rawSummonerData = data;
        this.responseSummonerData = JSON.stringify(data, null, '\t');
        this.getMatches(data.puuid);
      });
  }

  getMatches(puuid: string): void {
    this.httpClient
      .get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-5f396edc-6d6b-4ae5-a424-1bc4285ca960`
      )
      .subscribe((data) => {
        console.log(data);
        this.responseMatchData = JSON.stringify(data, null, '\t');
      });
  }
}
