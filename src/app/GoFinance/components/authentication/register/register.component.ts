import { Component, OnInit } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthService} from "../../../../core/services/auth.service";
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatInput,
    MatTooltip,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatFormFieldModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;


  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(null, [Validators.required, Validators.min(3)]),
      'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  register(): void {
      if (this.registerForm.valid) {
        const { name, lastName, email, password } = this.registerForm.value;
        this.authService.register(name, lastName, email, password).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          let errorMessage = '';
          if (err.error.message === 'Ya existe un usuario con el email' + ' ' + email) {
          errorMessage = 'Ya existe un usuario registrado con este correo';
          }
          this.dialog.open(ErrorDialogComponent, {
          width: '500px',
          data: errorMessage
          });
        }
      });
    }
  }
}
