import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { PokemonList } from '../mi-interfaces';
import { CrudPokemonService } from './crud-pokemon.service';

describe('CrudPokemonService', () => {
  let service: CrudPokemonService;
  let httpController: HttpTestingController;
  let apiUrl = environment.apiUrl
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CrudPokemonService);
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be create a new Pokemon', () => {

    //Arrange 
    const bodyMock = {
      id: 'string',
      name: 'string',
      image: 'url',
      attack: 7,
      defense: 7,
      hp: 7,
      type: '',
      id_author: 1

    }

    const mockResponse = {
      success: false,
      type: "name_missing",
      data: "The name is missing"
    }
    //Arrange

    //ACT
    service.addPokemon(bodyMock)
      .subscribe()
    let url = apiUrl + '?idAuthor=1'
    let req = httpController.expectOne(url)
    let request = req.request
    //assert
    expect(
      request.method
    ).toBe('POST')
    req.flush(mockResponse)
  })
  it('Get a Pomenon list', () => {

    //arrange 
    const pokemonArray = [
      {
        id: 'string',
        name: 'string',
        image: 'url',
        attack: 7,
        defense: 7,
        hp: 7,
        type: '',
        id_author: 1
      },
      {
        id: 'string',
        name: 'string',
        image: 'url',
        attack: 7,
        defense: 7,
        hp: 7,
        type: '',
        id_author: 1
      }]

    //act
    service.getPokemon()
      .subscribe()

    let url = apiUrl + '?idAuthor=1'
    let req = httpController.expectOne(url)
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('GET')


    req.flush(pokemonArray)
  })
  it('Get a Pomenon list', () => {

    //arrange 
    const mock = {
      success: true,
      type: "pokemon_removed",
      data: []
    }

    //act
    service.getPokemon()
      .subscribe()
    let id = 7;
    let url = apiUrl + id;
    let req = httpController.expectOne(url)
    let request = req.request

    //assert
    expect(
      request.method
    ).toBe('DELETE')


    req.flush(mock)
  })
});
