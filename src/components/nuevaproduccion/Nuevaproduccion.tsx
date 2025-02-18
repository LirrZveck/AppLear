import Header from "../header/Header";
import "./Nuevaproduccion.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface StockMovement {
  messageID: string;
  messageDate: Date;
  messageType: string;
  messageUserID: string;
  movementOrder: {
    LogisticsCenter: string;
  };
  items: Array<Item>;
}

interface Item {
  productCode: string;
  lot: string;
  description: string;
  quantity: number;
  expiredDate: Date;
  cum: string;
  warehouse: string;
}

const Nuevaproduccion = () => {
  const navigateHomePro = useNavigate();
  const navigateInicioProduccion = useNavigate();

  const handleClickHomePro = () => {
    navigateHomePro("/");
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [rows, setRows] = useState<number>(1);
  const [data, setData] = useState<Item[]>([]);
  const [formData, setFormData] = useState<string[][]>([Array(8).fill(" ")]);
  const examples = [" ", "ejemplo 1", "ejemplo 2", "ejemplo 3"];

  useEffect(() => {
    const storedRows = localStorage.getItem("rows");
    const storedTimestamp = localStorage.getItem("timestamp");
    const now = Date.now();

    if (
      storedRows &&
      storedTimestamp &&
      now - parseInt(storedTimestamp, 10) < 20 * 60 * 1000
    ) {
      setRows(parseInt(storedRows, 10));
      setFormData(
        JSON.parse(
          localStorage.getItem("formData") ||
            '[[" ", " ", " ", " ", " ", " ", " ", " "]]'
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rows", rows.toString());
    localStorage.setItem("timestamp", Date.now().toString());
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [rows, formData]);

  useEffect(() => {
    // Simulando la llamada a la API
    const fetchData = async () => {
      // Aquí iría la llamada real a la API
      setData([
        {
          productCode: "P001",
          lot: "L001",
          description: "Producto 1",
          quantity: 10,
          expiredDate: new Date(),
          cum: "CUM001",
          warehouse: "W001",
        },
        {
          productCode: "P002",
          lot: "L002",
          description: "Producto 2",
          quantity: 20,
          expiredDate: new Date(),
          cum: "CUM002",
          warehouse: "W002",
        },
      ]);
    };

    fetchData();
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const addRow = () => {
    setRows(rows + 1);
    setFormData([...formData, Array(8).fill(" ")]);
  };

  const removeRow = () => {
    if (rows > 1) {
      setRows(rows - 1);
      setFormData(formData.slice(0, -1));
    }
  };

  const handleSelectChange = (
    value: string,
    rowIndex: number,
    colIndex: number
  ) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][colIndex] = value;
    setFormData(updatedFormData);
  };

  const handleContinue = () => {
    const isAnyOptionSelected = formData.flat().some((value) => value !== " ");
    const areAllOptionsFilled = formData.flat().every((value) => value !== " ");

    if (!isAnyOptionSelected || (isAnyOptionSelected && !areAllOptionsFilled)) {
      setShowValidationPopup(true);
    } else {
      navigateInicioProduccion("/Inicioproduccion", { state: { formData } });
    }
  };

  const renderRows = () => {
    const rowArray = [];
    for (let i = 0; i < rows; i++) {
      rowArray.push(
        <div className="apartados" key={i}>
          {[
            "Codigo del producto",
            "Descripcion",
            "Lote",
            "CUM",
            "Fecha de caducidad",
            "Cantidad",
            "Fecha de produccion",
            "Serial",
          ].map((titulo, colIndex) => (
            <div className="apartado" key={colIndex}>
              {i === 0 && <label>{titulo}</label>}
              <select
                className="inputApartado"
                value={formData[i] ? formData[i][colIndex] : " "}
                onChange={(e) =>
                  handleSelectChange(e.target.value, i, colIndex)
                }
              >
                {examples.map((example, exampleIndex) => (
                  <option key={exampleIndex} value={example}>
                    {example}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }
    return rowArray;
  };

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Selecciona los productos y la cantidad que quieras producir</h2>{" "}
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
            onClick={handleOpenPopup}
          >
            <path
              d="M10.9201 9.71229C10.9201 9.11585 11.4036 8.63234 12 8.63234C12.5965 8.63234 13.08 9.11585 13.08 9.71229C13.08 10.078 12.8989 10.4014 12.6182 10.598C12.3475 10.7875 12.0204 11.0406 11.7572 11.3585C11.491 11.68 11.25 12.117 11.25 12.6585C11.25 13.0727 11.5858 13.4085 12 13.4085C12.4142 13.4085 12.75 13.0727 12.75 12.6585C12.75 12.5835 12.7807 12.4743 12.9125 12.3152C13.0471 12.1526 13.2442 11.9908 13.4785 11.8267C14.143 11.3615 14.58 10.588 14.58 9.71229C14.58 8.28742 13.4249 7.13234 12 7.13234C10.5751 7.13234 9.42006 8.28742 9.42006 9.71229C9.42006 10.1265 9.75584 10.4623 10.1701 10.4623C10.5843 10.4623 10.9201 10.1265 10.9201 9.71229Z"
              fill="#383dd5"
            />
            <path
              d="M11.9993 13.9165C11.5851 13.9165 11.2493 14.2523 11.2493 14.6665C11.2493 15.0807 11.5851 15.4165 11.9993 15.4165C12.4135 15.4165 12.75 15.0807 12.75 14.6665C12.75 14.2523 12.4135 13.9165 11.9993 13.9165Z"
              fill="#124d83"
            />
            <path
              d="M4.75 3.75C3.50736 3.75 2.5 4.75736 2.5 6V21.7182C2.5 22.0141 2.67391 22.2823 2.94401 22.403C3.21411 22.5237 3.52993 22.4743 3.75032 22.277L7.635 18.7984H19.25C20.4926 18.7984 21.5 17.791 21.5 16.5484V6C21.5 4.75736 20.4926 3.75 19.25 3.75H4.75ZM4 6C4 5.58579 4.33579 5.25 4.75 5.25H19.25C19.6642 5.25 20 5.58579 20 6V16.5484C20 16.9626 19.6642 17.2984 19.25 17.2984H7.34827C7.16364 17.2984 6.9855 17.3665 6.84795 17.4897L4 20.0399V6Z"
              fill="#124d83"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>{" "}
        </div>
        {renderRows()}
        <div className="button-container">
          <button className="add-row-button" onClick={addRow}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M10.9453 20.5C11.3327 21.0667 11.8027 21.5725 12.338 22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V9.62105C4.5 9.02455 4.73686 8.45247 5.15851 8.03055L10.5262 2.65951C10.9482 2.23725 11.5207 2 12.1177 2H17.25C18.4926 2 19.5 3.00736 19.5 4.25V10.3782C19.0266 10.1599 18.5241 9.99391 18 9.88753V4.25C18 3.83579 17.6642 3.5 17.25 3.5H12.248L12.2509 7.4984C12.2518 8.74166 11.2442 9.75 10.0009 9.75H6V19.75C6 20.1642 6.33579 20.5 6.75 20.5H10.9453ZM10.7488 4.55876L7.05986 8.25H10.0009C10.4153 8.25 10.7512 7.91389 10.7509 7.49947L10.7488 4.55876Z"
                fill="#ffffff"
                fillRule="evenodd"
                clipRule="evenodd"
              />
              <path
                d="M15.8751 14.9999C15.8751 14.5857 16.2109 14.2499 16.6251 14.2499C17.0393 14.2499 17.3751 14.5857 17.3751 14.9999V15.8749H18.2502C18.6644 15.8749 19.0002 16.2107 19.0002 16.6249C19.0002 17.0391 18.6644 17.3749 18.2502 17.3749H17.3751V18.25C17.3751 18.6643 17.0393 19 16.6251 19C16.2109 19 15.8751 18.6643 15.8751 18.25V17.3749H15C14.5858 17.3749 14.25 17.0391 14.25 16.6249C14.25 16.2107 14.5858 15.8749 15 15.8749H15.8751V14.9999Z"
                fill="#ffffff"
              />
              <path
                d="M11.25 16.625C11.25 13.6565 13.6565 11.25 16.625 11.25C19.5935 11.25 22 13.6565 22 16.625C22 19.5935 19.5935 22 16.625 22C13.6565 22 11.25 19.5935 11.25 16.625ZM16.625 12.75C14.4849 12.75 12.75 14.4849 12.75 16.625C12.75 18.7651 14.4849 20.5 16.625 20.5C18.7651 20.5 20.5 18.7651 20.5 16.625C20.5 14.4849 18.7651 12.75 16.625 12.75Z"
                fill="#ffffff"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="remove-row-button" onClick={removeRow}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M14.7223 12.7585C14.7426 12.3448 14.4237 11.9929 14.01 11.9726C13.5963 11.9522 13.2444 12.2711 13.2241 12.6848L12.9999 17.2415C12.9796 17.6552 13.2985 18.0071 13.7122 18.0274C14.1259 18.0478 14.4778 17.7289 14.4981 17.3152L14.7223 12.7585Z"
                fill="#ffffff"
              />
              <path
                d="M9.98802 11.9726C9.5743 11.9929 9.25542 12.3448 9.27577 12.7585L9.49993 17.3152C9.52028 17.7289 9.87216 18.0478 10.2859 18.0274C10.6996 18.0071 11.0185 17.6552 10.9981 17.2415L10.774 12.6848C10.7536 12.2711 10.4017 11.9522 9.98802 11.9726Z"
                fill="#ffffff"
              />
              <path
                d="M10.249 2C9.00638 2 7.99902 3.00736 7.99902 4.25V5H5.5C4.25736 5 3.25 6.00736 3.25 7.25C3.25 8.28958 3.95503 9.16449 4.91303 9.42267L5.54076 19.8848C5.61205 21.0729 6.59642 22 7.78672 22H16.2113C17.4016 22 18.386 21.0729 18.4573 19.8848L19.085 9.42267C20.043 9.16449 20.748 8.28958 20.748 7.25C20.748 6.00736 19.7407 5 18.498 5H15.999V4.25C15.999 3.00736 14.9917 2 13.749 2H10.249ZM14.499 5V4.25C14.499 3.83579 14.1632 3.5 13.749 3.5H10.249C9.83481 3.5 9.49902 3.83579 9.49902 4.25V5H14.499ZM5.5 6.5C5.08579 6.5 4.75 6.83579 4.75 7.25C4.75 7.66421 5.08579 8 5.5 8H18.498C18.9123 8 19.248 7.66421 19.248 7.25C19.248 6.83579 18.9123 6.5 18.498 6.5H5.5ZM6.42037 9.5H17.5777L16.96 19.7949C16.9362 20.191 16.6081 20.5 16.2113 20.5H7.78672C7.38995 20.5 7.06183 20.191 7.03807 19.7949L6.42037 9.5Z"
                fill="#ffffff"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo funciona el produccir un producto?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vel dolor egestas, scelerisque nunc et, iaculis neque.
                Donec et lorem non ligula euismod hendrerit ut non lorem.
              </p>
            </div>
          </div>
        )}
        {showValidationPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="svg-placeholder"> {/* SVG placeholder */}</div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0 0 0)"
              >
                <path
                  d="M9.0625 18.0453C9.01679 16.914 8.26885 15.8509 7.26013 14.8658C5.86655 13.5048 5 11.6029 5 9.49987C5 5.35781 8.35781 2 12.4999 2C16.6419 2 19.9997 5.35781 19.9997 9.49987C19.9997 11.6027 19.1333 13.5046 17.7399 14.8655C16.6988 15.8824 15.9355 16.9822 15.9355 18.1544V19.75C15.9355 20.9926 14.9282 22 13.6855 22H11.3125C10.0699 22 9.0625 20.9926 9.0625 19.75V18.0453ZM6.5 9.49987C6.5 6.18624 9.18624 3.5 12.4999 3.5C15.8135 3.5 18.4997 6.18624 18.4997 9.49987C18.4997 11.1824 17.8082 12.7021 16.6918 13.7925C15.9506 14.5164 15.1802 15.4257 14.7589 16.5H10.2412C9.81983 15.4258 9.04933 14.5165 8.30817 13.7927C7.19168 12.7023 6.5 11.1825 6.5 9.49987ZM10.5625 18.2129C10.564 18.1938 10.5647 18.1744 10.5647 18.1549C10.5647 18.1088 10.564 18.063 10.5625 18.0175V18H14.4355V19.75C14.4355 20.1642 14.0998 20.5 13.6855 20.5H11.3125C10.8983 20.5 10.5625 20.1642 10.5625 19.75V18.2129Z"
                  fill="#124d83"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
                <path
                  d="M1.75 9.5C1.75 9.08579 2.08579 8.75 2.5 8.75H3.5C3.91421 8.75 4.25 9.08579 4.25 9.5C4.25 9.91421 3.91421 10.25 3.5 10.25H2.5C2.08579 10.25 1.75 9.91421 1.75 9.5Z"
                  fill="#124d83"
                />
                <path
                  d="M4.21484 3.85048C3.85612 3.64337 3.39743 3.76628 3.19032 4.125C2.98322 4.48372 3.10612 4.94241 3.46484 5.14952L4.33087 5.64952C4.68959 5.85663 5.14828 5.73372 5.35539 5.375C5.56249 5.01628 5.43959 4.55759 5.08087 4.35048L4.21484 3.85048Z"
                  fill="#124d83"
                />
                <path
                  d="M3.19032 14.875C2.98322 14.5163 3.10612 14.0576 3.46484 13.8505L4.33087 13.3505C4.68959 13.1434 5.14828 13.2663 5.35539 13.625C5.56249 13.9837 5.43959 14.4424 5.08087 14.6495L4.21484 15.1495C3.85612 15.3566 3.39743 15.2337 3.19032 14.875Z"
                  fill="#124d83"
                />
                <path
                  d="M21.5 8.75C21.0858 8.75 20.75 9.08579 20.75 9.5C20.75 9.91421 21.0858 10.25 21.5 10.25H22.5C22.9142 10.25 23.25 9.91421 23.25 9.5C23.25 9.08579 22.9142 8.75 22.5 8.75H21.5Z"
                  fill="#124d83"
                />
                <path
                  d="M19.6454 13.625C19.8525 13.2663 20.3112 13.1434 20.6699 13.3505L21.5359 13.8505C21.8947 14.0576 22.0176 14.5163 21.8105 14.875C21.6034 15.2337 21.1447 15.3566 20.7859 15.1495L19.9199 14.6495C19.5612 14.4424 19.4383 13.9837 19.6454 13.625Z"
                  fill="#124d83"
                />
                <path
                  d="M19.9199 4.35048C19.5612 4.55759 19.4383 5.01628 19.6454 5.375C19.8525 5.73372 20.3112 5.85663 20.6699 5.64952L21.5359 5.14952C21.8947 4.94241 22.0176 4.48372 21.8105 4.125C21.6034 3.76628 21.1447 3.64337 20.7859 3.85048L19.9199 4.35048Z"
                  fill="#124d83"
                />
              </svg>
              <p>Por favor selecciona una opción para cada casilla</p>
              <button
                className="close-button"
                onClick={() => setShowValidationPopup(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </section>
      <div className="contenedor-botones-salir-y-continuar">
        <button
          className="boton-continuar-nueva-prudccion"
          onClick={handleContinue}
        >
          <span>Continuar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 74 74"
            height="34"
            width="34"
          >
            <circle
              stroke-width="3"
              stroke="white"
              r="35.5"
              cy="37"
              cx="37"
            ></circle>
            <path
              fill="white"
              d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
            ></path>
          </svg>
        </button>
        <div className="styled-wrapper-continuar-nueva-prudccion">
          <button
            className="button-continuar-nueva-prudccion"
            onClick={handleClickHomePro}
          >
            <div className="button-box-continuar-nueva-prudccion">
              <span className="button-elem-continuar-nueva-prudccion">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon-continuar-nueva-prudccion"
                >
                  <path
                    fill="black"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                  ></path>
                </svg>
              </span>
              <span className="button-elem-continuar-nueva-prudccion">
                <svg
                  fill="black"
                  viewBox="0 0  24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon-continuar-nueva-prudccion"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nuevaproduccion;
