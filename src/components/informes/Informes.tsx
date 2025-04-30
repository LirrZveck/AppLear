import Header from "../header/Header";
import "./Informes.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface InformeData {
  description: string;
  totalProduced: number;
  damagedQuantity: number | string;
  remainingProducts: number | string;
  createdAt: string;
}

const Informes = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupedInformes, setGroupedInformes] = useState<{
    [key: string]: InformeData[];
  }>({});

  const navigateHomeInformes = useNavigate();

  const handleNavigateHomeInformes = () => {
    navigateHomeInformes("/");
  };

  useEffect(() => {
    const storedInformes = localStorage.getItem("informesProduccion");
    if (storedInformes) {
      const parsedInformes: InformeData[] = JSON.parse(storedInformes);

      // Agregar fecha de creación si no existe
      const updatedInformes = parsedInformes.map((item) => ({
        ...item,
        createdAt: item.createdAt || new Date().toLocaleDateString(),
      }));

      // Agrupar por fecha
      const informesByDate: { [key: string]: InformeData[] } = {};
      updatedInformes.forEach((item) => {
        if (!informesByDate[item.createdAt]) {
          informesByDate[item.createdAt] = [];
        }
        informesByDate[item.createdAt].unshift(item); // Añadir el nuevo producto arriba
      });

      setGroupedInformes(informesByDate);
      localStorage.setItem(
        "informesProduccion",
        JSON.stringify(updatedInformes)
      );
    }
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const exportToExcel = (data: InformeData[], date: string) => {
    const headers = [
      "Descripción",
      "Cantidad de productos",
      "Productos dañados",
      "Productos sobrantes",
    ];

    const rows = data.map((item) => [
      item.description,
      item.totalProduced,
      item.damagedQuantity,
      item.remainingProducts,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `informe_produccion_${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Header />
      <div className="logoProduccion">
        <img src={logoAlercoProduccion} alt="Logo Alerco Producción" />
      </div>
      <section>
        <div className="titulo-actividad-hacer">
          <h2>Informes sobre los productos</h2>
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

        {Object.keys(groupedInformes)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Ordena por fecha, más reciente primero
          .map((date) => (
            <div key={date} className="grupo-informes">
              <span className="fecha-informes">Producción de {date}</span>

              <div className="datos-informes">
                <div className="fila">
                  {[
                    "Descripción",
                    "Cantidad de productos",
                    "Productos dañados",
                    "Productos sobrantes",
                    "Descargar Informe",
                  ].map((header, index) => (
                    <div key={index} className="celda-header">
                      {header}
                    </div>
                  ))}
                </div>
                {groupedInformes[date].map((item, index) => (
                  <div key={index} className="fila fila-separada">
                    <div className="celda col-1">{item.description}</div>
                    <div className="celda col-2">{item.totalProduced}</div>
                    <div className="celda col-1">{item.damagedQuantity}</div>
                    <div className="celda col-2">{item.remainingProducts}</div>
                    <div className="celda col-1">
                      <button
                        onClick={() =>
                          exportToExcel(groupedInformes[date], date)
                        }
                        className="buttonDownload"
                      >
                        Descargar
                        {/* aca va el svg de botón */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo funciona la lista de informes?</h2>
              <p>
                Aquí puedes visualizar el resumen de la producción, agrupado por
                fecha de creación. Si deseas exportar los informes de un día
                específico, usa el botón de descarga correspondiente.
              </p>
            </div>
          </div>
        )}
      </section>
      <div className="contenedor-botones-salir-y-continuar">
        <div className="styled-wrapper-continuar-nueva-prudccion">
          <button
            className="button-continuar-nueva-prudccion"
            onClick={handleNavigateHomeInformes}
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
    </div>
  );
};

export default Informes;
