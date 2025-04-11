import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '@shared/search-bar/search-bar.component';
import { PicturesDogsBreedsComponent } from '@shared/pictures-dogs-breeds/pictures-dogs-breeds.component';
import { DogService } from '@shared/services/dog.service';
import { SearchParams } from '@shared/interfaces/dog.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PicturesDogsBreedsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: string[] = [];
  loading = false;
  error: string | null = null;

  constructor(private dogService: DogService) {}

  onSearch(params: SearchParams): void {
    this.loading = true;
    this.error = null;
    this.images = [];

    const request$ = params.subBreed
      ? this.dogService.getSubBreedImages(params.breed, params.subBreed)
      : this.dogService.getBreedImages(params.breed);

    request$
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.images = response.message;
        },
        error: (error) => {
          this.error = 'Error loading images. Please try again.';
          console.error('Error:', error);
        }
      });
  }
}
