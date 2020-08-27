import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-campagin',
  templateUrl: './faqs-campagin.component.html',
  styleUrls: ['./faqs-campagin.component.scss']
})
export class FaqsCampaginComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {id: 1, toggle: true, question: 'campaginQuestion1', answer: 'campaginAnswer1'},
    {id: 2, toggle: false, question: 'campaginQuestion2', answer: 'campaginAnswer2'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
