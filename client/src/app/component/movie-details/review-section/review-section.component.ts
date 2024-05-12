import { Component } from '@angular/core';
import { MatInput, MatFormField, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInput, MatFormField, MatLabel, MatIcon
  ],
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.css'
})
export class ReviewSectionComponent {


  rating: number = null
  comment: string = ""

  rateMovie(num: number){
    if(num === this.rating){
      this.rating = null
    } else {
      this.rating = num
    }
  }
}
