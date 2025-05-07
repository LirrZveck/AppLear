import "./Nuevaproduccion.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface StockMovement {
  message_id: string;
  message_date: string;
  message_type: string;
  message_user_id: string;
  logistics_center: string;
  items?: Array<Item>;
}

interface Item {
  product_code: string;
  lot: string;
  description: string;
  quantity: number;
  expired_date: string;
  cum: string;
  warehouse: string;
}

const Nuevaproduccion = () => {
  const location = useLocation();
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
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
    "Código del producto",
    "Descripción",
    "Lote",
    "CUM",
    "Fecha de caducidad",
    "Cantidad",
    "Fecha de producción",
    "Serial",
    "Seleccionar",
  ];

  // Obtener datos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/Products/BIQ/stockMovement")
      .then((response) => {
        console.log(
          "📌 Datos obtenidos del backend:",
          JSON.stringify(response.data, null, 2)
        );
        setStockMovements(response.data);
      })
      .catch((error) => console.error("❌ Error obteniendo datos:", error));
  }, []);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const handleClickHomePro = () => navigate("/");
  const handleConfirmSelection = () => {
    if (selectedItems.length === 0) {
      setWarningPopup(true); // 🔴 Muestra advertencia si no hay selección
    } else {
      navigate("/inicioproduccion", { state: { selectedItems } });
    }
  };
  const handleCloseWarningPopup = () => setWarningPopup(false);

  const handleCheckboxChange = (item: Item, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([item]); // Se permite solo un producto por tanda
    } else {
      setSelectedItems([]);
    }
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
            {headers.map((header, index) => (
              <div key={index} className="celda-header">
                {header}
              </div>
            ))}
          </div>
          {stockMovements.length > 0 &&
            stockMovements
              .flatMap((movement) => movement.items || [])
              .map((item, index) => (
                <div key={index} className="fila">
                  <input
                    className="celda col-1"
                    value={item.product_code}
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
                    value={
                      item.expired_date
                        ? new Date(item.expired_date).toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                  <input
                    className="celda col-2"
                    value={item.quantity.toString()}
                    readOnly
                  />
                  <input
                    className="celda col-1"
                    value={
                      stockMovements[0]?.message_date
                        ? new Date(
                            stockMovements[0]?.message_date
                          ).toLocaleDateString()
                        : ""
                    }
                    readOnly
                  />
                  <input
                    className="celda col-2"
                    value={`Serial-${index}`}
                    readOnly
                  />

                  <input
                    type="checkbox"
                    className="celda celdache-checkbox"
                    checked={selectedItems.some(
                      (i) =>
                        i.product_code === item.product_code &&
                        i.lot === item.lot
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(item, e.target.checked)
                    }
                  />
                </div>
              ))}
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
                strokeWidth="3"
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
                  {" "}
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
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo comienzo a iniciar producción?</h2>
              <p>
                Escoge el producto y marca la casilla. Sigue al siguiente paso
                con "Continuar".
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
              </button>
              <p>Por favor escoge primero una opción antes de continuar.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Nuevaproduccion;
