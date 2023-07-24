import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatHistory: any[] = []; // Initialize an empty array
  selectedChat: any;
  messageInput: string = '';
  loggedInUserName: string = ''; 
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's name from localStorage
    this.loggedInUserName = this.appService.getLoggedInUserName();
    this.isLoggedIn = !!this.appService.getAuthToken();

    // Fetch chat history when the component initializes
    this.fetchChatHistory();
  }
  fetchUserData(): { authToken: string} {
    const authToken = localStorage.getItem('authToken') || '';
    this.loggedInUserName = localStorage.getItem('name') || '';
    return { authToken };
  }

  fetchChatHistory() {
    if (!this.isLoggedIn) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("name");
      this.appService.clearAuthToken();
      this.appService.clearLoggedInUserName();
      this.isLoggedIn = false;
      this.loggedInUserName = "";
      console.error('User is not authenticated or token has expired.');
      this.router.navigate(['/auth'])
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': this.appService.getAuthToken()
    });

    this.http.get<any[]>('https://dark-red-spider-robe.cyclic.app/user/chat_history', {
      headers 
    })
      .subscribe(
        (data) => {
          this.chatHistory = data;
          // Assuming the chat history is sorted in descending order based on created_at,
          // we can automatically select the latest chat thread.
          if (data.length > 0) {
            this.selectedChat = data[0]
          }else{
            this.chatHistory.push({
              chat_thread: [{ content: 'New Chat Started', role: 'user' }]
            })
            this.selectedChat = {
              chat_thread: [{ content: 'New Chat Started', role: 'user' }]
            };
          }
        },
        (error) => {
          localStorage.removeItem("name")
          this.loggedInUserName = ""
          localStorage.removeItem("authToken")
          console.error('Error fetching chat history:', error);
          this.router.navigate(['/auth'])
        }
      );
  }

  openChat(chat: any) {
    this.selectedChat = chat;
  }

  sendQuestion() {
    // Replace this with the logic to send the question to the backend
    const user_chat_id = this.selectedChat ? this.selectedChat.id : null;
    // Code to send the question (this.messageInput) and user_chat_id to the backend
    // ...
    // Once the question is sent successfully, update the chat history
    const newQuestion = {
      chat_thread: [{ content: this.messageInput, role: 'user' }]
    };
    if (!user_chat_id && this.chatHistory[0].chat_thread[0].content == "New Chat Started") {
      // If there is no selected chat, create a new one and append only the question to the left sidebar
      this.selectedChat = newQuestion; // Select the newly created chat thread
      this.chatHistory[0] = newQuestion
      this.askQuestion({"question": this.messageInput})
    } else {
      // If a chat thread is selected, append the new question to its chat thread
      if(this.selectedChat.id == null){
        this.selectedChat.chat_thread.push(newQuestion.chat_thread[0]);
        this.askQuestion({"question": this.messageInput})
      }else{
        this.selectedChat.chat_thread.push(newQuestion.chat_thread[0]);
        this.askQuestion({"question": this.messageInput, "user_chat_id": this.selectedChat.id})
      }
    }
    this.messageInput = ''; // Clear the message input field
  }
  askQuestion(body: {}) {

    // Replace this with the logic to send the question to the backend
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      localStorage.removeItem("name")
      this.loggedInUserName = ""
      console.error('User is not authenticated or token has expired.');
      this.router.navigate(['/auth']);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authToken
    });

    this.http.post<any>('https://dark-red-spider-robe.cyclic.app/user/question', body, {
      headers 
    })
      .subscribe(
        (response) => {
          this.selectedChat = response
          for(let i = 0; i < this.chatHistory.length; i++){
            if(this.chatHistory[0].id == this.selectedChat.id){
              this.chatHistory[0].chat_thread = this.selectedChat.chat_thread
            }
          }

          console.log(this.chatHistory)
        },
        (error) => {
          console.error('Error posting question:', error);
          localStorage.removeItem("name")
          this.loggedInUserName = ""
          localStorage.removeItem("authToken")
          this.router.navigate(['/auth']);
        }
      );
  }

  createNewChat() {
    // Create a new chat thread with an empty question and select it
    if(this.chatHistory[0].chat_thread[0].content == "New Chat Started"){
      return
    }
    const newChat = {
      chat_thread: [{ content: 'New Chat Started', role: 'user' }]
    };

    this.chatHistory.unshift(newChat);
    this.selectedChat = newChat; // Select the newly created chat thread
  }
}
