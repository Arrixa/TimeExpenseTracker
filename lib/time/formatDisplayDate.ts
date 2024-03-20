export const formatDisplayDate = (dateInput) => {
  // Ensure the input is treated as a Date object.
  const date = new Date(dateInput);

  // Check for "Invalid Date"
  if (isNaN(date.getTime())) {
    console.error('Invalid date input:', dateInput);
    return 'Invalid Date'; // Or handle this case as you see fit.
  }

  const modDate = date.toLocaleDateString('en-GB', {
    weekday: 'long', 
    day: '2-digit',   
    month: 'long',    
    year: 'numeric', 
  });
  return modDate;
}