import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pictures-dogs-breeds',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './pictures-dogs-breeds.component.html',
  styleUrls: ['./pictures-dogs-breeds.component.scss']
})
export class PicturesDogsBreedsComponent {
  @Input() images: string[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() selectedBreed = '';
  @Input() selectedSubBreed = '';

  getBreedTitle(): string {
    if (!this.selectedBreed) return '';
    
    const breed = this.capitalizeFirstLetter(this.selectedBreed);
    if (!this.selectedSubBreed) return breed;
    
    const subBreed = this.capitalizeFirstLetter(this.selectedSubBreed);
    return `${subBreed} ${breed}`;
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
