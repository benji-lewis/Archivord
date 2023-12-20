import { ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Channel } from "../interfaces/Channel";

interface ServerCardProps {
  channel: Channel;
  isSelected: boolean;
  selectFunction: Function;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
}))

export const ChannelCard = ({ channel, isSelected = false, selectFunction }: ServerCardProps) => {
  const { id, name } = channel

  const navigateToGuild = () => {
    selectFunction(id)
  }

  return (
    <ListItemButtonStyled selected={isSelected} onClick={navigateToGuild}>
      <ListItemIcon>
        <TagRoundedIcon htmlColor="#949BA4" />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButtonStyled>
  )
}