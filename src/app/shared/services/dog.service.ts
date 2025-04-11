import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { DogBreedResponse, DogImagesResponse } from '@shared/interfaces/dog.interface';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  constructor(private http: HttpClient) {}

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
}
