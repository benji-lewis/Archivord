import { Avatar } from "@mui/material"
import { getUiColour } from "../helpers/colourHelper"
import { getAcronym } from "../helpers/stringHelper"

export const GuildAvatar = ({iconId, url, name }: {iconId: string | null, url: string, name: string}) => {
  if (iconId)
    return iconId.startsWith('a_') 
      ? <Avatar alt={name + ' icon'} src={url + `${iconId}.gif`} />
      : <Avatar alt={name + ' icon'} src={url + `${iconId}.png`} />
    
    return <Avatar sx={{ bgcolor: getUiColour() }}>{getAcronym(name)}</Avatar>
}