import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

    form: FormGroup;
    fb: FormBuilder = new FormBuilder;

    constructor(private AuthService: AuthService, fb: FormBuilder) {
        this.form = fb.group({
            Email: ['', Validators.compose([Validators.required, Validators.email])],
            Password: ['', Validators.required]
        })
     }
    regiserterUser(Email: string, Password: string) {
        console.log(Email, Password)
        this.AuthService.signUp(Email, Password)
    }

    resetForm() {
        this.form.reset();
    }

    onSubmit() {
        if (this.form.invalid) {
          console.error('Form is invalid!');
          return;
        }
    
        const formData = this.form.value;
        console.log('Form data:', formData);
        this.regiserterUser(formData.Email, formData.Password)
    
        this.resetForm()
      }

}
