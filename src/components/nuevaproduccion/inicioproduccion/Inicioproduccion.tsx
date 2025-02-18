import "./Inicioproduccion.css";
import logoAlercoProduccion from "../../images/Alear_Logo-1-1-1-1.png";
import React, { useState } from "react";
import Header from "../../header/Header";
import { useLocation } from "react-router-dom";

const Inicioproduccion = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const formData: string[][] = location.state?.formData || [];
  const headers = [
    "Codigo del producto",
    "Descripcion",
    "Lote",
    "CUM",
    "Fecha de caducidad",
    "Cantidad",
    "Fecha de produccion",
    "Serial",
  ];

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Inicio para la producción</h2>{" "}
        </div>
        <div className="datos-seleccionados">
          <div className="fila">
            {headers.map((header, index) => (
              <div key={index} className="celda-header">
                {header}
              </div>
            ))}
          </div>
          {formData.length > 0 ? (
            formData.map((row: string[], rowIndex: number) => (
              <div key={rowIndex} className="fila">
                {row.map((cell: string, cellIndex: number) => (
                  <input
                    key={cellIndex}
                    className={`celda ${
                      rowIndex % 2 === 0 ? "col-1" : "col-2"
                    }`}
                    value={cell}
                    readOnly
                  />
                ))}
              </div>
            ))
          ) : (
            <p>No hay datos seleccionados.</p>
          )}
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
      </section>{" "}
      <div className="contenedor-botones-salir-y-continuar">
        <button className="boton-continuar-nueva-prudccion">
          <span>Iniciar</span>
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
          <button className="button-continuar-nueva-prudccion">
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

export default Inicioproduccion;
