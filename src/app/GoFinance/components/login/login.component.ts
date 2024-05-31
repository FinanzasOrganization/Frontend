import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    MatCheckbox,
    MatButton,
    MatInput,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
