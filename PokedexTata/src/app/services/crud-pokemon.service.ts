import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { PokemonList } from '../mi-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudPokemonService {
   
  constructor( private http: HttpClient) { }

  $modal = new EventEmitter<any>();

  private apiUrl = environment.apiUrl

  
  getPokemon(): Observable<PokemonList[]> {
    return this.http.get<any>(this.apiUrl+'?idAuthor=1');
  }
  addPokemon(body: PokemonList){
    return this.http.post(this.apiUrl+'?idAuthor=1' , body)
  }
  editPokemon(data: PokemonList, id:number): Observable<void>{
     //   console.log('id', id)
  //   console.log('data', data)
    return this.http.put<void>(`${this.apiUrl}${id}`, data)
  }
  deletePokemon(id: number){
    return this.http.delete<void>(`${this.apiUrl}${id}`)
  }
   
  get(id: any):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`)
  }
  //CONSULTAR POR ID (GET)https://bp-pokemons.herokuapp.com/:id
  //CONSULTAR POR N DE REGISTROS (GET)https://bp-pokemons.herokuapp.com/count?idAuthor=1
  //ACTUALIZAR  (PUT CON JSON) Y BORRAR (DELETE)https://bp-pokemons.herokuapp.com/:id

  
}
