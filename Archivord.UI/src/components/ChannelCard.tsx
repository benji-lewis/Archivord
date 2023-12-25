import { ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"
import TagRoundedIcon from '@mui/icons-material/TagRounded';

interface ServerCardProps {
  id: string;
  name: string;
  category: string | null;
  isSelected: boolean;
  selectFunction: Function;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.backgroundColours.light,
    color: theme.palette.common.white,
  },
  '&:hover': {
    backgroundColor: theme.backgroundColours.main + '!important',
    color: theme.palette.common.white + '!important',
  }
}))

export const ChannelCard = ({ id, name, category, isSelected = false, selectFunction }: ServerCardProps) => {
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
