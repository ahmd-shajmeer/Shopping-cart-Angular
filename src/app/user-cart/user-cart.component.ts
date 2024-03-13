import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  couponClickStatus:boolean = false
  cartTotal:number = 0
  couponStatus:boolean = false
  allCarts: any = []

  constructor(private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("token")) {
      this.getCart()
    }
  }

  getCart() {
    this.api.getCartAPI().subscribe({
      next: (res: any) => {
        this.allCarts = res
        console.log(this.allCarts);
        this.getTotalCart()
      },
      error: (reason: any) => {
        console.log(reason);
      }
    })
  }

  removeCart(id:any){
    this.api.removeCartItemAPI(id).subscribe({
      next:(res:any) =>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any) =>{
        console.log(reason.error);
        
      }
    })
  }

  incrementQunatity(id:any){
    this.api.incrementCartAPI(id).subscribe({
      next:(res:any) =>{
        this.getCart()
        this.api.getCartCount()
        this.couponClickStatus = false
      },
      error:(reason:any) =>{
        console.log(reason.error);
        
      }
    })
  }

  decrementQunatity(id:any){
    this.api.decrementCartAPI(id).subscribe({
      next:(res:any) =>{
        this.getCart()
        this.api.getCartCount()
        this.couponClickStatus = false
      },
      error:(reason:any) =>{
        console.log(reason.error);
      }
    })
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any) =>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any) =>{
        console.log(reason.error);
      }
    })
  }

  getTotalCart(){
    this.cartTotal  = Math.ceil(this.allCarts.map((product:any) =>product.totalPrice).reduce((p1:any,p2:any) => p1+p2))
  }

  getCoupon(){
    this.couponStatus = true
  }

  discount50(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal * 0.5)
    this.cartTotal -= discount
  }

  discount25(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal * 0.25)
    this.cartTotal -= discount
  }

  discount5(){
    this.couponClickStatus = true
    let discount = Math.ceil(this.cartTotal * 0.05)
    this.cartTotal -= discount
  }

  checkout(){
    sessionStorage.setItem("cartTotalPrice",JSON.stringify(this.cartTotal))
    this.router.navigateByUrl('/checkout')
  }

}
