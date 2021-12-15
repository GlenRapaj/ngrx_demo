import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from "./product.actions";

@Injectable()
export class ProductEffect {
    constructor(private actions$: Actions,
        private productService: ProductService) { }

    // loadProducts$ = createEffects(() => {
    //     return this.actions$.pipe(
    //         ofType(ProductActions.loadProducts),
    //         mergeMap(() =>  this.productService.getProducts().pipe(
    //                 map(products => ProductActions.loadProductsSuccess({ products: products }))
    //             ))
    //     )
    // })

    @Effect()
    loadProducts$ = this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() =>  this.productService.getProducts().pipe(
                    map(products => ProductActions.loadProductsSuccess({ product: products })),
                    catchError( (error ) => of( ProductActions.loadProductsFailer({error: error }))) // HttpErrorResponse
                ))
        )


}

