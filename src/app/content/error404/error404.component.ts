import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageNameManager } from 'src/app/models/page-name-manager';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = 'Erreur';

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.pageNameManager.setTitle(this.pageTitle);
  }

}
