import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institution.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resource-suggestions',
  templateUrl: './resource-suggestions.page.html',
  styleUrls: ['./resource-suggestions.page.scss'],
})
export class ResourceSuggestionsPage implements OnInit {
  id: any;
  suggestions: any;
  type: string;

  constructor(private router: Router, 
    private marketplaceService: MarketplaceService, 
    private sessionService: SessionService, 
    private activatedRoute: ActivatedRoute, 
    private userService:UserService, 
    private institutionService:InstitutionService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.initialiseSuggestions();
  }

  ionViewDidEnter() {
    this.initialiseSuggestions();
  }

  initialiseSuggestions() {
    this.marketplaceService.getResourceSuggestionForResourceNeed(this.id).subscribe((res)=>{
      this.suggestions = res.data.suggestedResources
      if(this.suggestions != undefined) {
        for(var i = 0; i < this.suggestions.length; i ++) {
          this.suggestions[i].ownerImg = this.sessionService.getRscPath() + this.suggestions[i].ownerImg +'?random+=' + Math.random();
        }
      }
    }, (err) => {
      console.log("***************************Resource Need Suggestion Error: " + err.error.msg);
    })
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  viewResource(resource) {
    this.router.navigateByUrl("/view-resource/" + this.type + "/" + resource.id);
  }

  viewProfile(ev, h) {
    console.log("poggers");
      if(h.ownerType == "institution") {
            this.router.navigate(['/view-others-profile/' + h.ownerUsername + "/" + h.ownerType ])
      } else if(h.ownerType == "user") {
          console.log("ranned");
          this.router.navigate(['/view-others-profile/' + h.ownerUsername + "/" + h.ownerType ])
       
      }
      
    
  }
}
