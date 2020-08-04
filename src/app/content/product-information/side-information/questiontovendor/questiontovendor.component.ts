import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'question-to-vendor',
  templateUrl: './questiontovendor.component.html',
  styleUrls: ['./questiontovendor.component.css']
})
export class QuestiontovendorComponent implements OnInit {
  id: number;

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }
}
