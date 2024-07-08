import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DogService } from '../../../../src/app/services/dog.service';

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService],
    });

    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // THEN
    expect(service).toBeTruthy();
  });

  it('should fetch the list of dog breeds', () => {
    // GIVEN
    const mockBreeds = [
      { id: 1, name: 'Bulldog', temperament: 'Friendly, Courageous' },
      { id: 2, name: 'Labrador', temperament: 'Gentle, Intelligent' },
    ];

    // WHEN
    service.getDogs().subscribe((breeds) => {
      expect(breeds.length).toBe(2);
      expect(breeds).toEqual(mockBreeds);
    });

    // THEN
    const req = httpMock.expectOne(`${service['resourceUrl']}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should fetch dog image by breed ID', () => {
    // GIVEN
    const mockImage = { url: 'https://www.petz.com.br/blog/wp-content/uploads/2017/06/golden-retriever.jpg' };
    const idDog = 1;

    // WHEN
    service.getImageDog(idDog).subscribe((image) => {
      expect(image).toBeTruthy();
      expect(image.url).toBe(mockImage.url);
    });

    // THEN
    const req = httpMock.expectOne(`${service['resourceUrl']}/images/search?breed_id=${idDog}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImage);
  });
});
