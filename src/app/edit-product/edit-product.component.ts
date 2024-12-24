import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.css'
})

export class EditProductComponent implements OnInit {

    productId!: string;
    product!: Product;

    productFormGroup!: FormGroup;
    center: any;
    
    constructor(public prodService: ProductService,
                public route : ActivatedRoute,
                public router : Router,
                public fb: FormBuilder) {
        this.productId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.prodService.editProduct(this.productId).subscribe({
            next : (product) => {
                this.product = product;
                this.productFormGroup = this.fb.group({
                    name : this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
                    price : this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
                    promotion : this.fb.control(this.product.promotion, [Validators.required])
                });
            }, 
            error : err => {
                console.log(err);
            }
        })
    }

    handleUpdateProduct() {
        let p = this.productFormGroup.value;
        p.id = this.product.id;
        this.prodService.updateProduct(p).subscribe({
            next : (prod) => {
                alert("Product updated successfully");
                this.router.navigateByUrl("/products");
            }, 
            error : err => {
                console.log(err);
            }
        })
    }

}
