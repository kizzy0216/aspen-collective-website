import React, { useEffect, useState } from "react";
import useClipboard from "react-use-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { urls } from "../../routing";
import BackButtonImage from "../../assets/back.svg";
import CopyImage from "../../assets/copy.svg";

import {
  Container,
  Content,
  Header,
  BackButton,
  ItemContainer,
  Item,
  Title,
  Value,
  Copy,
  Separator,
  Description,
  Link,
} from "./style";
import { getItem, setItem } from "../../helpers/storage";
const useStyles = makeStyles((theme) => ({
  noBorder: {
    "&": {
      border: "none !important",
    },
  },
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: 0,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#6FCCAC",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#6FCCAC",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 22,
    height: 22,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    height: "24px",
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}));

interface IProps {
  openSettings: boolean;
  xtzBalance: number;
  onCloseSettings: () => void;
}
const Settings: React.FC<IProps> = (props: IProps) => {
  const [isRepresentative, setRepresentative] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isCopied, setCopied] = useClipboard(token);

  const { openSettings, onCloseSettings, xtzBalance } = props;
  const { push } = useHistory();
  const classes = useStyles();

  const backHome = () => {
    console.log("back home...", openSettings);
  };

  const onOpenSettings = () => {};
  useEffect(() => {
    if (!getItem("KeyStore")) return;
    if (getItem("IsRepresentative")) {
      const value: boolean = getItem("IsRepresentative") == "true" ? true : false;
      setRepresentative(value);
    } else {
      setRepresentative(false);
      setItem("IsRepresentative", false);
    }
    const publicToken = JSON.parse(getItem("KeyStore")).publicKeyHash;
    setToken(publicToken);
  }, []);

  useEffect(()=>{
  })
  const onCopy = () => {
    setCopied();
    toast.success("Copied to clipboard!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { textAlign: "center" },
    });
  };

  const handleSettingsChange = () => {
    const toggle = !isRepresentative;
    setItem("IsRepresentative", toggle);
    setRepresentative(!isRepresentative);
  };
  return (
    <Container className={openSettings ? "settings show" : "settings"}>
      <Header>
        <BackButton onClick={() => onCloseSettings()}>
          <img src={BackButtonImage} />
        </BackButton>
        Settings
      </Header>
      <Content>
        <ItemContainer>
          <Item>Account</Item>
          <Title>Your Tezos Address</Title>
          <Value>
            {token}
            <Copy onClick={onCopy}>
              <img src={CopyImage} />
            </Copy>
          </Value>
          <Description>
            Your Tezos address is a string of characters that represents the
            destination for your payments on the Tezos blockchain. You can track
            your transactions and balance using this address. Please quote this
            address when reaching out to support.
          </Description>
          <Separator></Separator>
          <Title>XTZ Balance</Title>
          <Value>{xtzBalance.toFixed(2)} XTZ</Value>
          <Separator></Separator>
          <Title>
            Aspen Collective Representative
            <Switch
              classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
              }}
              checked={isRepresentative}
              onChange={handleSettingsChange}
              color="primary"
              name="representative"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Title>
          <Description>
            Enabling allows testing centers to fund accounts with an inital
            balance. Only enable if you are an Aspen Collective Representative.
            Other users may be blocked from spending their tokens and will need
            to contact support.
          </Description>
        </ItemContainer>
        <ItemContainer>
          <Item>Resources</Item>
          <Link className={classes.noBorder}>www.aspencollectivetrust.org</Link>
          <Link>Find a Testing Center</Link>
          <Link>Find Participating Businesses</Link>
          <Link>Contact Support</Link>
        </ItemContainer>
      </Content>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Settings;
