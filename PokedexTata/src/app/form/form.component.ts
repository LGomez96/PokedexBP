import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonList } from '../mi-interfaces';
import { CrudPokemonService } from '../services/crud-pokemon.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form !: FormGroup;
  pokemonlist: PokemonList[] = []
  constructor( private activateRoute: ActivatedRoute, private pokemonService: CrudPokemonService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bringEditData(),
    this.form = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      image: ["", Validators.required],
      attack: ["", Validators.required],
      defense: ["", Validators.required],
      hp: ["", Validators.required],
      idAuthor: ["", Validators.required],
      type: ["", Validators.required]
    });
  }

  bringEditData():void{
    this.activateRoute.params.subscribe(
      e => {
        let id =  e['id'];
        if (id){
          this.pokemonService.get(id)
          .subscribe({
            next:pokemon =>{this.pokemonlist = pokemon;
              console.log(pokemon)} 
          } )
        }
       
      }
    )
  }
  newPokemon(){
    this.pokemonService.addPokemon( this.form.getRawValue() )
    .subscribe({
      next: res =>{ console.log(res);
         alert('Pokemon creado exitosamente!')},
      error: error => alert('Ups!, error al crear  su Pokemon')
      
    })
    this.form.reset()
  }

   // updatePokemon(){
  //   this.pokemonService.editPokemon(this.form.value, id)
  //   .subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res)
  //         alert('Pokemon actualizado exitosamente');
  //         this.form.reset();
  //          //       },
  //       error: (error) => {
  //         alert(`${error} Error en la actualización de datos`);
  //       }
  //     }
  //   )
  // }

  closeModal(){
    this.pokemonService.$modal.emit(false)
  }

}
