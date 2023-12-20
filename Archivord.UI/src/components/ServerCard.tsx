import { useLocation, useNavigate } from "react-router-dom";
import { Guild } from "../interfaces/Guild";
import { Avatar, CardActionArea, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material"
import { canUserManageBots } from "../helpers/permissionsHelper";
import { GuildAvatar } from "./GuildAvatar";

const Card = styled('div', {})(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[800],
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

export const ServerCard = ({ server }: { server: Guild }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id, name, icon, permissions } = server

  if (!canUserManageBots(permissions.toString())) return

  var iconUrl = `https://cdn.discordapp.com/icons/${id}/`

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/archive/${id}`, { state: { ...location.state, guildId: id, guildName: name } })}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <GuildAvatar iconId={icon} url={iconUrl} name={name} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      </CardActionArea>
    </Card>
  )
}