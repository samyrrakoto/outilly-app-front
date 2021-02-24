import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-completion-account-warning',
  templateUrl: './completion-account-warning.component.html',
  styleUrls: ['./completion-account-warning.component.css']
})
export class CompletionAccountWarningComponent implements OnInit {
  @Input() completed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
