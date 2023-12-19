import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";



export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <p>Home</p>
      <Button variant="contained" onClick={() => navigate("/authorize")}>Authorize</Button>
    </>
  )
}