import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-inquiries',
  templateUrl: './faqs-inquiries.component.html',
  styleUrls: ['./faqs-inquiries.component.scss']
})
export class FaqsInquiriesComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'inquirieQuestion1', answer: 'inquirieAnswer1'},
    {toggle: false, question: 'inquirieQuestion2', answer: 'inquirieAnswer2'},

  ];
  constructor() { }

  ngOnInit() {
  }

}
