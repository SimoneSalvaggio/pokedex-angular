import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number, offset: number): Observable<any> {
    if (offset == undefined || offset == null) {
      offset = 0      
    }
    let resp = this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + "&offset=" + offset)
    return resp;
  }

}
