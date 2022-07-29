import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CrudPokemonService } from '../services/crud-pokemon.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockService = {
    addPokemon: jasmine.createSpy()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FormComponent],
      providers: [
        { provide: CrudPokemonService, useValue: mockService }
      ]
    })
      .compileComponents();



    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
