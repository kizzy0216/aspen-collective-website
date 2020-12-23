import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import { SessionService } from "../../services";
import LogoImage from "../../assets/logo.svg";
import { Logo, LogoText } from "./style";
import { getItem, setItem } from "../../helpers/storage";
import { sleep } from "../../helpers";

const Splash: React.FC = () => {
  const { push } = useHistory();

  const checkSession = async () => {
    await sleep(2500);

    if (!SessionService.isSessionActive) push(urls.start);
    else {
      SessionService.getUTEBalanceFromStorage().then((res) => {
        if (res === undefined || res === null) push(urls.start);

        setItem("Balance", JSON.stringify(res));
        push(urls.home);
      });
      SessionService.getTransactionHistoryFromStorage().then((res) => {
        setItem("TransactionHistory", JSON.stringify(res));
      });
      SessionService.getXTZBalanceFromStorage().then((res)=>{
        setItem("XTZBalance", JSON.stringify(res));
      })
    }
  };

  checkSession();

  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#163854",
      }}
    >
      <Logo src={LogoImage} alt="logo" />
      <LogoText>Aspen Collective Trust</LogoText>
    </Page>
  );
};

export default Splash;
