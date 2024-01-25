import { messageRooms } from '../../mock'
import Message from '../../_components/Message'

export default function Messages() {
  const { messages } = messageRooms[0]
  return (
    <>
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </>
  )
}
