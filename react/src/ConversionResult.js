import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ConversionResult = ({ amount, currencyFrom, currencyTo, result }) => {
  return (
    <>
      <Row className="font mt-3 size">
        <Col>
          <span>{currencyFrom} </span>
          {amount}
          <span> = </span>
          {currencyTo}
          <span> {result.toFixed(2)}</span>
        </Col>
      </Row>

      <></>
    </>
  );
};

export default ConversionResult;
