import { useLocation, useNavigate } from "react-router-dom";
import { CardActionArea, ListItem, ListItemText, styled } from "@mui/material"
import { Channel } from "../interfaces/Channel";

const Card = styled('div', {})(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[800],
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

export const ChannelCard = ({ guildId, channelData }: { guildId: string, channelData: Channel }) => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/archive/${guildId}/${channelData.Id}`, { state: { ...location.state, channelId: channelData.Id } })}>
        <ListItem>
          <ListItemText primary={channelData.Name} />
        </ListItem>
      </CardActionArea>
    </Card>
  )
}