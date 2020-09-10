import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-resources',
  templateUrl: './my-resources.page.html',
  styleUrls: ['./my-resources.page.scss'],
})
export class MyResourcesPage implements OnInit {
  manpowerResource : any[];
  knowledgeResource : any[]
  itemResource : any[];
  venueResource : any[];
  type : String;

  constructor() { }

  ngOnInit() {
    this.manpowerResource = [{"title": "Software Engineer", "desc": "I can code through the night, just sponsor me Redbull", "status": "active", "region": "Singapore"}];
    this.knowledgeResource = [{"title": "How to code with stamina", "desc": "Have a Redbull at hand and Google and you're off"}];
    this.itemResource = [
      {"title": "Tables", "desc": "I have 10 tables as I clicked an extra 0 when I was ordering online. Up for grabs!", "status": "active", "region": "Singapore"},
      {"title": "Chairs", "desc": "I have 10 chairs as I clicked an extra 0 when I was ordering online. Up for grabs!", "status": "inactive", "region": "Singapore"},
    ];
    this.venueResource = [
      {"title": "Auditorium", "desc": "Can seat up to 100 pax", "address": "NUS Create Way #01-119", "status": "active", "region": "Singapore"},
      {"title": "Stairway to Fitness", "desc": "Open to people hosting Vertical Marathons!", "address":"Stairway Lane Singapore 133022", "status": "inactive", "region": "Singapore"}
    ];
    this.type = 'manpower';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }



}
