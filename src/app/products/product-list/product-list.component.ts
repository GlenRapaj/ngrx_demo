import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getError, getProducts, getShowProductCode, setProductReducer } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];
  products$ : Observable<Product[]>;
  selectedProduct$ : Observable<Product>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  displayCode$: Observable<boolean>;
  product$: Observable<Product | null>;
  errorMessage$: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private store : Store<any>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts)

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.store.dispatch(ProductActions.loadProducts());

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // TODO Unsubscribe
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.errorMessage$ = this.store.select(getError);

    // TODO Unsubscribe
    // E shtuar
    // Perkon me slice products te specifikuar ne module.ts
    // this.store.select('products').subscribe( products =>{
    //   // if(products){
    //   //   this.displayCode = products.showProductCode;
    //   // }
    //   this.displayCode = products.showProductCode;
    // });

    // this.store.select(getShowProductCode).subscribe( showProductCode =>{
    //   this.displayCode = showProductCode;
    // });

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    // E shtuar
    // this.store.dispatch(
    //   {type : '[Product] Toggle product Code.' }
    // );

    this.store.dispatch(ProductActions.toggleProductCode());
  }

  // dispach an action with data
  // productSelected(product : Product) :void{
  //   this.store.dispatch(ProductActions.setCurrentProduct({product: product}));
  // }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  // dispach an action with data
  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({product: product}));
    // this.router.navigate(['/list']);
  }

}
