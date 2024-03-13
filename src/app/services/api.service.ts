import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchTerm = new  BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0)

  SERVER_URL = 'https://shopping-server-angular.onrender.com'

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllProductsAPI(){
   return this.http.get(`${this.SERVER_URL}/all-products`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)
  }

  appendTokenToHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return { headers } 
  }

  addToWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenToHeader())
  }

  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any) =>{
      this.wishlistCount.next(res.length)
    })
  }

  removeWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenToHeader())
  }

  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader())
  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any) =>{
      this.cartCount.next(res.length)
    })
  }

  removeCartItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/cart/remove/${id}`,this.appendTokenToHeader())
  }

  incrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/increment/${id}`,this.appendTokenToHeader())
  }

  decrementCartAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/decrement/${id}`,this.appendTokenToHeader())
  }

  emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenToHeader())
  }
  
  isLoggedIn(){
    return !!sessionStorage.getItem("token")
  }
}
