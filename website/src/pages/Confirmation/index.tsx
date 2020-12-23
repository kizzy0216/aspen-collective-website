import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Page from "../../components/Page";
import { urls } from "../../routing";
import ArrowImage from "../../assets/arrow.svg";
import {
  Container,
  UTEInput,
  UTEContainer,
  DisabledText,
  Question,
  BottomContainer,
  TextMedium,
  TextSmall,
} from "./style";
import { setItem, getItem } from "../../helpers/storage";

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
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "24px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#FFFFFF",
      border: "1px solid #B5396C",

      marginBottom: "32px",

      "&.Mui-disabled": {
        opacity: 0.6,
      },
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
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "24px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#B44975",
      border: "1px solid #B5396C",
    },
  },
}));

const Confirmation: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [uteBalance, setUTEBalance] = useState<string | number>();
  const [amount, setAmount] = useState<string | number>();
  const [receiverKey, setReceiverKey] = useState<string>("");

  const onConfirm = () => {
    if(parseFloat(JSON.parse(getItem("Balance"))?.data) < parseFloat(getItem("SendAmount"))){
      push(urls.balanceError);
      return;
    }
    push(urls.load);
  };

  const onCancel = () => {
    push(urls.home);
  };

  const getReceiverKey = () => {
    const start = receiverKey.substring(0, 6);
    const end = receiverKey.substr(receiverKey.length - 6, 6);
    const res = start + "..." + end;

    return res;
  };

  useEffect(() => {
    // parseFloat(JSON.parse(getItem("Balance"))?.data) <= 0 ||

    if (
      !getItem("ReceiverKey") ||
      !getItem("Balance") ||
      !getItem("SendAmount") ||
      parseFloat(getItem("SendAmount")) <= 0
    ) {
      push(urls.root);
      return;
    }
    setUTEBalance(parseFloat(JSON.parse(getItem("Balance")).data).toFixed(2));
    setReceiverKey(getItem("ReceiverKey"));
    setAmount(parseFloat(getItem("SendAmount")).toFixed(2));
  }, []);
  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Question>Please confirm this payment</Question>
        <UTEContainer>
          <DisabledText>Amount</DisabledText>
          <UTEInput>{amount} UTE</UTEInput>
          <img src={ArrowImage} />
          <DisabledText>To Recipient</DisabledText>
          <TextMedium>{getReceiverKey()}</TextMedium>
          <TextMedium style={{ marginTop: "2.9556vh" }}>
            Available Balance: {uteBalance} UTE
          </TextMedium>
        </UTEContainer>
        <BottomContainer>
          <TextSmall>This can take up to 2 minutes to process.</TextSmall>
          <Button
            onClick={onConfirm}
            className={classes.buttonContinue}
            variant="contained"
            color="secondary"
          >
            Confirm and Pay
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

export default Confirmation;
