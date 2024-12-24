import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
})

export class ProductsComponent implements OnInit {

    searchFormGroup! : FormGroup;
    products! : Array<Product>;
    currentPage : number = 0;
    pageSize : number = 5;
    totalPages : number = 0;
    errorMessage! : string;
    data! : string;
    currentAction : string = "all";

    constructor(private productService: ProductService, private fb: FormBuilder,
                public authService : AuthenticationService, private router: Router
                ) {}

    ngOnInit(): void {
        this.searchFormGroup = this.fb.group({
            keyword : this.fb.control(null)
        });
        this.handleGetPageProducts();
	}

    handleSearchProducts() {
        this.currentAction = "search";
        this.currentPage = 0;
        let keyword = this.searchFormGroup.value.keyword;
        this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
            next : (data)=>{
                this.products = data.products;
                this.totalPages = data.totalPages;
            }
        })

    }

    goToPage(i : number) {
        this.currentPage = i;
        if(this.currentAction==='all')
            this.handleGetPageProducts();
        else
            this.handleSearchProducts();
    }

    handleGetPageProducts() {
        this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
            next : (data)=> {
                this.products = data.products;
                this.totalPages = data.totalPages;
            },
            error : (err)=> {
                this.errorMessage = err;
            }         
        });
    }

    handleGetAllProducts() {
        this.productService.getAllProducts().subscribe({
            next : (data)=> {
                this.products = data;
            },
            error : (err)=> {
                this.errorMessage = err;
            }         
        });
    }

    handleSetPromotion(p: Product) {
        let promo = p.promotion;
        this.productService.setPromotion(p.id).subscribe( {
            next: (data)=>{
                p.promotion = true;
            },
            error : (err)=> {
                this.errorMessage = err;
            } 
        });
    }

    handleNewProduct() {
        this.router.navigateByUrl("/admin/newProduct");
    }

    handleEditProduct(p: Product) {
        this.router.navigateByUrl("/admin/editProduct/"+p.id);
    }

    handleDeleteProduct(p: Product) {
        let conf = confirm("Are you sure ?");
        if(conf == false) return;
        this.productService.deleteProduct(p.id).subscribe( {
            next: (data)=>{
                let index = this.products.indexOf(p);
                this.products.splice(index, 1);
            }
        })
    }
    
}
