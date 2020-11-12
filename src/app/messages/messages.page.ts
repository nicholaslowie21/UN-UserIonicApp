import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommunicationService } from '../services/communication.service';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  chatrooms: any;
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  chatroomList: any[];
  isCurrFilterType: String;
  
  constructor(private communicationService:CommunicationService, 
    private router:Router,
    private tokenStorage: TokenStorageService,
    private sessionService: SessionService) {
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
    this.isCurrFilterType = "all";
    this.initializeChats();

   }

  ngOnInit() {
    console.log("line44" + this.chatrooms);
    this.initialise();
    this.initializeChats();
  }

  ionViewDidEnter() {
    console.log("didEnter" + this.chatrooms);
    this.initialise();
    this.initializeChats();
    console.log(this.chatroomList);
  }


  initialise() {
    this.communicationService.getChatRooms().subscribe((res) => {
      this.chatrooms = res.data.chatRooms;
      this.initializeChats();
      if(this.chatrooms != undefined) {
        for(var i = 0; i < this.chatrooms.length; i ++) {
          this.chatrooms[i].targetImg = this.sessionService.getRscPath() + this.chatrooms[i].targetImg +'?random+=' + Math.random();
          console.log(this.chatrooms[i].targetImg);

        }
      }
    }, (err) => {
      console.log("****************Retrieval of Chatrooms error: " + err.error.msg)
    })
  }

  enterChatRoom(r) {
    if(r.user1id == this.currentUser.data.user.id) {
      this.router.navigate(["/chatroom/" + r.user2id + "/" + r.user2type + "/" + r.user2username + "/" + r.chatType + "/"])
    }
    if(r.user1id != this.currentUser.data.user.id) {
      this.router.navigate(["/chatroom/" + r.user1id + "/" + r.user1type + "/" + r.user1username + "/" + r.chatType + "/"])
    }
   
  }

  initializeChats() {
    console.log(this.chatrooms);
    this.chatroomList = this.chatrooms;
    console.log(this.chatroomList);
  }
  
   async filterChatList(evt) {
     this.initializeChats()
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.chatroomList = this.chatroomList.filter(chatroom => {
      if (chatroom.user1username && searchTerm) {
        return (chatroom.user1username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  filter() {
    console.log("I am filtering")
    if(this.isCurrFilterType == "all"){
      this.initializeChats()
      this.chatroomList = this.chatroomList.filter(chatroom => {
        if(chatroom.chatType == 'admin') {
          return chatroom;
        }
      })
      console.log(this.chatroomList);
      this.isCurrFilterType = "admin"
    } else if(this.isCurrFilterType == "admin") {
      this.initializeChats()
      this.chatroomList = this.chatroomList.filter(chatroom => {
        if(chatroom.chatType == 'normal') {
          return chatroom;
        }
      })
      console.log(this.chatroomList);
      this.isCurrFilterType = "normal"
    } else if(this.isCurrFilterType == "normal") {
      this.initializeChats();
    }
  }  

}