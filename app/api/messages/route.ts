import { messagesRoom } from '@/app/_lib/messages'

export async function GET() {
  return Response.json(messagesRoom)
}
