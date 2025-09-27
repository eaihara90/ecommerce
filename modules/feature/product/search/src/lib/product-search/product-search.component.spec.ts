import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    ProductDataAccessService,
    productsMock,
} from '@ecommerce/product-data-access';
import { of } from 'rxjs';
import { ProductSearchComponent } from './product-search.component';

describe('ProductSearchComponent', () => {
    let component: ProductSearchComponent;
    let fixture: ComponentFixture<ProductSearchComponent>;
    let productDataAccessService: ProductDataAccessService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductSearchComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: ProductDataAccessService, // Injects the service class
                    useValue: { searchByName: () => of(productsMock) }, // mocks the return of searchByName method
                },
            ],
        }).compileComponents();

        productDataAccessService = TestBed.inject(ProductDataAccessService);
        fixture = TestBed.createComponent(ProductSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should debounce when input field is changed', fakeAsync(() => {
        jest.spyOn(productDataAccessService, 'searchByName');

        const input: HTMLInputElement =
            fixture.nativeElement.querySelector('input');

        input.value = 'tv';
        input.dispatchEvent(new Event('input'));

        expect(productDataAccessService.searchByName).not.toHaveBeenCalled();

        tick(500);

        expect(productDataAccessService.searchByName).toHaveBeenCalledWith(
            input.value
        );
    }));

    it('should search multiple times', fakeAsync(() => {
        jest.spyOn(productDataAccessService, 'searchByName');

        const input: HTMLInputElement =
            fixture.nativeElement.querySelector('input');

        input.value = 'tv';
        input.dispatchEvent(new Event('input'));

        tick(500);

        input.value = 'notebook';
        input.dispatchEvent(new Event('input'));

        tick(500);

        expect(productDataAccessService.searchByName).toHaveBeenCalledTimes(2);
    }));

    it('should prevent identical submission', fakeAsync(() => {
        jest.spyOn(productDataAccessService, 'searchByName');

        const input: HTMLInputElement =
            fixture.nativeElement.querySelector('input');

        input.value = 'tv';
        input.dispatchEvent(new Event('input'));

        tick(500);

        input.dispatchEvent(new Event('input'));

        tick(500);

        expect(productDataAccessService.searchByName).toHaveBeenCalledTimes(1);
    }));

    it('should prevent empty submission', fakeAsync(() => {
        jest.spyOn(productDataAccessService, 'searchByName');

        const input: HTMLInputElement =
            fixture.nativeElement.querySelector('input');

        input.value = '';
        input.dispatchEvent(new Event('input'));

        tick(500);

        expect(productDataAccessService.searchByName).not.toHaveBeenCalled();
    }));

    it('should return products observable correctly', fakeAsync(() => {
        component.products$.subscribe((products) => {
            expect(products).toEqual(productsMock);
        });
    }));
});
