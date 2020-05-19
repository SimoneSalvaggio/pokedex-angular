import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailsService {

  constructor(private http: HttpClient) { }

  getPokemonDetails(url: string): Observable<any>{
    let resp = this.http.get(url);
    return resp;
  }
}
