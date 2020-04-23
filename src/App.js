import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [num1, setNum1] = useState("0");
  const [operation, setOperation] = useState("");
  const [num2, setNum2] = useState("");

  const OP_INVALIDA = "operação inválida";

  function changeDisplay(number) {
    const newNumber =
      display === "0" || display === OP_INVALIDA
        ? `${number}`
        : number !== "." || (number === "." && display.indexOf(".") === -1)
        ? display + number
        : display;

    setDisplay(newNumber);
    if (operation) {
      return setNum2(newNumber);
    }
    return setNum1(newNumber);
  }

  function executeOperation() {
    const funcoes = {
      add: () => parseFloat(num1) + parseFloat(num2),
      sub: () => parseFloat(num1) - parseFloat(num2),
      mul: () => parseFloat(num1) * parseFloat(num2),
      div: () =>
        num2 !== "0" ? parseFloat(num1) + parseFloat(num2) : undefined,
    };
    if (num1 && num2 && operation) {
      const resultado = funcoes[operation];
      if (resultado) {
        return setDisplay(resultado);
      }
      setDisplay(OP_INVALIDA);
      setNum1("");
      setNum2("");
      setOperation("");
    }
  }

  function setOp(op) {
    if (num2) {
      executeOperation();
    }
    setNum1(display);
    setNum2("");
    setOperation(op);
    setDisplay("0");
  }

  return (
    <div className="App">
      <div className="calculator">
        <button className="ce" onClick={() => setDisplay("0")}>
          CE
        </button>
        <div className="display">
          <span>{display}</span>
        </div>
        <button onClick={() => changeDisplay(7)}>7</button>
        <button onClick={() => changeDisplay(8)}>8</button>
        <button onClick={() => changeDisplay(9)}>9</button>
        <button onClick={() => setOp("add")}>+</button>
        <button onClick={() => changeDisplay(4)}>4</button>
        <button onClick={() => changeDisplay(5)}>5</button>
        <button onClick={() => changeDisplay(6)}>6</button>
        <button onClick={() => setOp("sub")}>-</button>
        <button onClick={() => changeDisplay(1)}>1</button>
        <button onClick={() => changeDisplay(2)}>2</button>
        <button onClick={() => changeDisplay(3)}>3</button>
        <button onClick={() => setOp("mul")}>*</button>
        <button onClick={() => changeDisplay(0)}>0</button>
        <button onClick={() => changeDisplay(".")}>,</button>
        <button onClick={() => executeOperation()}>=</button>
        <button onClick={() => setOp("div")}>/</button>
      </div>
    </div>
  );
}

export default App;
