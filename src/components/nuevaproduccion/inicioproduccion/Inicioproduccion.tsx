import "./Inicioproduccion.css";
import logoAlercoProduccion from "../../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import Header from "../../header/Header";
import { useLocation, useNavigate } from "react-router-dom";

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

const Inicioproduccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showPopup, setShowPopup] = useState(false);

  // Recuperar el producto seleccionado desde Produccionpendiente o inicializar desde Nueva Producción
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      const parsedProduct: Item = JSON.parse(storedProduct);

      // Inicializar la tabla con el producto seleccionado
      setSelectedItems([parsedProduct]);

      // Asignar las unidades a producir al valor de "damagedQuantity" si existe, sino usar "quantity"
      setQuantities({
        [`${parsedProduct.productCode}${parsedProduct.lot}`]:
          parsedProduct.damagedQuantity || parsedProduct.quantity,
      });

      // Limpiar el producto almacenado en localStorage una vez cargado
      localStorage.removeItem("selectedProduct");
    } else if (location.state?.selectedItems) {
      const initialItems: Item[] = location.state.selectedItems || [];
      setSelectedItems(initialItems);
      setQuantities(
        initialItems.reduce((acc, item) => {
          acc[item.productCode + item.lot] = item.quantity;
          return acc;
        }, {} as { [key: string]: number })
      );
    }
  }, [location.state]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const headers = [
    "Codigo del producto",
    "Descripcion",
    "Lote",
    "CUM",
    "Fecha de caducidad",
    "Cantidad",
    "Fecha de produccion",
    "Serial",
    "Unidades a producir",
  ];

  const handlevolernuevaproduccion = () => {
    navigate("/nuevaproduccion", { state: { selectedItems, quantities } });
  };

  const handlefindeproduccion = () => {
    const rows = selectedItems.map((item, itemIndex) => {
      const key = item.productCode + item.lot;
      return [
        item.productCode,
        item.description,
        item.lot,
        item.cum,
        new Date(item.expiredDate).toLocaleDateString(),
        item.quantity,
        new Date().toLocaleDateString(),
        `Serial-${itemIndex}`,
        quantities[key],
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "produccion.csv";
    a.click();
    URL.revokeObjectURL(url);

    navigate("/esperaproduccion", { state: { selectedItems, quantities } });
  };

  const incrementQuantity = (key: string, maxQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.min(prev[key] + 1, maxQuantity), // No exceder la cantidad máxima
    }));
  };

  const decrementQuantity = (key: string) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(prev[key] - 1, 0), // Asegurarse de que la cantidad no sea negativa
    }));
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    maxQuantity: number
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= maxQuantity) {
      setQuantities((prev) => ({
        ...prev,
        [key]: value,
      }));
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
          <h2>Inicio para la producción</h2>
        </div>
        <div className="datos-seleccionados">
          <div className="fila">
            {headers.map((header: string, index: number) => (
              <div key={index} className="celda-header">
                {header}
              </div>
            ))}
          </div>
          {selectedItems.map((item: Item, itemIndex: number) => {
            const key = item.productCode + item.lot;
            return (
              <div key={itemIndex} className="fila">
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
                  value={new Date().toLocaleDateString()}
                  readOnly
                />
                <input
                  className="celda col-2"
                  value={`Serial-${itemIndex}`}
                  readOnly
                />
                <div className="celda col-3 contador">
                  <button onClick={() => decrementQuantity(key)}>-</button>
                  <input
                    type="number"
                    value={quantities[key]}
                    onChange={(e) =>
                      handleQuantityChange(e, key, item.quantity)
                    }
                    max={item.quantity} // Establecer el valor máximo en la cantidad
                  />
                  <button onClick={() => incrementQuantity(key, item.quantity)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}
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
      <div className="contenedor-botones-salir-y-continuar">
        <button
          className="boton-continuar-nueva-prudccion"
          onClick={handlefindeproduccion}
        >
          <span>Continuar</span>
        </button>
        <div className="styled-wrapper-continuar-nueva-prudccion">
          <button
            className="button-continuar-nueva-prudccion"
            onClick={handlevolernuevaproduccion}
          >
            <div className="button-box-continuar-nueva-prudccion">
              <span className="button-elem-continuar-nueva-prudccion"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inicioproduccion;
