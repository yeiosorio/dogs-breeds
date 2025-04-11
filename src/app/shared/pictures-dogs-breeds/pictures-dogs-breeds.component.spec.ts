import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesDogsBreedsComponent } from './pictures-dogs-breeds.component';

describe('PicturesDogsBreedsComponent', () => {
  let component: PicturesDogsBreedsComponent;
  let fixture: ComponentFixture<PicturesDogsBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesDogsBreedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicturesDogsBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
