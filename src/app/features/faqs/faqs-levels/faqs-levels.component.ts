import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-levels',
  templateUrl: './faqs-levels.component.html',
  styleUrls: ['./faqs-levels.component.scss']
})
export class FaqsLevelsComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'levelQuestion1', answer: 'levelAnswer1'},
    {toggle: false, question: 'levelQuestion2', answer: 'levelAnswer2'},
    {toggle: false, question: 'levelQuestion3', answer: 'levelAnswer3'},
    {toggle: false, question: 'levelQuestion4', answer: 'levelAnswer4'},
    {toggle: false, question: 'levelQuestion5', answer: 'levelAnswer5'},

  ];
  constructor() { }

  ngOnInit() {
  }

}
