import { styled } from "@mui/material"
import { Message, MessageData } from "../interfaces/Message"
import { DiscordMessages, DiscordMessage } from "@skyra/discord-components-react"
import { useEffect, useRef } from 'react';

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
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box>
      <DiscordMessages noBackground>
        {Object.entries(messages).map(([key, value]: [string, MessageData]) => {
          console.log(`**** Nick: ${value.authorNick} - Nick Type: ${typeof value.authorNick} - Username: ${value.authorUsername} - Content: ${value.content}`);
          console.log(`**** Message: ${value.content}`)
          return (
            <DiscordMessage
              key={key} // Turns out this is actually needed... That's 3 hours of my life I won't get back
              author={value.authorNick || value.authorUsername}
            >
              {value.content}
            </DiscordMessage>
          );
        })}
        <div ref={endRef} /> {/* This div will be scrolled into view */}
      </DiscordMessages>
    </Box>
  )
}