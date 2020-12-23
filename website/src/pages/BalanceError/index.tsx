import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Page from "../../components/Page";
import { urls } from "../../routing";
import {
  Container,
  UTEInput,
  UTEContainer,
  UTELabel,
  Question,
  BottomContainer,
} from "./style";
import { getItem } from "../../helpers/storage";
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
      backgroundColor: "#fff",
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

const BalanceError: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [canPay, setPayability] = useState<boolean>(false);
  const [ute, setUTE] = useState<number>();

  const onGoBack = () => {
    push(urls.root);
  };

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
        <Question>You don’t have enough UTE Tokens for this payment.</Question>

        <BottomContainer>
          <Button
            onClick={onGoBack}
            className={classes.buttonContinue}
            variant="contained"
            color="secondary"
          >
            Go Back
          </Button>
        </BottomContainer>
      </Container>
    </Page>
  );
};

export default BalanceError;
