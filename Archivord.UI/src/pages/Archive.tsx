import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserGuilds } from "../services/user.service"
import { getArchivedGuilds } from "../services/guilds.service"
import { ServerCard } from "../components/ServerCard"
import { Guild } from "../interfaces/Guild"
import { NavBar } from "../components/NavBar"


export const Archive = () => {
  const [username, setUsername] = useState()
  const [userGuilds, setUserGuilds] = useState(Array<Guild>)

  useEffect(() => {
    if (!userGuilds || userGuilds.length == 0) {
      getUserGuilds()
        .then(res =>
          getArchivedGuilds(res.map(x => x.id))
            .then(returnValue =>
              setUserGuilds(res.filter(x => returnValue.includes(x['id'])))
            )
        )
    }
  }, [])

  return (
    <>
    <NavBar />
      {username && <Typography variant="h2">{`Welcome ${username}!`}</Typography>}
      {userGuilds.map(server => <ServerCard server={server} />)}
    </>
  )
}