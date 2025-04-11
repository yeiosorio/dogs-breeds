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

 
}
