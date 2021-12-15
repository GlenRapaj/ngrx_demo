import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] Toggle product Code.');

// Kur action ka te dhena (Data) te bashkengjitura
export const setCurrentProduct = createAction(
    '[Product] set Current Product.', 
    props<{product : Product}>());  // {product : Product} specifikojme tipin e te dhenave qe do te marrim/ kalojme


export const clearCurrentProduct = createAction('[Product] clear Current Product.');
export const initCurrentProduct = createAction('[Product] init Current Product');

export const loadProducts = createAction('[Product] Loading');
export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{product : Product[]}>()
);
export const loadProductsFailer = createAction(
    '[Product] Load Fail',
    props<{error : string}>()
    );