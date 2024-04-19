import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/product.interface";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
	products:Product[];
	totalAmount:number;
	totalProducts:number;
}

const initialState:CartStore = {
	products: [],
	totalAmount: 0,
	totalProducts:0
} 

export const CartStore = signalStore(
	{providedIn: 'root'},
	withState<CartStore>(initialState),
	withComputed(({products}) => ({
		totalAmount: computed(() => calculateTotalAmount(products())),
		totalProducts: computed(() => calculateTotalProducts(products())),
	})),
	withMethods(({products, ...store}, toastService = inject(ToastrService)) => ({
		addToCart(product:Product){
			const isProductInCart = products().find((item:Product) => item.id === product.id);
			if(isProductInCart){
				isProductInCart.qty++;
				isProductInCart.subtotal = isProductInCart.qty * isProductInCart.price;
				patchState(store, {products: [...products()]});
			} else {
				product.qty = 1;
				product.subtotal = product.price;
				patchState(store, {products: [...products(), product]});
			}
			toastService.success('Product added', 'Fake Store');
			
		},
		removeFromCart(id:number) {
			const updatedProducts = products().filter(product => product.id !== id);
			patchState(store, {products:updatedProducts});
			toastService.info('Product removed', 'Fake Store');
		},
		clearCart() {
			patchState(store, initialState);
			toastService.info('Cart cleared', 'Fake Store');
		}
	})),
);

function calculateTotalAmount(products:Product[]): number {
	return products.reduce((acc, product) => acc + product.price * product.qty, 0);
}

function calculateTotalProducts(products:Product[]): number {
	return products.reduce((acc, product) => acc + product.qty, 0);
}