import { createAction, createFeatureSelector, createReducer, createSelector, INITIAL_STATE, on, props } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state'; // ../../app.state
import * as ProductActions from "./product.actions";

export interface State extends AppState.State{
    // Bie ndesh me layzy loading
    //State Duhet bere extend tek interface perkates
    products: ProductState; // eshte emri qe perdorim tek moduli
};

export interface ProductState{
    showProductCode : boolean;
    currentProduct: Product;
    products: Product[];
    error: string
};

const initialState : ProductState = {
    showProductCode : true,
    currentProduct: null,
    products: [],
    error: ''
};

// products korrespondon me stringun ne mudulin lokal
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Merr fx si getProductFeatureState qe na japin 1 kompozim te state dhe 
// me pas perdor arrow fx per te procesuar 
// dhe marre te dhenat qe na interesojne qe tia japim komponentes apo servisit qe e therret.
export const getShowProductCode = createSelector(getProductFeatureState, state =>{
    return state.showProductCode;
});

export const getCurrentProduct = createSelector(getProductFeatureState, state =>{
    return state.currentProduct;
});

export const getProducts = createSelector(getProductFeatureState, state =>{
    return state.products;
});

export const getError = createSelector(getProductFeatureState, state =>{
    return state.error;
});

// export const productReducer = createReducer<ProductState>( initialState, // {showProductCode: true},  // INITIAL_STATE
//     on( createAction('[Product] Toggle product Code.'), state =>{  // createAction per te krijuar 1 Action
//         // console.log('original state : ', JSON.stringify(state));
//         return {
//             ...state,
//             showProductCode : !state.showProductCode
//         };
//     } )
// );

export const productReducer = createReducer<ProductState>( initialState,
    on( ProductActions.toggleProductCode, state =>{  
        return {
            ...state,
            showProductCode : !state.showProductCode
        };
    } ),

    on( ProductActions.clearCurrentProduct, (state) : ProductState =>{  
        return {
            ...state,
            currentProduct: null
        };
    } ),

    on( ProductActions.initCurrentProduct, (state) : ProductState =>{  
        return {
            ...state,
            currentProduct : {
                id: 0,
                productName: 'new product',
                productCode: 'new product',
                description: 'new product',
                starRating: 5
            }
        };
    } ),
    on( ProductActions.loadProductsSuccess, (state, actionData) : ProductState =>{  
        return {
            ...state,
            products : actionData.product,
            error: ''
        };
    } ),
    on( ProductActions.loadProductsFailer, (state, actionData) : ProductState =>{  
        return {
            ...state,
            error : actionData.error
        };
    } )
);

// Reducers for actions with asociated data
export const setProductReducer = createReducer<ProductState>( initialState,
    on( ProductActions.setCurrentProduct, (state, actionData) : ProductState =>{  
        return {
            ...state,
            currentProduct : actionData.product
        };
    } )
);

