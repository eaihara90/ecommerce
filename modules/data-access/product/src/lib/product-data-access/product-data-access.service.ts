import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductDataAccessService {
    private readonly http = inject(HttpClient);
    public readonly apiUrl = 'https://65009f9718c34dee0cd53786.mockapi.io';

    public searchByName(name: string): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`${this.apiUrl}/products`, {
            params: { name },
        });
    }
}
