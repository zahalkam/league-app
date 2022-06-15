import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasicPlayerProperties } from '../model/basic-player-properties';
import { SearchFilter } from '../model/search-filter';
import * as apiConfig from '../../config/api-config.json';

export const API_KEY = JSON.parse(JSON.stringify(apiConfig)).apiKey;

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  rawPlayerData: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  rawMatchData: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);

  responseMatchData: BehaviorSubject<{ matchId: string[] } | undefined> =
    new BehaviorSubject<{ matchId: string[] } | undefined>(undefined);
  responsePlayerData: BehaviorSubject<BasicPlayerProperties | undefined> =
    new BehaviorSubject<BasicPlayerProperties | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

  search(filter: SearchFilter): void {
    this.httpClient
      .get(
        `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${filter.name}?api_key=${API_KEY}`
      )
      .subscribe((data: BasicPlayerProperties) => {
        console.log(data);
        this.responsePlayerData.next(data);
        this.rawPlayerData.next(JSON.stringify(data, null, '\t'));
        this.getMatches(data.puuid);
      });
  }

  getMatches(puuid: string | undefined): void {
    this.httpClient
      .get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`
      )
      .subscribe((data: any) => {
        console.log(data);
        this.responseMatchData.next(data);
        this.rawMatchData.next(JSON.stringify(data, null, '\t'));
      });
  }
}
