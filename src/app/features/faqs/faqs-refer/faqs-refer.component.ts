import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-refer',
  templateUrl: './faqs-refer.component.html',
  styleUrls: ['./faqs-refer.component.scss']
})
export class FaqsReferComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'referQuestion1', answer: 'referAnswer1'},
    {toggle: false, question: 'referQuestion2', answer: 'referAnswer2'},

  ];
  constructor() { }

  ngOnInit() {
  }

}
