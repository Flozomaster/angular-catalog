import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-template',
    templateUrl: './admin-template.component.html',
    styleUrl: './admin-template.component.css'
})

export class AdminTemplateComponent implements OnInit {

    constructor(public authService: AuthenticationService, public router: Router) {
        
    }

    ngOnInit(): void {
        
    }

    handleLogout() {
        this.authService.logout().subscribe ({
            next : (data)=>{
                this.router.navigateByUrl("/login");
            }
        });
    }

}
