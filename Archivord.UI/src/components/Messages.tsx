import { Message } from "../interfaces/Message"
import { DiscordMessages, DiscordMessage } from "@skyra/discord-components-react"

export const Messages = ({messages} : {messages: Array<Message>}) => {
  return (
    <DiscordMessages>
      {messages.map(message => <DiscordMessage author={message.authorNick ? message.authorNick : message.authorUsername}>{message.content}</DiscordMessage>)}

    </DiscordMessages>
  )
}