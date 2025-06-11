import Header from "../header/Header";
import "./Informes.css";
import logoAlercoProduccion from "../images/Alear_Logo-1-1-1-1.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface InformeData {
  id: number;
  productCode: string;
  description: string;
  totalProduced: number;
  damagedQuantity: number;
  remainingProducts: number;
  createdAt: string;
  reportDate: string;
}

const Informes = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [groupedInformes, setGroupedInformes] = useState<{
    [key: string]: InformeData[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigateHomeInformes = useNavigate();

  const handleNavigateHomeInformes = () => {
    navigateHomeInformes("/");
  };

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:3000/Products/getProductionReports"
        );

        console.log("Datos recibidos del backend:", response.data);

        const formatDate = (dateString: string) => {
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
              console.warn("Fecha inválida recibida:", dateString);
              return "Fecha desconocida";
            }
            return date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          } catch (e) {
            console.error("Error formateando fecha:", e);
            return "Fecha inválida";
          }
        };

        const informesByDate = response.data.reduce((acc: any, item: any) => {
          const fecha = formatDate(item.createdAt || item.created_at);

          if (!acc[fecha]) {
            acc[fecha] = [];
          }

          acc[fecha].push({
            id: item.id,
            productCode: item.productCode || item.product_code,
            description: item.description,
            totalProduced: item.totalProduced || item.total_produced || 0,
            damagedQuantity: item.damagedQuantity || item.damaged_quantity || 0,
            remainingProducts:
              item.remainingProducts || item.remaining_products || 0,
            createdAt: item.createdAt || item.created_at,
            reportDate: fecha,
          });

          return acc;
        }, {});

        console.log("Informes agrupados:", informesByDate);
        setGroupedInformes(informesByDate);
      } catch (error) {
        console.error("Error obteniendo informes:", error);
        setError("No se pudieron cargar los informes. Intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const exportToExcel = (data: InformeData[], fileName: string) => {
    try {
      const headers = [
        "Código Producto",
        "Descripción",
        "Total Producido",
        "Productos Dañados",
        "Productos Sobrantes",
        "Fecha de Producción",
      ];

      const rows = data.map((item) => [
        item.productCode,
        item.description,
        item.totalProduced,
        item.damagedQuantity,
        item.remainingProducts,
        item.reportDate,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((field) => `"${field}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `informe_produccion_${fileName.replace(/[\/\\]/g, "-")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generando CSV:", error);
      alert("Error al generar el archivo CSV");
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

        {isLoading ? (
          <div className="datos-informes">Cargando informes...</div>
        ) : error ? (
          <div className="datos-informes" style={{ color: "#dc2626" }}>
            {error}
          </div>
        ) : Object.keys(groupedInformes).length === 0 ? (
          <div className="datos-informes">No hay informes disponibles</div>
        ) : (
          Object.entries(groupedInformes)
            .sort(([dateA], [dateB]) => {
              const dateToNumber = (date: string) => {
                const [day, month, year] = date.split("/");
                return parseInt(year + month + day);
              };
              return dateToNumber(dateB) - dateToNumber(dateA);
            })
            .map(([date, reports]) => (
              <div key={date} className="grupo-informes">
                <span className="fecha-informes">Producción de {date}</span>
                <div className="datos-informes">
                  <div className="fila">
                    {[
                      "Código",
                      "Descripción",
                      "Producidos",
                      "Dañados",
                      "Sobrantes",
                      "Acciones",
                    ].map((header, index) => (
                      <div key={index} className="celda-header">
                        {header}
                      </div>
                    ))}
                  </div>
                  {reports.map((report) => (
                    <div key={report.id} className="fila fila-separada">
                      <div className="celda col-1">{report.productCode}</div>
                      <div className="celda col-2">{report.description}</div>
                      <div className="celda col-1">{report.totalProduced}</div>
                      <div className="celda col-1">
                        {report.damagedQuantity}
                      </div>
                      <div className="celda col-2">
                        {report.remainingProducts}
                      </div>
                      <div className="celda col-1">
                        <button
                          onClick={() =>
                            exportToExcel(
                              [report],
                              `${date}_${report.productCode}`
                            )
                          }
                          className="buttonDownload"
                        >
                          Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
              <h2>¿Cómo funciona la lista de informes?</h2>
              <p>
                Los informes se agrupan automáticamente por fecha de producción.
                Cada grupo muestra todos los productos fabricados en esa fecha,
                ordenados del más reciente al más antiguo. Puedes descargar los
                informes individualmente o todo el día completo.
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
