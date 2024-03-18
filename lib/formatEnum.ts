export const formatEnum = (str: string): string => {
  if (typeof str !== 'string') {
    console.error('Input is not a string:', str);
    return ''; 
  }

  return str
    .split('_') 
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
    )
    .join(' ');
};