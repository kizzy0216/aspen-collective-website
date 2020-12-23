import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Page from "../../components/Page";
import { urls } from "../../routing";
import BackgroundImage from "../../assets/background.png";
import { Container, UTEInput, UTEContainer, UTELabel, Question, BottomContainer } from "./style";
import { setItem } from "../../helpers/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttonContinue: {
    "&.MuiButton-containedSecondary": {
      backgroundColor: "#B5396C",
      height: "48px",
      borderRadius: "40px",
      width: "83.2%",
      maxWidth: "312px",
      textTransform: "none",
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#FFFFFF',
      border: '1px solid #B5396C',

      marginBottom: '32px',

      '&.Mui-disabled': {
        opacity: 0.6
      }
    },
  },
  buttonCancel: {
    "&.MuiButton-containedSecondary": {
      backgroundColor: "#fffdf8",
      height: "48px",
      borderRadius: "40px",
      width: "83.2%",
      maxWidth: "312px",
      textTransform: "none",
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#B44975',
      border: '1px solid #B5396C',
    },
  },
}));

const Pay: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [canPay, setPayability] = useState<boolean>(false);
  const [ute, setUTE] = useState<number>();

  const onUTEChange = (event: any) => {
    const value: number = event.target.value as number;
    setUTE(value);
  };

  const onPay = () =>{
    setItem("SendAmount", ute);
    push(urls.confirmation);
  }

  const onCancel = () =>{
    push(urls.home);
  }

  useEffect(() => {
    setPayability(ute && ute > 0 ? true : false);
  }, [ute]);
  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Question>How many UTE tokens would you like to send?</Question>
        <UTEContainer>
          <UTEInput
            type="number"
            placeholder="00.00"
            onChange={onUTEChange}
          ></UTEInput>
          <UTELabel className={canPay ? "pay-input payable" : "pay-input"}>
            UTE
          </UTELabel>
        </UTEContainer>
        <BottomContainer>
          <Button
            disabled={!canPay}
            onClick={onPay} 
            className={classes.buttonContinue}
            variant="contained"
            color="secondary"
          >
            Continue
          </Button>
          <Button
            onClick={onCancel} 
            className={classes.buttonCancel}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </BottomContainer>
      </Container>
    </Page>
  );
};

export default Pay;
