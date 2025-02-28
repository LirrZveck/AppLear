import "./Nuevaproduccion.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState } from "react";
import Header from "../header/Header";
import stockData from "./Nuevaproduccion.json";
import { useNavigate, useLocation } from "react-router-dom";

interface StockMovement {
  messageID: string;
  messageDate: string;
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
  expiredDate: string;
  cum: string;
  warehouse: string;
}

const Nuevaproduccion = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>(
    location.state?.selectedItems || []
  );
  const [warningPopup, setWarningPopup] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningPosition, setWarningPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const navigate = useNavigate();
  const headers = [
    "Codigo del producto",
    "Descripcion",
    "Lote",
    "CUM",
    "Fecha de caducidad",
    "Cantidad",
    "Fecha de produccion",
    "Serial",
    "Seleccionar",
  ];

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCheckboxChange = (
    item: Item,
    isChecked: boolean,
    event: React.MouseEvent
  ) => {
    if (isChecked) {
      if (selectedItems.length > 0) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setWarningPosition({
          top: rect.top - 30,
          left: rect.left + rect.width / 2,
        });
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 4000);
      } else {
        setSelectedItems([item]);
      }
    } else {
      setSelectedItems([]);
    }
  };

  const handleClickHomePro = () => {
    navigate("/");
  };

  const handleConfirmSelection = () => {
    if (selectedItems.length === 0) {
      setWarningPopup(true);
    } else {
      navigate("/inicioproduccion", { state: { selectedItems } });
    }
  };

  const handleCloseWarningPopup = () => {
    setWarningPopup(false);
  };

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Nueva Producción</h2>
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
          </svg>
        </div>
        <div className="datos-seleccionados">
          <div className="fila">
            {headers.map((header: string, index: number) => (
              <div key={index} className="celda-header">
                {header}
              </div>
            ))}
          </div>
          {stockData.StockMovements.map(
            (stockMovement: StockMovement, stockIndex: number) =>
              stockMovement.items.map((item: Item, itemIndex: number) => (
                <div key={`${stockIndex}-${itemIndex}`} className="fila">
                  <input
                    className="celda col-1"
                    value={item.productCode}
                    readOnly
                  />
                  <input
                    className="celda col-2"
                    value={item.description}
                    readOnly
                  />
                  <input className="celda col-1" value={item.lot} readOnly />
                  <input className="celda col-2" value={item.cum} readOnly />
                  <input
                    className="celda col-1"
                    value={new Date(item.expiredDate).toLocaleDateString()}
                    readOnly
                  />
                  <input
                    className="celda col-2"
                    value={item.quantity.toString()}
                    readOnly
                  />
                  <input
                    className="celda col-1"
                    value={new Date(
                      stockMovement.messageDate
                    ).toLocaleDateString()}
                    readOnly
                  />
                  <input
                    className="celda col-2"
                    value={`Serial-${itemIndex}`}
                    readOnly
                  />
                  <input
                    type="checkbox"
                    className="celda celdache-checkbox"
                    checked={selectedItems.some(
                      (i) =>
                        i.productCode === item.productCode && i.lot === item.lot
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(item, e.target.checked, e)
                    }
                  />
                </div>
              ))
          )}
        </div>
        <div className="contenedor-botones-salir-y-continuar">
          <button
            className="boton-continuar-nueva-prudccion"
            onClick={handleConfirmSelection}
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
                <span className="button-elem-continuar-nueva-prudccion">
                  <div>{/* Aca van los svg */}</div>
                </span>
              </div>
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo comienzo a iniciar producción?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vel dolor egestas, scelerisque nunc et, iaculis neque.
                Donec et lorem non ligula euismod hendrerit ut non lorem.
              </p>
            </div>
          </div>
        )}
        {warningPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button
                className="close-button"
                onClick={handleCloseWarningPopup}
              >
                X
              </button>{" "}
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
              <p>Por favor escoge primero una opción antes de continuar</p>
            </div>
          </div>
        )}
        {showWarning && (
          <div
            className="warning-popup"
            style={{
              top: `${warningPosition.top}px`,
              left: `${warningPosition.left}px`,
              transform: "translate(-80%, 400%)",
            }}
          >
            Solo se puede un producto por tanda
          </div>
        )}
      </section>
    </div>
  );
};

export default Nuevaproduccion;
