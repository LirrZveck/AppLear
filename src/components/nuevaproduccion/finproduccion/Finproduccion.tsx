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
  const [cantidadProducida, setCantidadProducida] = useState<number | null>(
    null
  );

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCantidadProducidaChange = (value: number) => {
    const maxCantidad = Object.values(quantities).reduce(
      (acc, cur) => acc + cur,
      0
    );

    if (value > maxCantidad) {
      alert(`La cantidad producida no puede ser mayor a ${maxCantidad}.`);
      setCantidadProducida(maxCantidad);
    } else {
      setCantidadProducida(value);
    }

    handleDamagedChange(damagedQuantity || 0); // Recalcular valores
  };

  const handleDamagedChange = (value: number) => {
    const totalProduced =
      cantidadProducida ||
      Object.values(quantities).reduce((acc, cur) => acc + cur, 0);

    const validDamagedQuantity = Math.max(0, Math.min(value, totalProduced));
    const calculatedNetQuantity = totalProduced - validDamagedQuantity;

    setDamagedQuantity(validDamagedQuantity);
    setNetQuantity(calculatedNetQuantity);
  };

  const handleSaveData = () => {
    if (cantidadProducida === null || damagedQuantity === null) return;

    const produccionPendienteData = selectedItems.map((item) => ({
      ...item,
      damagedQuantity,
      netQuantity,
      totalProduced: cantidadProducida,
    }));

    const storedPendiente = localStorage.getItem("produccionPendiente");
    const existingPendiente = storedPendiente
      ? JSON.parse(storedPendiente)
      : [];
    const updatedPendiente = [...existingPendiente, ...produccionPendienteData];
    localStorage.setItem(
      "produccionPendiente",
      JSON.stringify(updatedPendiente)
    );

    const informesData = selectedItems.map((item) => {
      const remainingProducts =
        item.quantity -
        (quantities[item.productCode + item.lot] || item.quantity);

      return {
        description: item.description,
        totalProduced: item.quantity,
        damagedQuantity: damagedQuantity > 0 ? damagedQuantity : "N/A",
        remainingProducts:
          remainingProducts > 0 ? remainingProducts + damagedQuantity : "N/A",
        createdAt: new Date().toLocaleDateString(),
      };
    });

    const storedInformes = localStorage.getItem("informesProduccion");
    const existingInformes = storedInformes ? JSON.parse(storedInformes) : [];
    const updatedInformes = [...informesData, ...existingInformes];
    localStorage.setItem("informesProduccion", JSON.stringify(updatedInformes));
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
                "Código del producto",
                "Descripción",
                "Lote",
                "CUM",
                "Fecha de caducidad",
                "Cantidad",
                "Fecha de producción",
                "Serial",
                "Unidades a producir",
              ].map((header, index) => (
                <div key={index} className="celda-header">
                  {header}
                </div>
              ))}
            </div>
            {selectedItems.map((item, index) => {
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
              value={cantidadProducida !== null ? cantidadProducida : ""}
              onChange={(e) =>
                handleCantidadProducidaChange(
                  Math.abs(parseInt(e.target.value, 10) || 0)
                )
              }
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
          </button>
          <button
            onClick={handleStartNewProduction}
            className="button botoniniciarproduccion"
          >
            Iniciar otra producción
          </button>
        </div>
      </section>
    </div>
  );
};

export default Finproduccion;
