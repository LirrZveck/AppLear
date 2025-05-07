import Header from "../header/Header";
import "./Produccionpendiente.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Item {
  product_code: string;
  lot: string;
  description: string;
  quantity: number;
  expiredd_date: string;
  cum: string;
  warehouse: string;
  damagedQuantity?: number;
  netQuantity?: number;
  totalProduced?: number;
}

const Produccionpendiente = () => {
  const [newTableData, setNewTableData] = useState<Item[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Índice del producto seleccionado
  const [showPopup, setShowPopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null); // Índice del producto a eliminar
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("produccionPendiente");
    if (storedData) {
      setNewTableData(JSON.parse(storedData));
    }
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setItemToDelete(null); // Limpiar el producto a eliminar si se cancela
  };

  const handleDeleteItem = (index: number) => {
    setItemToDelete(index); // Guardar el índice del producto a eliminar
    setShowPopup(true); // Mostrar el popup de confirmación
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      const updatedData = [...newTableData];
      updatedData.splice(itemToDelete, 1); // Eliminar el producto
      setNewTableData(updatedData);
      localStorage.setItem("produccionPendiente", JSON.stringify(updatedData));
    }
    handleClosePopup(); // Cerrar el popup
  };

  const handleSelectProduct = (index: number) => {
    setSelectedIndex(index); // Guardar el índice del producto seleccionado
  };

  const handleRenew = () => {
    if (selectedIndex === null) {
      setShowPopup(true); // Mostrar popup si no se ha seleccionado ningún producto
    } else {
      const selectedItem = newTableData[selectedIndex]; // Producto seleccionado

      // Guardar el producto seleccionado en localStorage
      if (selectedItem) {
        localStorage.setItem("selectedProduct", JSON.stringify(selectedItem));
      }

      // Navegar a "inicioproduccion"
      navigate("/inicioproduccion");
    }
  };

  const handleExit = () => {
    navigate("/");
  };
  const [showPopupTwo, setShowPopupTwo] = useState(false);

  const handleOpenPopupTwo = () => {
    setShowPopupTwo(true);
  };

  const handleClosePopupTwo = () => {
    setShowPopupTwo(false);
  };

  console.log("Data received in Produccionpendiente:", newTableData);

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer" id="h2-produccion-pendiente">
          <h2>Productos pendientes por producir</h2>

          {showPopupTwo && (
            <div className="popup-overlay">
              <div className="popup">
                <button className="close-button" onClick={handleClosePopupTwo}>
                  X
                </button>
                <h2>¿Cómo funciona los productos pendientes?</h2>
                <p>
                  En este sitio encontraremos los diferentes productos que, por
                  alguna razón, se les acabó el inventario, no se completó la
                  operación y/o quedaron faltantes por algún otro motivo. Lo que
                  haremos será escoger una de las dos casillas, ya sea para
                  renovar el proceso de creación del producto o borrarlo para{" "}
                  <b>SIEMPRE</b> de esta sección.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="produccion-tabla">
          <h3>Producción Detalles</h3>
          <div className="datos-seleccionados">
            <div className="fila">
              {[
                "Codigo del producto",
                "Descripcion",
                "Lote",
                "CUM",
                "Fecha de caducidad",
                "Cantidad",
                "Fecha de produccion",
                "Serial",
                "Seleccionar",
                "Eliminar",
              ].map((header: string, index: number) => (
                <div key={index} className="celda-header">
                  {header}
                </div>
              ))}
            </div>
            {newTableData.map((item: Item, index: number) => (
              <div key={index} className="fila">
                <div className="celda col-1">{item.product_code}</div>
                <div className="celda col-2">{item.description}</div>
                <div className="celda col-1">{item.lot}</div>
                <div className="celda col-2">{item.cum}</div>
                <div className="celda col-1">
                  {new Date(item.expiredd_date).toLocaleDateString()}
                </div>
                <div className="celda col-2">{item.quantity}</div>
                <div className="celda col-1">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="celda col-2">{`Serial-${index}`}</div>

                <div className="celda col-1">
                  <input
                    type="checkbox"
                    name="selectedProduct"
                    onChange={() => handleSelectProduct(index)}
                    checked={selectedIndex === index}
                  />
                </div>
                <div className="celda col-1">
                  <button
                    className="eliminar-boton"
                    onClick={() => handleDeleteItem(index)}
                  >
                    {/* Espacio para agregar el SVG */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button
            className="boton-continuar-nueva-prudccion"
            onClick={handleRenew}
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
          {/* <button onClick={handleRenew} className="button">
            Renovar
          </button> */}
          <div className="styled-wrapper-continuar-nueva-prudccion">
            <button
              className="button-continuar-nueva-prudccion"
              onClick={handleExit}
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
          {/* <button onClick={handleExit} className="button">
            Salir
          </button> */}
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>¿Estás seguro de eliminar esta producción?</h2>
              <div className="popup-buttons">
                <button onClick={confirmDelete}>Sí</button>
                <button onClick={handleClosePopup}>No</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Produccionpendiente;
