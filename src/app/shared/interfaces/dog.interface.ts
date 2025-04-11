export interface DogBreed {
  name: string;
  subBreeds: string[];
}

export interface DogBreedResponse {
  message: { [key: string]: string[] };
  status: string;
}

export interface DogImagesResponse {
  message: string[];
  status: string;
}

export interface SearchParams {
  breed: string;
  subBreed?: string;
} 