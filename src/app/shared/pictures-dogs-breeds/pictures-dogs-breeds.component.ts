import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pictures-dogs-breeds',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgOptimizedImage
  ],
  templateUrl: './pictures-dogs-breeds.component.html',
  styleUrls: ['./pictures-dogs-breeds.component.scss']
})
export class PicturesDogsBreedsComponent {
  @Input() images: string[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;

  isPriority(image: string): boolean {
    // Priorizar la carga de las primeras 4 imágenes
    return this.images.indexOf(image) < 4;
  }

  getLoadingStrategy(image: string): 'eager' | 'lazy' {
    // Cargar las primeras 4 imágenes inmediatamente, el resto lazy
    return this.isPriority(image) ? 'eager' : 'lazy';
  }
}
