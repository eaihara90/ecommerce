import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { productsMock } from '../mocks/products.mock';
import { ProductModel } from '../models/product.model';
import { ProductDataAccessService } from './product-data-access.service';

describe('ProductDataAccessService', () => {
    let service: ProductDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(ProductDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the products list', () => {
        // Arrange
        const mockName = 'notebook';
        const url = `${service.apiUrl}/products?name=${mockName}`;
        let result: ProductModel[] = [];

        // Act
        service
            .searchByName(mockName)
            .subscribe((response) => (result = response));

        // Assert
        const request = httpMock.expectOne(url);
        request.flush(productsMock);
        expect(request.request.method).toBe('GET');
        expect(result).toEqual(productsMock);
    });
});
