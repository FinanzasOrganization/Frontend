import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        MatButton,
        MatCheckbox,
        MatIcon,
        MatIconButton,
        MatInput,
        MatTooltip
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
