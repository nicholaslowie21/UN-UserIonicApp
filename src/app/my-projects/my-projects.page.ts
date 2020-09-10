import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.page.html',
  styleUrls: ['./my-projects.page.scss'],
})
export class MyProjectsPage implements OnInit {
  currProjects : any[];
  pastProjects : any[];

  constructor() { }

  ngOnInit() {
    // Dummy data to be replaced with actual data when the proj endpoints are created. Some attributes not in the dummy data, and some (eg role) are created here.
    this.currProjects = [
      {"id": "1", "title": "Project One", "desc": "This is a special project", "SDG": [1, 3], "status": "ongoing", "role": "Contributor"},
      {"id": "2", "title": "Project Two", "desc": "We are trying to solve problems", "SDG": [2, 6], "status": "ongoing", "role": "Admin"},
      {"id": "6", "title": "Project Six", "desc": "This SDG is especially important", "SDG": [7], "status": "ongoing", "role": "Contributor"},
    ];

    this.pastProjects = [
      {"id": "3", "title": "Project Three", "desc": "This SDG is especially important", "SDG": [1, 5], "status": "completed", "role": "Contributor"},
      {"id": "4", "title": "Project Four", "desc": "This is a special project", "SDG": [4], "status": "completed", "role": "Contributor"},
      {"id": "5", "title": "Project Five", "desc": "We are trying to solve problems", "SDG": [10], "status": "completed", "role": "Admin"}
    ];
  }

}
