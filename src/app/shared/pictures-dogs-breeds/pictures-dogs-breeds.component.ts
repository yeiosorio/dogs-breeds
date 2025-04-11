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
}
