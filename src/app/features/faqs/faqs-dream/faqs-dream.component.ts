import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-dream',
  templateUrl: './faqs-dream.component.html',
  styleUrls: ['./faqs-dream.component.scss']
})
export class FaqsDreamComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'dreamQuestion1', answer: 'dreamAnswer1'},
    {toggle: false, question: 'dreamQuestion2', answer: 'dreamAnswer2'},
    {toggle: false, question: 'dreamQuestion3', answer: 'dreamAnswer3'},
    {toggle: false, question: 'dreamQuestion4', answer: 'dreamAnswer4'},
    {toggle: false, question: 'dreamQuestion5', answer: 'dreamAnswer5'},

  ];
  constructor() { }

  ngOnInit() {
  }

}
