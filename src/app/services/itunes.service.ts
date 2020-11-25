import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  apiRoot: string = 'https://itunes.apple.com/search';



  constructor(private http: HttpClient) {
  }

  search(term:string){
    let apiURL = `${this.apiRoot}?term=${term}&entity=allArtist&attribute=allArtistTerm&limit=20`;
    let regex = `^${term}.*`
    return this.http.get(apiURL).pipe(
      map(res => {
        return JSON.parse(JSON.stringify(res)).results.filter(item => item.artistName.match(regex) != -1 && item.artistType == "Artist")
        .map(item => {
              return item.artistName
        })
      })
    ).toPromise();
  }
}


