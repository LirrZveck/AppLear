import Header from "../../header/Header";
import "./Finproduccion.css";
import logoAlercoProduccion from "../../images/Alear_Logo-1-1-1-1.png";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Item {
  productCode: string;
  lot: string;
  description: string;
  quantity: number;
  expiredDate: string;
  cum: string;
  warehouse: string;
}

const Finproduccion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems: Item[] = location.state?.selectedItems || [];
  const quantities: { [key: string]: number } =
    location.state?.quantities || {};

  const [showPopup, setShowPopup] = useState(false);
  const [damagedQuantity, setDamagedQuantity] = useState<number | null>(null);
  const [netQuantity, setNetQuantity] = useState<number | null>(null);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDamagedChange = (value: number) => {
    const totalProduced = Object.values(quantities).reduce(
      (acc, cur) => acc + cur,
      0
    );

    const validDamagedQuantity = Math.max(0, Math.min(value, totalProduced));
    const calculatedNetQuantity = totalProduced - validDamagedQuantity;

    setDamagedQuantity(validDamagedQuantity);
    setNetQuantity(calculatedNetQuantity);
  };

  const totalProduced = Object.values(quantities).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const handleSaveData = () => {
    if (damagedQuantity === null || damagedQuantity === 0) return;

    const newTableData = selectedItems.map((item, index) => {
      const key = item.productCode + item.lot;
      return {
        ...item,
        damagedQuantity,
        netQuantity,
        totalProduced,
      };
    });

    const storedData = localStorage.getItem("produccionPendiente");
    const existingData = storedData ? JSON.parse(storedData) : [];
    const updatedData = [...existingData, ...newTableData];
    console.log("Data to be sent to Produccionpendiente:", updatedData); // Agrega este console.log
    localStorage.setItem("produccionPendiente", JSON.stringify(updatedData)); // Guardar en localStorage
  };

  const handleFinishProduction = () => {
    handleSaveData();
    navigate("/");
  };

  const handleStartNewProduction = () => {
    handleSaveData();
    navigate("/nuevaproduccion");
  };

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Fin de la producción</h2>
        </div>

        <div className="produccion-tabla">
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
                "Unidades a producir",
              ].map((header: string, index: number) => (
                <div key={index} className="celda-header">
                  {header}
                </div>
              ))}
            </div>
            {selectedItems.map((item: Item, index: number) => {
              const key = item.productCode + item.lot;
              const quantityProduced = quantities[key];
              return (
                <div key={index} className="fila">
                  <div className="celda col-1">{item.productCode}</div>
                  <div className="celda col-2">{item.description}</div>
                  <div className="celda col-1">{item.lot}</div>
                  <div className="celda col-2">{item.cum}</div>
                  <div className="celda col-1">
                    {new Date(item.expiredDate).toLocaleDateString()}
                  </div>
                  <div className="celda col-2">{item.quantity}</div>
                  <div className="celda col-1">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="celda col-2">{`Serial-${index}`}</div>
                  <div className="celda col-2">{quantityProduced}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="input-group-cantidades">
          <div className="input-item">
            <label htmlFor="cantidad-producida">Cantidad producida</label>
            <input
              type="number"
              id="cantidad-producida"
              value={totalProduced}
              readOnly
            />
          </div>

          <div className="input-item">
            <label htmlFor="productos-danados">Productos dañados</label>
            <input
              type="number"
              id="productos-danados"
              value={damagedQuantity !== null ? damagedQuantity : ""}
              onChange={(e) =>
                handleDamagedChange(Math.abs(parseInt(e.target.value, 10) || 0))
              }
            />
          </div>

          <div className="input-item">
            <label htmlFor="produccion-neta">Producción neta</label>
            <input
              type="number"
              id="produccion-neta"
              value={netQuantity !== null ? netQuantity : ""}
              readOnly
            />
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={handleFinishProduction}
            className="button boton-continuar-nueva-prudccion"
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
          <button
            onClick={handleStartNewProduction}
            className="button botoniniciarproduccion"
          >
            Iniciar otra producción
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo funciona el final de producción?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vel dolor egestas, scelerisque nunc et, iaculis neque.
                Donec et lorem non ligula euismod hendrerit ut non lorem.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Finproduccion;
