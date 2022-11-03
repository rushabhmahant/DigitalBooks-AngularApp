import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-addbook',
  templateUrl: './author-addbook.component.html',
  styleUrls: ['./author-addbook.component.css']
})
export class AuthorAddbookComponent implements OnInit {

  checkoutForm!: FormGroup
  //  Form values

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  
  }

}
