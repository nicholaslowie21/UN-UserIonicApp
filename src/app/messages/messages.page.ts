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
  adminChatrooms: any;
  currentUser: any;
  accountType: any;
  accountBoolean: boolean;
  isVerified: boolean;
  type: String;
  chatroomList: any[];
  adminChatroomList: any[];
  noChatsBoolean: Boolean;
  noAdminChatsBoolean: Boolean;
  // isCurrFilterType: String;
  
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
    this.noChatsBoolean = true;
    this.noAdminChatsBoolean = true;
    this.type = "user";
    this.initializeChats();

   }

  ngOnInit() {
    console.log("line55" + this.chatrooms);
    this.initialise();
    this.initializeChats();
  }

  ionViewDidEnter() {
    console.log("didEnter" + this.chatrooms);
    this.initialise();
    this.initializeChats();
  }


  initialise() {
    this.communicationService.getUserChatRooms().subscribe((res) => {
      this.chatrooms = res.data.chatRooms;
      this.chatroomList = this.chatrooms;
      // this.initializeChats();
      if(this.chatrooms != undefined) {
        for(var i = 0; i < this.chatrooms.length; i ++) {
          this.chatrooms[i].targetImg = this.sessionService.getRscPath() + this.chatrooms[i].targetImg +'?random+=' + Math.random();
          console.log(this.chatrooms[i].targetImg);
          this.noChatsBoolean = false;
        }
      }
    }, (err) => {
      console.log("****************Retrieval of Chatrooms error: " + err.error.msg)
    })

    this.communicationService.getAdminChatRooms().subscribe((res) => {
      this.adminChatrooms = res.data.chatRooms;
      this.adminChatroomList = this.adminChatrooms;
      // this.initializeChats();
      if(this.adminChatrooms != undefined) {
        for(var i = 0; i < this.adminChatrooms.length; i ++) {
          this.adminChatrooms[i].targetImg = this.sessionService.getRscPath() + this.adminChatrooms[i].targetImg +'?random+=' + Math.random();
          console.log(this.adminChatrooms[i].targetImg);
          this.noAdminChatsBoolean = false;
        }
      }
    }, (err) => {
      console.log("****************Retrieval of Admin Chatrooms error: " + err.error.msg)
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
    this.chatroomList = this.chatrooms;
    this.adminChatroomList = this.adminChatrooms;
    console.log(this.chatroomList);
    console.log(this.adminChatroomList);
  }
  
   async filterChatList(evt) {
     this.initializeChats()
     const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.chatroomList = this.chatroomList.filter(chatroom => {
      if (chatroom.user1username == this.currentUser.data.user.username) {
        if(chatroom.user2username && searchTerm) {
          return (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      } else {
        if(chatroom.user1username && searchTerm) {
          return (chatroom.user1username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      }
    });

    this.adminChatroomList = this.adminChatroomList.filter(chatroom => {
      if(chatroom.user1username == this.currentUser.data.user.username) {
        if (chatroom.user2username && searchTerm) {
          return (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      } else {
        if (chatroom.user1username && searchTerm) {
        return (chatroom.user1username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (chatroom.user2username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  formatDate(date): any {
    let formattedDate = new Date(date).toUTCString();
    return formattedDate.substring(5, formattedDate.length-13);
  }

  // filter() {
  //   console.log("I am filtering")
  //   if(this.isCurrFilterType == "all"){
  //     this.initializeChats()
  //     this.chatroomList = this.chatroomList.filter(chatroom => {
  //       if(chatroom.chatType == 'admin') {
  //         return chatroom;
  //       }
  //     })
  //     console.log(this.chatroomList);
  //     this.isCurrFilterType = "admin"
  //   } else if(this.isCurrFilterType == "admin") {
  //     this.initializeChats()
  //     this.chatroomList = this.chatroomList.filter(chatroom => {
  //       if(chatroom.chatType == 'normal') {
  //         return chatroom;
  //       }
  //     })
  //     console.log(this.chatroomList);
  //     this.isCurrFilterType = "normal"
  //   } else if(this.isCurrFilterType == "normal") {
  //     this.initializeChats();
  //     this.isCurrFilterType = "all";
  //   }
  // }  

}