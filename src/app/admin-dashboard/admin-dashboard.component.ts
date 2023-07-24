// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  chatThreadsWithoutFeedback: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch chat threads without feedback from the server on component initialization
    this.fetchChatThreadsWithoutFeedback();
  }

  // Fetch chat threads without feedback from the server
  fetchChatThreadsWithoutFeedback(): void {
    this.http.get<any[]>('https://dark-red-spider-robe.cyclic.app/admin/chat').subscribe(
      (response) => {
        this.chatThreadsWithoutFeedback = response;
      },
      (error) => {
        console.error('Error fetching chat threads without feedback:', error);
      }
    );
  }

  // Submit feedback for a chat thread
  submitFeedback(userChatId: number, rating: number, comment: string): void {
    const data = {
      user_chat_id: userChatId,
      rating: rating,
      comment: comment
    };

    this.http.post('https://dark-red-spider-robe.cyclic.app/admin/feedback', data).subscribe(
      (response) => {
        console.log('Feedback submitted successfully:', response);
        // After submitting feedback, update the chatThreadsWithoutFeedback list to reflect the change
        this.fetchChatThreadsWithoutFeedback();
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}
