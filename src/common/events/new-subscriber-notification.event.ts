export class NewSubscriberNotificationEvent {
  name: 'new_subscriber';
  userId: string;
  detail: {
    name: string;
    id: string;
  };
}
