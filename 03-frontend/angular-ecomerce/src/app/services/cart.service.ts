import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    //check if we already have in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem  = undefined!;
    
    

    if(this.cartItems.length > 0){
    //find the item in the cart based on item id
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id)!;

      // for(let tempCartItem of this.cartItems){
      //   if(tempCartItem.id === theCartItem.id){
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      
      //check if we found it

      alreadyExistsInCart = (existingCartItem != undefined );

    }

      if(alreadyExistsInCart){
        //increment quantity
        
        existingCartItem.quantity++;
      }
      else {
        //just add the item to the array
        this.cartItems.push(theCartItem);
      
      }

      //compute cart total price and total quantity
      console.log('--------------------')
      this.computeCartTotals();

    


  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuntityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuntityValue += currentCartItem.quantity; 
    }

    //publish the new values ... all susbscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuntityValue);

    // log cart just for dubugging purposes
    this.logCartData(totalPriceValue,totalQuntityValue);
  }

  logCartData(totalPriceValue: number, totalQuntityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTatalPrice=${subTotalPrice}`);

      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuntityValue}`);
      console.log('------------------');
    }
  }
  decrementQuantity(theCartItem: CartItem) {
    
      theCartItem.quantity--;
      
    if(theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } 
    else {
      this.computeCartTotals();
    }
    
  }
  remove(theCartItem: CartItem) {
  //get index of item in the array
  const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id)  
  //if found, remove the item form the array at the given 
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex,1);

      this.computeCartTotals();
    }
  }
}

