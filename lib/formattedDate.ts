import { format } from 'date-fns';

export const formattedDate = (dateString: string) => {
  if(dateString) {
    const date = new Date(dateString);
    return format(date, "y-MM-dd");
  }
};