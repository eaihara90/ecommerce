import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
    ProductDataAccessService,
    ProductModel,
    productsMock,
} from '@ecommerce/product-data-access';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    of,
    switchMap,
} from 'rxjs';

@Component({
    selector: 'ecommerce-product-search',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
    ],
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit {
    private readonly productDataAccessService = inject(
        ProductDataAccessService
    );
    private _destroyRef = inject(DestroyRef);
    control = new FormControl('', { nonNullable: true });
    products$: Observable<ProductModel[]> = of([...productsMock]);
    filteredProducts!: Observable<ProductModel[]>;

    ngOnInit(): void {
        this.products$ = this.control.valueChanges.pipe(
            debounceTime(750),
            distinctUntilChanged(),
            filter((text) => text.length > 1),
            map((text) => text.toLowerCase().trim()),
            switchMap((text) =>
                this.productDataAccessService.searchByName(text)
            ),
            catchError((_) => of([]))
            // takeUntilDestroyed(this._destroyRef)
        );
    }

    // private _filter(_value: string): void {}

    //   private _filter(value: string): string[] {
    //     const filterValue = value.toLowerCase();

    //     return this.products.filter(option => option.toLowerCase().includes(filterValue));
    //   }
}
