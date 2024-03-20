export const formatDisplayTime = (time) => {
  const modTime = new Date(time).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  return modTime
}