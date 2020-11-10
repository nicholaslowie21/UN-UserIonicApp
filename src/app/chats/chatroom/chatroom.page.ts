import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { interval } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  @ViewChild('scrollElement') content: IonContent;
  id: any;
  accountType: any;
  data: {};
  messages: any;
  name: string;
  user1Id: any;
  user2Id: any;
  currentUser: any;
  accountBoolean: boolean;
  isVerified: boolean;
  message: any;
  messageData: {};
  chatroom: any;
  source: any;
  subscribe: any;
  image: string;
  type: string;

  constructor(private activatedRoute: ActivatedRoute, private communicationService: CommunicationService
    ,private tokenStorage: TokenStorageService,
    private sessionService: SessionService,
    private router: Router) {
    this.currentUser = this.tokenStorage.getUser();
   
   this.accountType = this.tokenStorage.getAccountType();
   console.log(this.accountType);
    if(this.accountType == "institution") {
      this.accountBoolean = true;
      if(this.currentUser.data.user.isVerified == true) {
        this.isVerified = true;
      }
    } else if(this.accountType == "user") {
      if(this.currentUser.data.user.isVerified == "true") {
        this.isVerified = true;
      }
      this.accountBoolean = false;
    }
    console.log(this.accountBoolean);

    this.source = interval(3000);
    this.subscribe = this.source.subscribe(() => {
      this.initialise();
      console.log("timer is running")
    }
     );

   }

   ionViewDidLeave(){
    this.subscribe.unsubscribe();
 }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.data ={
      "chatType": "normal",
      "targetId": this.id,
      "targetType": this.type
    }
    this.communicationService.chatWith(this.data).subscribe((res) => {
        this.chatroom = res.data.chatRoom
        this.messages = res.data.chats
        this.user1Id = res.data.chatRoom.user1id;
        this.user2Id = res.data.chatRoom.user2id;
        this.image = this.sessionService.getRscPath() + this.chatroom.targetImg +'?random+=' + Math.random();
        
    }, (err) => {
      console.log("*****************Get Chat Room Fail err: " + err.error.msg)
    })

  }

  initialise() {
    console.log(this.chatroom.id)
    this.communicationService.getChatMessages(this.chatroom.id).subscribe((res) => {
      this.messages = res.data.chats
  }, (err) => {
    console.log("*****************Get Chat Room Fail err: " + err.error.msg)
  })
  }

  sendMessage() {
    if(this.message != "") {
        this.messageData = {
          "roomId": this.chatroom.id,
          "message": this.message
        }
        this.communicationService.sendChatMessage(this.messageData).subscribe((res) => {
            this.initialise();
            this.updateScroll();
        }, (err) => {
          console.log("Send Message failure err: " + err.error.msg);
        })
        this.message = "";
    }
  }

  viewProfile(ev) {
        this.router.navigate(['/view-others-profile/' + this.name + "/" + this.type ])
  }

  back() {
    this.router.navigateByUrl("/tabs/messages");
  }


  updateScroll() {
    console.log('scrollToBottom');
    this.content.scrollToBottom();
  }

}
