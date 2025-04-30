import Header from "../header/Header";
import "./Produccionpendiente.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Item {
  productCode: string;
  lot: string;
  description: string;
  quantity: number;
  expiredDate: string;
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
      localStorage.setItem("produccionPendiente", JSON.stringify(updatedData)); // Actualizar localStorage
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

  console.log("Data received in Produccionpendiente:", newTableData);

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Productos pendientes por producir</h2>
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
                "Productos dañados",
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
                <div className="celda col-2">{item.damagedQuantity}</div>
                <div className="celda col-1">
                  <input
                    type="radio"
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
          <button onClick={handleRenew} className="button">
            Renovar
          </button>
          <button onClick={handleExit} className="button">
            Salir
          </button>
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
