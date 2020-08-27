import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-about',
  templateUrl: './faqs-about.component.html',
  styleUrls: ['./faqs-about.component.scss']
})
export class FaqsAboutComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {id: 1, toggle: true, question: 'questionOne', answer: 'answerOne'},
    {id: 2, toggle: false, question: 'questionTwo', answer: 'answerTwo', linkWork: true},
    {id: 3, toggle: false, question: 'questionThree', answer: 'answerThree'},
    {id: 4, toggle: false, question: 'questionFour', answer: 'answerFour'},
    {id: 5, toggle: false, question: 'questionFive', answer: 'answerFive' , linkHelp: true},
    {id: 6, toggle: false, question: 'questionSix', answer: 'answerSix' , linkTerms: true},
  ];


  constructor() {
  }
  ngOnInit() {
  }

}
