
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime,  filter } from 'rxjs';
import { CrudPokemonService } from './services/crud-pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('inputSearch')

  title = 'PokedexTata';
  arrayPokemon: any[] = []
  control = new FormControl;
  loading: boolean = false;
  inputSearch?= ElementRef;
  form !: FormGroup;
  isShown!: boolean;
  
  pokemonList: boolean = false;

  constructor(private pokemonService: CrudPokemonService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.pokemonService.$modal.subscribe((value) => { this.isShown = value })
    this.getAllPokemonsByAuthorOne();
    //this.observerChangeSearch();

  }
  observerChangeSearch() {
    this.control.valueChanges
      .pipe(
        filter(query => query.trim().length),
        debounceTime(1000),
      )
      .subscribe(query => {
        this.getPokemonsSearch(query);
      })
  }

  getAllPokemonsByAuthorOne() {
    this.pokemonService.getPokemon()
      .subscribe({
        next: res => {
          console.info('Pokemones en la db =>', res)

        }
      })
  }
  getPokemonsSearch(query: string) {
    this.loading = true;
    this.pokemonService.getPokemon()
      .subscribe({
        next: (res) => {

          const arrayPokemonFilter = res.filter((element: any) => element.name.includes(query))
          //console.log('find', arrayPokemonFilter )
          this.arrayPokemon = arrayPokemonFilter;
          this.loading = false;
          return (this.arrayPokemon.length === 0) ? alert('Este pokemon no existe en la base de datos') : this.arrayPokemon
        }

      });
  }

  blurEvent() {
    console.log('your blur evenet')
  }

  addNewPokemon() {
    this.isShown = true;
  }
  editPokemon(pokemon: any) {
    this.isShown = true;
    console.log(pokemon)
  }

  deletePokemonById(id: number){
    if (confirm('¿Estas seguro de elimarlo?')){
      this.pokemonService.deletePokemon(id)
      .subscribe({
        next: res => {
          const arrayWithoutPokemonDeleted = this.arrayPokemon.filter( el => el.id !== id)
          this.arrayPokemon = [...arrayWithoutPokemonDeleted];
        },
        error: error => {
          alert('Ups!, algo salió mal, vuelve a intentarlo')
          console.log(error)
        }
              
      });
    }   
  }
 
 

}


