import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function BankCard({ bank, content }: { bank: string, content : React.JSX.Element }) {
  return (
    <Box sx={{ minWidth: 250}} >
      <Card variant="outlined" sx={{ maxWidth:"250px", height:"150px", position:"relative"}}>
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {bank}
            </Typography>
          </CardContent>
          <CardActions>
            {content}
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default BankCard;
