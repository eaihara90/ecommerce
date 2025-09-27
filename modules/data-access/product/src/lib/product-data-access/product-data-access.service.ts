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
    private errorCounter = 0;

    public searchByName(name: string): Observable<ProductModel[]> {
        // return throwError(() => {
        //     this.errorCounter++;
        //     const error: any = new Error(`Error #${this.errorCounter}`);
        //     error.timestamp = Date.now();
        //     throw new Error(`Error #${this.errorCounter}`);
        // });
        return this.http.get<ProductModel[]>(`${this.apiUrl}/products`, {
            params: { name },
        });
    }
}
