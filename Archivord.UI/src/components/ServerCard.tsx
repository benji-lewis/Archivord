import { ListItemAvatar, ListItemButton, ListItemText, styled } from "@mui/material"
import { GuildAvatar } from "./GuildAvatar";

interface ServerCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  selectFunction: Function;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.backgroundColours.main,
    color: theme.palette.common.white,
  },
  '&:hover': {
    backgroundColor: theme.backgroundColours.light + '!important',
    color: theme.palette.common.white + '!important',
  }
}))

export const ServerCard = ({ id, name, icon, isSelected = false, selectFunction }: ServerCardProps) => {
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
