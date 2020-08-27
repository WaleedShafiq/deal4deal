import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-account',
  templateUrl: './faqs-account.component.html',
  styleUrls: ['./faqs-account.component.scss']
})
export class FaqsAccountComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {id: 1, toggle: true, question: 'question7', answer: 'answer7'},
    {id: 2, toggle: false, question: 'question8', answer: 'answer8'},
    {id: 3, toggle: false, question: 'question9', answer: 'answer9'},
    {id: 4, toggle: false, question: 'question10', answer: 'answer10'},
    {id: 5, toggle: false, question: 'question11', answer: 'answer11'},
    {id: 6, toggle: false, question: 'question12', answer: 'answer12'},
    {id: 7, toggle: false, question: 'question13', answer: 'answer13'},
    {id: 8, toggle: false, question: 'question14', answer: 'answer14'},
    {id: 9, toggle: false, question: 'question15', answer: 'answer15'},
    {id: 10, toggle: false, question: 'question16', answer: 'answer16', completeAnswer: 'completeaAnswer16', link: true},
    {id: 11, toggle: false, question: 'question17', answer: 'answer17'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
