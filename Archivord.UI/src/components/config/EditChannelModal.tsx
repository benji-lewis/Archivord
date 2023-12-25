import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Channel } from "../../interfaces/admin/Channel";
import { SimpleModal } from "../SimpleModal";
import { Switch, Tooltip, Typography, styled } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";

const FlexTypo = styled(Typography)(({ theme }) => ({
  display: 'flex',
}))

export const EditChannelModal = ({ channel, saveFunction, cancelFunction }: { channel: Channel, saveFunction: Function, cancelFunction: Function }) => {
  const [channelData, setChannelData] = useState<Channel>(channel)

  const modalTitle = channelData.category ? `${channelData.category}: ${channelData.name}` : channelData.name

  return <SimpleModal title={modalTitle} isOpen={true} saveFunction={() => saveFunction(channelData)} cancelFunction={cancelFunction}>
    <Grid2 container spacing={2}>
      <Grid2 xs={8}>
        <Typography>Currently Archived?</Typography>
      </Grid2>
      <Grid2 xs={4}>
        <Switch color="secondary" checked={channelData.archived} onChange={(event) => setChannelData({ ...channelData, archived: event.target.checked })} />
      </Grid2>

      <Grid2 xs={8}>
        <FlexTypo>
          Publicly Accessible?
          <Tooltip title="Messages are anonymised before being publicly accessible">
            <InfoIcon fontSize="small" style={{ marginLeft: '5px' }} />
          </Tooltip>
        </FlexTypo>
      </Grid2>
      <Grid2 xs={4}>
        <Switch color="secondary" checked={channelData.public} onChange={(event) => setChannelData({ ...channelData, public: event.target.checked })} />
      </Grid2>

    </Grid2>
  </SimpleModal>
}