import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { interval, Subject } from "rxjs";
import * as _ from 'lodash'
import { takeUntil } from "rxjs/operators";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Page from "../../components/Page";
import { urls } from "../../routing";
import ReceiveButtonIcon from "../../assets/receive.svg";
import SettingsButtonImage from "../../assets/more.svg";
import PayButtonIcon from "../../assets/pay.svg";
import { SessionService } from "../../services";
import {
  getNewWallet,
  getTezosBalance,
  getTransactions,
  getUteBalance,
} from "../../helpers";
import { store } from "../../components/Provider";
import {
  TopDecoration,
  H1,
  H2,
  SettingsButton,
  ActionButtonsContainer,
  ButtonIcon,
  Title,
  TransactionContainer,
  TransactionHistory,
  HintContainer,
  Hint,
  Link,
  Text,
  Card,
  DisabledText,
  Info,
  DateInfo,
  Amount,
} from "./style";

import Settings from "../Settings";
import { IKeyStore, TKeyStore } from "../../models";
import { getItem, setItem } from "../../helpers/storage";
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
      width: "312px",
      marginBottom: "56px",
    },
  },
  receiveButton: {
    "&.MuiButton-containedSecondary": {
      backgroundColor: "#A9CDDA",
      height: "72px",
      borderRadius: "20px",
      width: "124px",
      marginRight: "8.533333%",
    },
    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
    },
  },
  payButton: {
    "&.MuiButton-containedSecondary": {
      backgroundColor: "#B5396C",
      height: "72px",
      borderRadius: "20px",
      width: "124px",
    },
    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [keyStore, setKeyStore] = useState<TKeyStore>(null);
  const [uteBalance, setUTEBalance] = useState<number>(0);
  const [xtzBalance, setXTZBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [openSettings, setVisableSettings] = useState<boolean>(false);

  //fetch data every 30 secconds
  const fetchData = interval(30000);
  const destroy$ = new Subject();

  const showSettings = () => {
    setVisableSettings(true);
  };

  const onCloseSettings = () => {
    setVisableSettings(false);
  };

  const onPay = () => {
    push(urls.qrCodeScanner);
  };

  const onReceive = () => {
    push(urls.qrCodeGenerator);
  };

  const getDate = (timestamp: any): string => {
    const d = new Date(timestamp);
    return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + ", " + pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2);
  };

  const pad = (num: number, size: number): string => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  const History = ((_.sortBy(transactionHistory, (v) => { return v ? v.timestamp : 0 })).reverse()).map((x, i) => {
    if (x) {
      return (
        <Card key={i}>
          <div>
            <Info>
              {x.direction === "INCOMING"
                ? "Received UTE Tokens"
                : "Sent UTE Tokens"}
            </Info>
            <DateInfo>{getDate(x.timestamp)}</DateInfo>
          </div>
          <div>
            <Amount>
              {x.direction === "INCOMING"
                ? "+" + x.amount.toFixed(2) + " UTE"
                : "-" + x.amount.toFixed(2) + " UTE"}
            </Amount>
            <DateInfo>{x.direction === "INCOMING"
              ? x.source.substr(0, 6) + "..." + x.source.slice(-6)
              : x.destination.substr(0, 6) + "..." + x.destination.slice(-6)}</DateInfo>
          </div>
        </Card>
      );
    }
    else {
      return (
        <Card key={i}>
          <div>
            <Info>
              {"Received tokens from Aspen Collective Trust"}
            </Info>
            <DateInfo></DateInfo>
          </div>
          <Amount>
          </Amount>
        </Card>
      );
    }
  });
  useEffect(() => {
    if (!getItem("Balance") || !getItem("TransactionHistory")) {
      destroy$.complete();
      push(urls.root);
      return;
    }
    setUTEBalance(JSON.parse(getItem("Balance"))?.data);
    setTransactionHistory(JSON.parse(getItem("TransactionHistory"))?.data);
    setXTZBalance(JSON.parse(getItem("XTZBalance"))?.data);
    destroy$.next();
    fetchData.pipe(takeUntil(destroy$)).subscribe((val) => {
      SessionService.getUTEBalanceFromStorage().then((res) => {
        setItem("Balance", JSON.stringify(res));
        setUTEBalance(JSON.parse(getItem("Balance"))?.data);
      });
      SessionService.getTransactionHistoryFromStorage().then((res) => {
        setItem("TransactionHistory", JSON.stringify(res));
        setTransactionHistory(JSON.parse(getItem("TransactionHistory"))?.data);
      });
      SessionService.getXTZBalanceFromStorage().then((res) => {
        setItem("XTZBalance", JSON.stringify(res));
        setXTZBalance(JSON.parse(getItem("XTZBalance"))?.data);
      });
    });

    return () => {
      destroy$.next();
      destroy$.complete();
    };
  }, []);
  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Settings
        openSettings={openSettings}
        xtzBalance={xtzBalance}
        onCloseSettings={onCloseSettings}

      ></Settings>
      <TopDecoration>
        <SettingsButton>
          <ButtonIcon
            onClick={showSettings}
            src={SettingsButtonImage}
          ></ButtonIcon>
        </SettingsButton>
        <H1>Balance</H1>
        <H2>{uteBalance.toFixed(2)} UTE</H2>
      </TopDecoration>
      <ActionButtonsContainer>
        <Button
          className={classes.receiveButton}
          variant="contained"
          color="secondary"
          onClick={onReceive}
        >
          <ButtonIcon src={ReceiveButtonIcon}></ButtonIcon>
          Receive
        </Button>
        <Button
          className={classes.payButton}
          variant="contained"
          color="secondary"
          onClick={onPay}
        >
          <ButtonIcon src={PayButtonIcon}></ButtonIcon>
          Pay
        </Button>
      </ActionButtonsContainer>
      <TransactionContainer>
        <Title>Recent Transactions</Title>
        <TransactionHistory>
          {(!transactionHistory || transactionHistory.length <= 0) && (
            <DisabledText>No transactions yet.</DisabledText>
          )}
          {History}
        </TransactionHistory>
        {(!transactionHistory || transactionHistory.length <= 0) && (
          <HintContainer>
            <Hint>
              <Text>
                To receive UTE tokens, visit a participating Covid-19 testing
                center.
              </Text>
              <Link>Find a Testing Center</Link>
            </Hint>
            <Hint>
              <Text>Spend your tokens at our participating businesses!</Text>
              <Link>Find Participating Businesses</Link>
            </Hint>
          </HintContainer>
        )}
      </TransactionContainer>
    </Page>
  );
};

export default Home;
