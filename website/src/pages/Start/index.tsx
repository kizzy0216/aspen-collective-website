import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Page from "../../components/Page";
import { urls } from "../../routing";
import BackgroundImage from "../../assets/background.png";
import OverlayImage from "../../assets/overlay.png";
import LogoImage from "../../assets/logo2.svg";
import {
  Background,
  Container,
  Logo,
  LogoTextSmall,
  LogoTextBig,
  LogoTextMedium,
  BottomContainer,
} from "./style";
import { getNewWallet, getUteBalance } from "../../helpers";
import { setItem, getItem } from "../../helpers/storage";
import { IKeyStore } from "../../models";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  darkPink: {
    "&.MuiButton-containedSecondary": {
      backgroundColor: "#B5396C",
      height: "48px",
      borderRadius: "40px",
      width: "83.2%",
      marginBottom: "56px",
    },
  },
}));

const Start: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [keyStore, setKeyStore] = useState<IKeyStore>({
    publicKey: "",
    secretKey: "",
    publicKeyHash: "",
    curve: 0,
    storeType: 0,
    seed: "",
    derivationPath: undefined,
  });

  const getStarted = async () => {
    getNewWallet().then((res) => {
      if(res.status){
        setKeyStore(res.data as IKeyStore);
        setItem("KeyStore", JSON.stringify(res.data));
        push(urls.root);
      } else {
        push(urls.root);
      }
    });
    // const user = {
    //   publicKey: 'edpkuBrXoZjqUJYGwdcVzavHdzegSpsVxKxB7Q2Qh84w4gjVeZEtND',
    //   secretKey: 'edskS7qMxf1JjAyuFZaeUh8A45n4yDV9g3Tzi1UCNUbmSpR9BJHao2PZp8X7ktpMZdaChF8mEcnYfMdVZYb5oVKojUKCVD2MLp',
    //   publicKeyHash: 'tz1ftjbNYuugj3MjgN3tB1avuQnyA6hRZgt6',
    //   curve: 0,
    //   storeType: 0,
    //   seed: 'conduct obey initial trash laugh notable funny salute weapon language verify ramp clump curtain venue have remove fashion economy human angry beach action rate',
    //   derivationPath: undefined
    // }
    // setItem("KeyStore", JSON.stringify(user));
    // push(urls.root);
  };

  useEffect(() => {
  }, [keyStore]);
  return (
    <Page style={{ alignItems: "center", justifyContent: "center" }}>
      <Background backgroundImage={BackgroundImage}></Background>
      <Container backgroundImage={OverlayImage}>
        <Logo src={LogoImage} alt="logo" />
        <LogoTextSmall>Aspen Collective Trust</LogoTextSmall>
        <LogoTextBig>Aspen Collective</LogoTextBig>
        <LogoTextMedium>UTE Token Wallet</LogoTextMedium>
        <BottomContainer>
          <Button
            onClick={getStarted}
            className={classes.darkPink}
            variant="contained"
            color="secondary"
          >
            Get Started
          </Button>
          <LogoTextMedium style={{ marginBottom: "64px" }}>
            Thank you for keeping Aspen safe!
          </LogoTextMedium>
        </BottomContainer>
      </Container>
    </Page>
  );
};

export default Start;
