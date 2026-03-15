const Notification = ({message}) => {
  if(!message) {
    return null
  }

  return (
    <div className={message.type === 'confirm' ? 'confirm' : 'error'}>
      <p>{message.content}</p>
    </div>
  )
}
export default Notification
