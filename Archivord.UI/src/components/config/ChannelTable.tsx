import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled
} from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { Channel } from "../../interfaces/admin/Channel";

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.primary.light + '!important',
  backgroundColor: theme.palette.primary.main,
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.light,
}))

const FlexCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.light,
  display: 'flex',
  borderBottom: 'none',
}))

const StyledRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '2px solid ' + theme.backgroundColours.lighter,
}))

export const ChannelTable = ({ channels, setSelectedChannel }: { channels: Array<Channel>, setSelectedChannel: Function }) => {
  const getTableData = () => {
    return channels.map((channel: Channel) => (
      <StyledRow>
        <StyledCell>{channel.name}</ StyledCell>
        <StyledCell>{channel.category}</ StyledCell>
        <StyledCell>{channel.archived ? 'Yes' : 'No'}</ StyledCell>
        <StyledCell>{channel.public ? 'Yes' : 'No'}</ StyledCell>
        <StyledCell align="right">
          <Button variant="contained" color="secondary" onClick={() => setSelectedChannel(channel)}>
            Edit
          </Button>
        </StyledCell>
      </StyledRow>
    ))
  }

  return (
    <TableContainer component={StyledPaper}>
      <Table>
        <TableHead>
          <StyledRow>
            <StyledCell>Channel</StyledCell>
            <StyledCell>Category</StyledCell>
            <StyledCell>Archived</StyledCell>
            <FlexCell>
              Publicly Viewable
              <Tooltip title="Messages are anonymised before being publicly accessible">
                <InfoIcon fontSize="small" style={{ marginLeft: '5px' }} />
              </Tooltip>
            </FlexCell>
          </StyledRow>
        </TableHead>
        <TableBody>
          {getTableData()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
