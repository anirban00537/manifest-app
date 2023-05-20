import moment from 'moment';

export function getGreetingMessage() {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 16) {
    return 'Good Afternoon';
  } else if (currentHour >= 16 && currentHour < 20) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}

export function formateDate(date: any) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}
