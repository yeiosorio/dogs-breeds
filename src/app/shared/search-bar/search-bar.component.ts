import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchParams } from '@shared/interfaces/dog.interface';
import { DogService } from '@shared/services/dog.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<SearchParams>();
  
  searchParams: SearchParams = {
    breed: '',
    subBreed: ''
  };

  filteredBreeds: string[] = [];
  filteredSubBreeds: string[] = [];
  hasSubBreeds = false;

  constructor(private dogService: DogService) {}

  ngOnInit() {
    // Ya no llamamos a onSearchInput aquí para evitar que se muestre la lista al inicio
  }

  onSearchInput(): void {
    if (this.searchParams.breed?.trim()) {
      this.filteredBreeds = this.dogService.filterBreeds(this.searchParams.breed);
    } else {
      this.filteredBreeds = [];
    }
  }

  onBreedSelected(breed: string): void {
    this.searchParams.breed = breed;
    this.searchParams.subBreed = ''; // Limpiar sub-raza al cambiar de raza
    this.filteredSubBreeds = this.dogService.getSubBreeds(breed);
    this.hasSubBreeds = this.filteredSubBreeds.length > 0;
    
    // Realizar la búsqueda inmediatamente al seleccionar una raza
    this.onSearch();
  }

  onSubBreedInput(): void {
    if (this.searchParams.breed && this.searchParams.subBreed?.trim()) {
      this.filteredSubBreeds = this.dogService.filterSubBreeds(
        this.searchParams.breed,
        this.searchParams.subBreed
      );
    } else if (this.searchParams.breed) {
      this.filteredSubBreeds = this.dogService.getSubBreeds(this.searchParams.breed);
    } else {
      this.filteredSubBreeds = [];
    }
  }

  onSubBreedSelected(): void {
    // Realizar la búsqueda cuando se selecciona una sub-raza
    this.onSearch();
  }

  onSearch(): void {
    if (this.searchParams.breed) {
      this.search.emit(this.searchParams);
    }
  }

  displayFn(breed: string): string {
    return breed || '';
  }
}
