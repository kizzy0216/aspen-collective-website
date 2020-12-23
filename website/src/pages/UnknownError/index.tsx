import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import { urls } from "../../routing";
import ErrorImage from "../../assets/error.svg";
import { Container, Title, Description } from "./style";
import { sleep } from "../../helpers";
const UnknownError: React.FC = () => {
  const { push } = useHistory();

  useEffect(() => {
    const wait = async () => {
      await sleep(5000);
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
          width="94"
          src={ErrorImage}
          alt="Success"
        />
        <Title>Oops, something went wrong.</Title>
        <Description>
          Please wait and try submitting your transaction again. If the problem
          persists, contact support.{" "}
        </Description>
      </Container>
    </Page>
  );
};

export default UnknownError;
