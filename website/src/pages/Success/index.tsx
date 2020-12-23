import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import SuccessImage from "../../assets/success.svg";
import { Container, Title } from "./style";
import { sleep } from "../../helpers";
import { removeAll, getItem, removeItem } from "../../helpers/storage";
const Success: React.FC = () => {
  const { push } = useHistory();
  const [amount, setAmount] = useState<string | number | null>(null);
  useEffect(() => {
    setAmount(parseFloat(getItem("SendAmount")).toFixed(2));
    const wait = async () => {
      await sleep(5000);
      // removeItem("Balance");
      removeItem("Success");
      // removeItem("TransactionHistory");
      // removeItem("SendAmount");
      // removeItem("ReceiverKey");
      push(urls.root);
    };
    wait();
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
          width="150"
          src={SuccessImage}
          alt="Success"
        />
        <Title>Success! </Title>
        <Title>You paid {amount} UTE Tokens</Title>
      </Container>
    </Page>
  );
};

export default Success;
