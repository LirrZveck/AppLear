import Header from "../../header/Header";
import "./Finproduccion.css";
import logoAlercoProduccion from "../../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Item {
  product_code: string;
  lot: string;
  description: string;
  quantity: number;
  expired_date: string;
  cum: string;
  warehouse: string;
  total_produced?: number;
  damaged_quantity?: number;
  remaining_products?: number;
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

  // --- Carga automática de la cantidad producida ---
  useEffect(() => {
    const totalProducido = Object.values(quantities).reduce(
      (acc, cur) => acc + cur,
      0
    );
    setCantidadProducida(totalProducido);
  }, [quantities]);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

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
  };

  const handleDamagedChange = (input: string) => {
    const value = parseInt(input, 10);
    if (isNaN(value)) {
      setDamagedQuantity(null);
      setNetQuantity(null);
      return;
    }

    const totalProduced = cantidadProducida || 0;
    const validDamagedQuantity = Math.max(0, Math.min(value, totalProduced));
    setDamagedQuantity(validDamagedQuantity);
    setNetQuantity(
      totalProduced > 0 ? totalProduced - validDamagedQuantity : null
    );
  };

  const handleSaveData = async () => {
    if (cantidadProducida === null || damagedQuantity === null) {
      alert("Debes completar todos los campos antes de continuar");
      return false;
    }

    const cantidadTotal = cantidadProducida || 0;
    const cantidadDanada = damagedQuantity || 0;
    const productosRestantes = cantidadTotal - cantidadDanada;

    const reportData = {
      product_code: selectedItems[0]?.product_code,
      description: selectedItems[0]?.description,
      total_produced: cantidadTotal,
      damaged_quantity: cantidadDanada,
      remaining_products: productosRestantes,
    };

    try {
      console.log("📌 Enviando reporte al backend:", reportData);
      await axios.post(
        "http://localhost:3000/Products/saveProductionReport",
        reportData
      );
      console.log("✅ Informe guardado en la BD");
      return true;
    } catch (error) {
      console.error("❌ Error guardando informe:", error);
      alert("Error al guardar el informe de producción");
      return false;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- FUNCIÓN ACTUALIZADA ---
  const handleFinishProduction = async () => {
    if (!selectedItems[0]) {
      alert("Debes seleccionar un producto antes de finalizar la producción.");
      return;
    }
    if (netQuantity === null || damagedQuantity === null) {
      alert(
        "Por favor, introduce la cantidad de productos dañados (puede ser 0)."
      );
      return;
    }

    // Primero guardar el reporte
    const reportSaved = await handleSaveData();
    if (!reportSaved) return;

    // Preparar datos para el nuevo endpoint
    const productToFinalize = selectedItems[0];
    const finalizationData = {
      productCode: productToFinalize.product_code,
      lot: productToFinalize.lot,
      originalQuantity: productToFinalize.quantity,
      netQuantity: netQuantity,
      damagedQuantity: damagedQuantity,
    };

    // Llamar al nuevo endpoint de finalización
    try {
      console.log("🎬 Enviando solicitud de finalización:", finalizationData);
      await axios.post(
        "http://localhost:3000/Products/BIQ/finalize-production",
        finalizationData
      );

      alert("Producción finalizada exitosamente.");
      navigate("/"); // Redirigir al inicio
    } catch (error) {
      console.error("❌ Error en la finalización:", error);
      alert("Error al procesar la finalización de la producción.");
    }
  };

  // --- FUNCIÓN ACTUALIZADA ---
  const handleStartNewProduction = async () => {
    if (!selectedItems[0]) {
      // Si no hay item actual, simplemente ir a nueva producción
      navigate("/nuevaproduccion");
      return;
    }
    if (netQuantity === null || damagedQuantity === null) {
      alert(
        "Por favor, introduce la cantidad de productos dañados (puede ser 0) antes de continuar."
      );
      return;
    }

    // Guardar el reporte de la producción actual
    const reportSaved = await handleSaveData();
    if (!reportSaved) return;

    // Finalizar la producción actual
    const productToFinalize = selectedItems[0];
    const finalizationData = {
      productCode: productToFinalize.product_code,
      lot: productToFinalize.lot,
      originalQuantity: productToFinalize.quantity,
      netQuantity: netQuantity,
      damagedQuantity: damagedQuantity,
    };

    try {
      await axios.post(
        "http://localhost:3000/Products/BIQ/finalize-production",
        finalizationData
      );

      // Navegar a nueva producción solo si la finalización fue exitosa
      navigate("/nuevaproduccion");
    } catch (error) {
      console.error("❌ Error en la finalización:", error);
      alert(
        "Error al finalizar la producción actual antes de iniciar una nueva."
      );
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
          <h2>Fin de la producción</h2>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
            onClick={handleOpenPopup}
          ></svg>
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
              const key = item.product_code + item.lot;
              const quantityProduced = quantities[key];
              return (
                <div key={index} className="fila">
                  <div className="celda col-1">{item.product_code}</div>
                  <div className="celda col-2">{item.description}</div>
                  <div className="celda col-1">{item.lot}</div>
                  <div className="celda col-2">{item.cum}</div>
                  <div className="celda col-1">
                    {new Date(item.expired_date).toLocaleDateString()}
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
              readOnly
            />
          </div>

          <div className="input-item">
            <label htmlFor="productos-danados">Productos dañados</label>
            <input
              type="number"
              id="productos-danados"
              value={damagedQuantity !== null ? damagedQuantity : ""}
              onChange={(e) => handleDamagedChange(e.target.value)}
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
      </section>
    </div>
  );
};

export default Finproduccion;
