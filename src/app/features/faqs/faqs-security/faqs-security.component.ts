import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-security',
  templateUrl: './faqs-security.component.html',
  styleUrls: ['./faqs-security.component.scss']
})
export class FaqsSecurityComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'securityQuestion1', answer: 'securityAnswer1'},
    {toggle: false, question: 'securityQuestion2', answer: 'securityAnswer2'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
