import { styled } from "@mui/material"
import { Message, MessageData } from "../interfaces/Message"
import { DiscordMessages, DiscordMessage } from "@skyra/discord-components-react"

const Box = styled('div', {})(() => ({
  width: "100% !important",
  height: '100% !important',
  border: 'none',
  maxHeight: 'calc(100vh - 60px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column-reverse', // Reverse the direction
}))

export const Messages = ({ messages }: { messages: Message }) => {
  return (
    <Box>
    <DiscordMessages noBackground>
      {Object.entries(messages).map(([key, value]: [string, MessageData]) => (
        <DiscordMessage
          author={value.authorNick ? value.authorNick : value.authorUsername}
        >
          {value.content}
        </DiscordMessage>
      ))}

    </DiscordMessages>
    </Box>
  )
}
