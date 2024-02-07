const formatDate = (time: string) => {
  const date = new Date(time)
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 > 9
      ? (date.getMonth() + 1).toString()
      : '0' + (date.getMonth() + 1)) +
    '-' +
    (date.getDate() > 9
      ? date.getDate().toString()
      : '0' + date.getDate().toString())
  )
}
export default formatDate
