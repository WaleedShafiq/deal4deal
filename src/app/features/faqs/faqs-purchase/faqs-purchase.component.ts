import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs-purchase',
  templateUrl: './faqs-purchase.component.html',
  styleUrls: ['./faqs-purchase.component.scss']
})
export class FaqsPurchaseComponent implements OnInit {
  IsHidden = false;
  listQuestions = [
    {toggle: true, question: 'purchaseQuestion1', answer: 'purchaseAnswer1'},
    {toggle: false, question: 'purchaseQuestion2', answer: 'purchaseAnswer2'},
    {toggle: false, question: 'purchaseQuestion3', answer: 'purchaseAnswer3'},
    {toggle: false, question: 'purchaseQuestion4', answer: 'firstPurchaseAnswer4', completeAnswer: 'lastPurchaseAnswer4', link: true},
    {toggle: false, question: 'purchaseQuestion5', answer: 'purchaseAnswer5'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
