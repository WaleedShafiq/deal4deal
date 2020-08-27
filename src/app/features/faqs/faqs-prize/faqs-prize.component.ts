import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-prize',
  templateUrl: './faqs-prize.component.html',
  styleUrls: ['./faqs-prize.component.scss']
})
export class FaqsPrizeComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'prizeQuestion1', answer: 'prizeAnswer1', completeAnswer: 'completePrizeAnswer1', link: true},
    {toggle: true, question: 'prizeQuestion2', answer: 'prizeAnswer2'},
    {toggle: true, question: 'prizeQuestion3', answer: 'prizeAnswer3', completeAnswer: 'completePrizeAnswer3', link: true},
    {toggle: true, question: 'prizeQuestion4', answer: 'prizeAnswer4'},
    {toggle: true, question: 'prizeQuestion5', answer: 'prizeAnswer5'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
