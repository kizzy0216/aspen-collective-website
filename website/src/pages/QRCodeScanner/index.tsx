import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import CloseImage from "../../assets/close_white.svg";
import { Container, Overlay, Text, CloseButton, Header } from "./style";
import { setItem } from "../../helpers/storage";
import { sleep } from "../../helpers";
import { url } from "inspector";
const QRCodeScanner: React.FC = () => {
  const { push } = useHistory();
  const [token, setToken] = useState<string>("");
  const getStarted = () => {
    push(urls.home);
  };
  const handleScan = async (data) => {
    if (data) {
      setToken(data);
      setItem("ReceiverKey", data);
      await sleep(2000);
      push(urls.pay);
    }
  };
  const onClose = () => {
    push(urls.home);
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <Page style={{ alignItems: "center", justifyContent: "center" }}>
      <Container>
        <Header>
          <CloseButton onClick={onClose}>
            <img src={CloseImage} />
          </CloseButton>
        </Header>
        <QrReader
          delay={300}
          className="qr-scanner"
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <Overlay>
          <Text>Scan QR</Text>
          <p>{token}</p>
        </Overlay>
      </Container>
    </Page>
  );
};

export default QRCodeScanner;
