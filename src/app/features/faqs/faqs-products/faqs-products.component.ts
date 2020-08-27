import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-products',
  templateUrl: './faqs-products.component.html',
  styleUrls: ['./faqs-products.component.scss']
})
export class FaqsProductsComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'proQustion1', answer: 'proAnswer1', completeAnswer: 'completeAnswer1', link: true},
    {toggle: false, question: 'proQustion2', answer: 'proAnswer2'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
