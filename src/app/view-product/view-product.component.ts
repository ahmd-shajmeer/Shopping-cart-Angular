import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any = {}

  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToastrService){ }

  ngOnInit(): void {
    this.route.params.subscribe((res:any) =>{
      const {id} = res
      this.getProduct(id)
    })
  }

  getProduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any) =>{
      this.product = res
      console.log(this.product);
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any) =>{
          this.toaster.success(`${res.title} added to wishlist`)
          this.api.getWishlistCount()
        },
        error:(reason:any) =>{
          this.toaster.info(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any) =>{
          this.toaster.success(res)
          this.api.getCartCount()
        },
        error:(reason:any) =>{
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login!!")
    }
  }
}
