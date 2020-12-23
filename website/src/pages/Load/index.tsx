import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import LoadingImage from "../../assets/Loading.gif";
import { Container, Title, Description } from "./style";
import { transferUte } from "../../helpers";
import { getItem, removeAll, setItem } from "../../helpers/storage";

const Load: React.FC = () => {
  const { push } = useHistory();

  useEffect(() => {
    if (
      !getItem("KeyStore") ||
      !getItem("ReceiverKey") ||
      !getItem("SendAmount")
    )
      push(urls.start);
    else {
      if (getItem("Balance") < getItem("SendAmount")) push(urls.balanceError);
      else {
        const isRepresentative = getItem("IsRepresentative");
        const payload = {
          keyStore: JSON.parse(getItem("KeyStore")),
          toAddress: getItem("ReceiverKey"),
          amount: getItem("SendAmount"),
          isTestingCenterUser: isRepresentative,
        };
        transferUte(payload).then((res) => {
          setItem("Success", true);
          if (res.data && res.status) push(urls.success);
          else push(urls.unknownError);
        });
      }
    }
  }, []);
  return (
    <Page
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <img
          style={{ marginTop: "7.881vh" }}
          width="120"
          height="120"
          src={LoadingImage}
          alt="Loading..."
        />
        <Title>Hang Tight! </Title>
        <Description>
          We are proccessing your payment. This can take up to two minutes.
        </Description>
      </Container>
    </Page>
  );
};

export default Load;
