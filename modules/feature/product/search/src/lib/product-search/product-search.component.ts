import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductModel, productsMock } from '@ecommerce/product-data-access';
import { Observable, of } from 'rxjs';

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
export class ProductSearchComponent {
    control = new FormControl('');
    products: Observable<ProductModel[]> = of([...productsMock]);
    filteredProducts!: Observable<ProductModel[]>;

    //   ngOnInit() {
    //     this.filteredProducts = this.myControl.valueChanges.pipe(
    //       startWith(''),
    //       map(value => this._filter(value || '')),
    //     );
    //   }

    //   private _filter(value: string): string[] {
    //     const filterValue = value.toLowerCase();

    //     return this.products.filter(option => option.toLowerCase().includes(filterValue));
    //   }
}
