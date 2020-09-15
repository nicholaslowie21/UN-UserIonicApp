import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-split',
  templateUrl: './register-split.page.html',
  styleUrls: ['./register-split.page.scss'],
})
export class RegisterSplitPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
