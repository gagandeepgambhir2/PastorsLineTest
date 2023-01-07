import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "react-bootstrap";

import ModalA from "../components/ModalA";
import ModalB from "../components/ModalB";

const Home = () => {
  const [modalAShow, setModalAShow] = useState(false);
  const [modalBShow, setModalBShow] = useState(false);
  const history = useHistory();

  return (
    <div className="wrapper">
      <Button
        onClick={() => {
          history.push("/?modal=a");
          setModalAShow(true);
        }}
        className="mr-4 cursor-pointer btn-a"
      >
        Button A
      </Button>
      <Button
        onClick={() => {
          history.push("/?modal=b");
          setModalBShow(true);
        }}
        className="cursor-pointer btn-b"
      >
        Button B
      </Button>

      <ModalA
        show={modalAShow}
        onHide={() => setModalAShow(false)}
        switchModal={() => {
          history.push("/?modal=b");
          setModalAShow(false);
          setModalBShow(true);
        }}
      />

      <ModalB
        show={modalBShow}
        onHide={() => setModalBShow(false)}
        switchModal={() => {
          history.push("/?modal=a");
          setModalBShow(false);
          setModalAShow(true);
        }}
      />
    </div>
  );
};

export default Home;
