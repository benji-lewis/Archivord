import { useLocation, useNavigate } from "react-router-dom";
import { Guild } from "../interfaces/Guild";
import { ListItemAvatar, ListItemButton, ListItemText, styled } from "@mui/material"
import { GuildAvatar } from "./GuildAvatar";

interface ServerCardProps {
  server: Guild;
  isSelected: boolean;
  selectFunction: Function;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
}))

export const ServerCard = ({ server, isSelected = false, selectFunction }: ServerCardProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id, name, icon } = server

  var iconUrl = `https://cdn.discordapp.com/icons/${id}/`

  const navigateToGuild = () => {
    selectFunction(id)
  }

  return (
    <ListItemButtonStyled selected={isSelected} onClick={navigateToGuild}>
      <ListItemAvatar>
        <GuildAvatar iconId={icon} url={iconUrl} name={name} />
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItemButtonStyled>
  )
}