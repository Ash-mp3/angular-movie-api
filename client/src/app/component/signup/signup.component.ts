import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../core/auth.service";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-signup",
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSnackBarModule],
	templateUrl: "./signup.component.html",
	styleUrl: "./signup.component.css",
})
export class SignupComponent {
	form: FormGroup;
	fb: FormBuilder = new FormBuilder();

	constructor(private AuthService: AuthService, fb: FormBuilder, private snackBar: MatSnackBar) {
		this.form = fb.group({
			Email: ["", Validators.compose([Validators.required, Validators.email])],
			Password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
		});
	}
	async regiserterUser(Email: string, Password: string) {
		await this.AuthService.signUp(Email, Password).then((res) => {
			this.openSnackBar(res);
		});
	}

	regiserterWithGoogle() {
		this.AuthService.signUpWithGoogle();
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, "Close", {
			duration: 3000,
		});
	}

	onSubmit() {
		if (this.form.get("Email")?.invalid && this.form.get("Password")?.invalid) {
			this.openSnackBar("Form is invalid!");
			return;
		} else if (this.form.get("Email")?.invalid) {
			this.openSnackBar("email invalid");
			return;
		} else if (this.form.get("Password")?.invalid) {
			this.openSnackBar("password must have at least 6 characters");
			return;
		} else {
			const formData = this.form.value;
			this.regiserterUser(formData.Email, formData.Password);
			this.form.reset();
		}
	}
}
