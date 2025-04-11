import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { DogBreedResponse, DogImagesResponse } from '@shared/interfaces/dog.interface';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private breeds: string[] = [];

  constructor(private http: HttpClient) {
    this.loadBreeds();
  }

  private loadBreeds(): void {
    this.getAllBreeds().subscribe({
      next: (response) => {
        this.breeds = Object.keys(response.message);
      },
      error: (error) => console.error('Error loading breeds:', error)
    });
  }

  getAllBreeds(): Observable<DogBreedResponse> {
    return this.http.get<DogBreedResponse>(`${environment.apiUrl}${environment.endpoints.breeds}`);
  }

  getBreedImages(breed: string): Observable<DogImagesResponse> {
    const url = environment.endpoints.breedImages.replace('{breed}', breed);
    return this.http.get<DogImagesResponse>(`${environment.apiUrl}${url}`);
  }

  getSubBreedImages(breed: string, subBreed: string): Observable<DogImagesResponse> {
    const url = environment.endpoints.subBreedImages
      .replace('{breed}', breed)
      .replace('{subBreed}', subBreed);
    return this.http.get<DogImagesResponse>(`${environment.apiUrl}${url}`);
  }

  filterBreeds(query: string): string[] {
    const searchTerm = query.toLowerCase();
    return this.breeds.filter(breed => 
      breed.toLowerCase().includes(searchTerm)
    );
  }
}
