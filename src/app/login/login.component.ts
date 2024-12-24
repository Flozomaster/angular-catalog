import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({

    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'

})

export class LoginComponent implements OnInit {

    userFormGroup! : FormGroup;
    errorMessage : any;
    

    constructor(private fb : FormBuilder, 
                private authService : AuthenticationService,
                private router : Router
            ) {}

    ngOnInit() : void {

        this.userFormGroup = this.fb.group({
            username : this.fb.control(""),
            password : this.fb.control("")
        });

    }

    handleLogin() {

        let username = this.userFormGroup.value.username;
        let password = this.userFormGroup.value.password;
        this.authService.login(username, password).subscribe({
            next : (appUser) => {
                this.authService.authenticateUser(appUser).subscribe({
                    next : (data) => {
                        this.router.navigateByUrl("/home");
                    }
                });

            },
            error : (err) => {
                this.errorMessage = err;
            }
        });

    }

    /* export class AppComponent implements AfterViewInit {
        constructor(private elementRef: ElementRef) {}
        ngAfterViewInit() {
            this.elementRef.nativeElement.ownerDocument
                .body.style.backgroundColor = 'yourColor';
        }
    } */



}
