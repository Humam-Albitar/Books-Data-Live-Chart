import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {SocketService} from "../socket.service";
import {BarChartComponent} from "../bar-chart/bar-chart.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BarChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  chart:any;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public bookService: BookService,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      pages: new FormControl('', Validators.required),
      published: new FormControl('', this.publishedYearValidator)
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.bookService.create(this.form.value).subscribe((res:any) => {
         console.log('Book created successfully!');
         this.router.navigateByUrl('');
    })
  }

   publishedYearValidator(control: AbstractControl): ValidationErrors | null {
    const year = control.value;
    if (year < 2000 || year > 2023) {
      return { invalidYear: true };
    }
    return null;
  }

}
