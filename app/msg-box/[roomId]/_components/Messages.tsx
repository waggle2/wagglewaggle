import { messageRooms } from '../../mock'
import Message from '../../_components/Message'
import style from '../styles/messages.module.scss'

export default function Messages() {
  const { messages } = messageRooms[0]
  return (
    <div className={style.messagesDiv}>
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  )
}
