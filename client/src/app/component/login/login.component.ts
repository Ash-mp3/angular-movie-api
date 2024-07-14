import { Component, inject } from "@angular/core";
import { User } from "../../models/user";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { Firestore } from "@angular/fire/firestore";
import { MatCardModule } from "@angular/material/card";
import { Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../core/auth.service";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
	providers: [MatCardModule, MatInputModule, MatFormFieldModule],
})
export class LoginComponent {
	firestore = inject(Firestore);
	user$: Observable<User | undefined>;
	form: FormGroup;
	fb: FormBuilder = new FormBuilder();

	constructor(private AuthService: AuthService, fb: FormBuilder, private snackBar: MatSnackBar) {
		this.form = fb.group({
			Email: ["", Validators.compose([Validators.required, Validators.email])],
			Password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
		});
	}

	async loginUser(Email: string, Password: string) {
		await this.AuthService.signIn(Email, Password).then((res) => {
			this.openSnackBar(res);
		});
	}

	loginWithGoogle() {
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
			this.loginUser(formData.Email, formData.Password);
			this.form.reset();
		}
	}
}
