import { useEffect, useState } from "react";

import "./App.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import ConversionResult from "./ConversionResult";

function App() {
  const [rates, setRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");

  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const API_KEY = "473fb3dea705f29bb782a276c614b8f7";

  useEffect(getRates, []);

  function getRates() {
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((dataRates) => {
        console.log(dataRates.rates);
        setRates(dataRates.rates);

        setCurrencies(Object.keys(dataRates.rates));
      });
  }

  const getCotizacion = (currency) => rates[currency];

  const convert = () => {
    const cotizacionFrom = getCotizacion(currencyFrom);
    const cotizacionTo = getCotizacion(currencyTo);

    console.log(cotizacionFrom);
    console.log(cotizacionTo);

    const result = amount * (cotizacionTo / cotizacionFrom);

    console.log(result);

    return result;
  };

  const isValid = () => {
    if (amount && currencyFrom && currencyTo) {
      return true;
    }
  };

  const getCurrencies = () =>
    currencies.map((currency) => <option value={currency}>{currency}</option>);

  const handleComponent = () => {
    return isValid() ? (
      <ConversionResult
        currencyTo={currencyTo}
        currencyFrom={currencyFrom}
        amount={amount}
        result={convert()}
      ></ConversionResult>
    ) : (
      <div></div>
    );
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyFrom = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleCurrencyTo = (event) => {
    setCurrencyTo(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <h1 className="font mt-3">Currency Converter</h1>
        </Row>
        <Row className="mt-3 align-items-center">
          <Col xs={3} sm={2} md={1} className="col-1 pl-0">
            <label className="font">Amount</label>
          </Col>

          <Col xs={6} sm={3} className="col-3">
            <InputGroup size="lg">
              <Form.Control
                onChange={handleAmount}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={3} className="col-2 mt-3 mt-sm-0">
            <Form.Control
              as="select"
              size="lg"
              onChange={handleCurrencyFrom}
              value={currencyFrom}
            >
              {getCurrencies()}
            </Form.Control>
          </Col>
          <Col xs={4} sm={3} className="col-2 mt-3 mt-sm-0">
            <Form.Control
              as="select"
              size="lg"
              onChange={handleCurrencyTo}
              value={currencyTo}
            >
              {getCurrencies()}
            </Form.Control>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>{handleComponent()}</Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
