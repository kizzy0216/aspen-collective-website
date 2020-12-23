import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import useClipboard from "react-use-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import CopyImage from "../../assets/copy.svg";
import InfoImage from "../../assets/info.svg";
import CloseImage from "../../assets/close.svg";
import { store } from "../../components/Provider";
import { IKeyStore } from "../../models";
import { getItem } from "../../helpers/storage";
import {
  Container,
  Title,
  H1,
  H2,
  AddressContainer,
  CloseButton,
} from "./style";

const QRCodeGenerator: React.FC = () => {
  const { push } = useHistory();
  const [tezosAddress, setTezosAddress] = useState<string>("");
  const [isCopied, setCopied] = useClipboard(tezosAddress);
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
      style: {textAlign: "center"}
    });
  };
  const onClose = () => {
    push(urls.home);
  };
  useEffect(() => {
    const value = JSON.parse(getItem("KeyStore")).publicKeyHash;
    setTezosAddress(value);
  }, []);
  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <CloseButton onClick={onClose}>
          <img src={CloseImage} />
        </CloseButton>
        <Title>Scan QR Code to send UTE tokens to this recipient</Title>
        <QRCode size={150} value={tezosAddress} />,
        <AddressContainer>
          <H1>Your Tezos Address</H1>
          <img style={{ marginLeft: "5px" }} src={InfoImage} />
        </AddressContainer>
        <AddressContainer>
          <H2>{tezosAddress}</H2>
          <span onClick={onCopy} style={{ marginLeft: "5px" }}>
            <img src={CopyImage} />
          </span>
        </AddressContainer>
      </Container>
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
    </Page>
  );
};

export default QRCodeGenerator;
