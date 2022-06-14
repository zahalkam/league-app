import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  responseData: string;
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
      .subscribe((data) => {
        console.log(data);
        this.responseData = JSON.stringify(data, null, '\t');
      });
  }
}
