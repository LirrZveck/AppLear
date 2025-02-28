import React, { useState } from "react";
import Header from "../header/Header";
import "./Home.css";
import logoAlerco from "../images/Alear_Logo-1-1-1-1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigateProduccion = useNavigate();

  const handleClickProduccion = () => {
    navigateProduccion("/nuevaproduccion");
  };
  const navigatePendiente = useNavigate();

  const handleClickPendiente = () => {
    navigatePendiente("/produccionpendiente");
  };
  const navigateInformes = useNavigate();

  const handleClickInformes = () => {
    navigateInformes("/Informes");
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Header />
      <section className="section-home-logo">
        <img src={logoAlerco} alt="Logo Alerco" />
      </section>{" "}
      <section className="section-title-circles-container-home">
        <div className="circle-line-container">
          <div className="circle filled" onClick={handleOpenPopup}>
            <div className="step-text">{/*paso 1*/}</div>{" "}
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M7.74996 5.75C7.74996 4.50736 8.75732 3.5 9.99996 3.5H14C15.2426 3.5 16.25 4.50736 16.25 5.75V6.5H19.25C20.4926 6.5 21.5 7.50736 21.5 8.75V11H14.5816C14.3007 10.4088 13.6981 10 13 10H11C10.3019 10 9.69927 10.4088 9.41841 11H2.49976V8.75C2.49976 7.50736 3.50712 6.5 4.74976 6.5H7.74996V5.75ZM9.24996 6.5H14.75V5.75C14.75 5.33579 14.4142 5 14 5H9.99996C9.58574 5 9.24996 5.33579 9.24996 5.75V6.5Z"
                fill="#ffff"
              />
              <path
                d="M2.49976 12.5V17.75C2.49976 18.9926 3.50712 20 4.74976 20H19.25C20.4926 20 21.5 18.9926 21.5 17.75V12.5H14.5816C14.3007 13.0912 13.6981 13.5 13 13.5H11C10.3019 13.5 9.69927 13.0912 9.41841 12.5H2.49976Z"
                fill="#e1e1e8"
              />
            </svg>
          </div>
          <div className="line half-filled"></div>
          <div className="line"></div>
          <div className="circle">
            {/* <div className="step-text">paso 2</div> */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M16.693 8.33833C16.809 8.61864 16.7448 8.94127 16.5302 9.15573L12.5605 13.1229C12.4231 13.2773 12.2229 13.3745 12 13.3745C11.776 13.3745 11.575 13.2763 11.4376 13.1207L7.46988 9.15575C7.25527 8.94129 7.19101 8.61866 7.30706 8.33834C7.42312 8.05802 7.69663 7.87523 8.00002 7.87523H11.25L11.25 4.87451C11.25 4.4603 11.5858 4.12451 12 4.12451C12.4142 4.12451 12.75 4.4603 12.75 4.87451L12.75 7.87523H16C16.3034 7.87523 16.5769 8.05801 16.693 8.33833Z"
                fill="#ffffff"
              />
              <path
                d="M4.25 9.87451H6.12857C6.20974 9.99606 6.30353 10.1108 6.40957 10.2168L10.3528 14.1573C10.7636 14.5985 11.3496 14.8745 12 14.8745C12.6486 14.8745 13.233 14.6001 13.6436 14.1611L17.5905 10.2167C17.6965 10.1108 17.7903 9.99604 17.8714 9.87451H19.75C20.9926 9.87451 22 10.8819 22 12.1245V18.1245C22 19.3672 20.9926 20.3745 19.75 20.3745H4.25C3.00736 20.3745 2 19.3672 2 18.1245V12.1245C2 10.8819 3.00736 9.87451 4.25 9.87451Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="line"></div>
          <div className="circle">
            {/* <div className="step-text">paso 3</div> */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M11.25 2.62451C10.0074 2.62451 9 3.63187 9 4.87451V6.75308C9.12153 6.83423 9.23627 6.92802 9.34221 7.03403L13.2866 10.9809C13.7256 11.3915 14 11.976 14 12.6245C14 13.2749 13.724 13.8609 13.2828 14.2717L9.34227 18.2149C9.23631 18.321 9.12155 18.4148 9 18.4959V20.3745C9 21.6172 10.0074 22.6245 11.25 22.6245H17.25C18.4926 22.6245 19.5 21.6172 19.5 20.3745V4.87451C19.5 3.63187 18.4926 2.62451 17.25 2.62451H11.25Z"
                fill="#ffffff"
              />
              <path
                d="M7.46382 7.93158C7.74413 7.81552 8.06676 7.87978 8.28122 8.09437L12.2484 12.0641C12.4028 12.2015 12.5 12.4016 12.5 12.6245C12.5 12.8485 12.4018 13.0495 12.2462 13.187L8.28123 17.1547C8.06678 17.3693 7.74415 17.4335 7.46383 17.3175C7.18351 17.2014 7.00072 16.9279 7.00072 16.6245L7.00072 13.3745L4 13.3745C3.58579 13.3745 3.25 13.0387 3.25 12.6245C3.25 12.2103 3.58579 11.8745 4 11.8745L7.00072 11.8745L7.00072 8.62453C7.00072 8.32114 7.1835 8.04764 7.46382 7.93158Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div className="line"></div>
          <div className="circle">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                d="M16.693 9.1607C16.5769 9.44101 16.3034 9.62379 16 9.62379L12.75 9.62379L12.75 12.6245C12.75 13.0387 12.4142 13.3745 12 13.3745C11.5858 13.3745 11.25 13.0387 11.25 12.6245L11.25 9.62379H8.00002C7.69663 9.62379 7.42312 9.44101 7.30706 9.16068C7.19101 8.88036 7.25527 8.55773 7.46988 8.34328L11.4376 4.37836C11.575 4.22269 11.776 4.12451 12 4.12451C12.2229 4.12451 12.4231 4.22174 12.5605 4.3761L16.5302 8.3433C16.7448 8.55776 16.809 8.88038 16.693 9.1607Z"
                fill="#ffffff"
              />
              <path
                d="M4.25 9.87451H5.98476C6.36253 10.6358 7.14137 11.1238 8 11.1238L9.75 11.1238L9.75 12.6245C9.75 13.8672 10.7574 14.8745 12 14.8745C13.2426 14.8745 14.25 13.8672 14.25 12.6245L14.25 11.1238H16C16.8586 11.1238 17.6375 10.6358 18.0152 9.87451H19.75C20.9926 9.87451 22 10.8819 22 12.1245V18.1245C22 19.3672 20.9926 20.3745 19.75 20.3745H4.25C3.00736 20.3745 2 19.3672 2 18.1245V12.1245C2 10.8819 3.00736 9.87451 4.25 9.87451Z"
                fill="#ffffff"
              />
            </svg>
            {/* <div className="step-text">paso 4</div> */}
          </div>
        </div>
      </section>
      <div className="titulo-actividad-hacer">
        <h2>¿Que actividad quieres hacer hoy?</h2>{" "}
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
      </div>{" "}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <h2>¿Cómo funciona el primer paso?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel dolor egestas, scelerisque nunc et, iaculis neque. Donec et
              lorem non ligula euismod hendrerit ut non lorem.
            </p>
          </div>
        </div>
      )}
      <section className="categorias-escoger-actividad">
        <div className="contenedor-actividades" onClick={handleClickProduccion}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M10.9453 20.5C11.3327 21.0667 11.8027 21.5725 12.338 22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V9.62105C4.5 9.02455 4.73686 8.45247 5.15851 8.03055L10.5262 2.65951C10.9482 2.23725 11.5207 2 12.1177 2H17.25C18.4926 2 19.5 3.00736 19.5 4.25V10.3782C19.0266 10.1599 18.5241 9.99391 18 9.88753V4.25C18 3.83579 17.6642 3.5 17.25 3.5H12.248L12.2509 7.4984C12.2518 8.74166 11.2442 9.75 10.0009 9.75H6V19.75C6 20.1642 6.33579 20.5 6.75 20.5H10.9453ZM10.7488 4.55876L7.05986 8.25H10.0009C10.4153 8.25 10.7512 7.91389 10.7509 7.49947L10.7488 4.55876Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            <path
              d="M15.8751 14.9999C15.8751 14.5857 16.2109 14.2499 16.6251 14.2499C17.0393 14.2499 17.3751 14.5857 17.3751 14.9999V15.8749H18.2502C18.6644 15.8749 19.0002 16.2107 19.0002 16.6249C19.0002 17.0391 18.6644 17.3749 18.2502 17.3749H17.3751V18.25C17.3751 18.6643 17.0393 19 16.6251 19C16.2109 19 15.8751 18.6643 15.8751 18.25V17.3749H15C14.5858 17.3749 14.25 17.0391 14.25 16.6249C14.25 16.2107 14.5858 15.8749 15 15.8749H15.8751V14.9999Z"
              fill="#ffffff"
            />
            <path
              d="M11.25 16.625C11.25 13.6565 13.6565 11.25 16.625 11.25C19.5935 11.25 22 13.6565 22 16.625C22 19.5935 19.5935 22 16.625 22C13.6565 22 11.25 19.5935 11.25 16.625ZM16.625 12.75C14.4849 12.75 12.75 14.4849 12.75 16.625C12.75 18.7651 14.4849 20.5 16.625 20.5C18.7651 20.5 20.5 18.7651 20.5 16.625C20.5 14.4849 18.7651 12.75 16.625 12.75Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <span>NUEVA PRODUCCIÓN</span>
        </div>
        <div className="contenedor-actividades" onClick={handleClickPendiente}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M10.9453 20.5C11.3327 21.0667 11.8027 21.5725 12.338 22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V9.62105C4.5 9.02455 4.73686 8.45247 5.15851 8.03055L10.5262 2.65951C10.9482 2.23725 11.5207 2 12.1177 2H17.25C18.4926 2 19.5 3.00736 19.5 4.25V10.3782C19.0266 10.1599 18.5241 9.99391 18 9.88753V4.25C18 3.83579 17.6642 3.5 17.25 3.5H12.248L12.2509 7.4984C12.2518 8.74166 11.2442 9.75 10.0009 9.75H6V19.75C6 20.1642 6.33579 20.5 6.75 20.5H10.9453ZM10.7488 4.55876L7.05986 8.25H10.0009C10.4153 8.25 10.7512 7.91389 10.7509 7.49947L10.7488 4.55876Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            <path
              d="M14.916 14.5254C14.916 13.5816 15.6812 12.8164 16.625 12.8164C17.5689 12.8164 18.334 13.5816 18.334 14.5254C18.334 15.1044 18.0468 15.6165 17.6036 15.9268C17.2461 16.1771 16.8289 16.5014 16.4972 16.902C16.1627 17.306 15.875 17.837 15.875 18.4844C15.875 18.8986 16.2108 19.2344 16.625 19.2344C17.0392 19.2344 17.375 18.8986 17.375 18.4844C17.375 18.3034 17.4524 18.1004 17.6526 17.8586C17.8556 17.6134 18.1428 17.3804 18.4639 17.1555C19.2908 16.5766 19.834 15.6145 19.834 14.5254C19.834 12.7531 18.3973 11.3164 16.625 11.3164C14.8527 11.3164 13.416 12.7531 13.416 14.5254C13.416 14.9396 13.7518 15.2754 14.166 15.2754C14.5802 15.2754 14.916 14.9396 14.916 14.5254Z"
              fill="#ffffff"
            />
            <path
              d="M16.624 20.4326C16.2098 20.4326 15.874 20.7684 15.874 21.1826C15.874 21.5968 16.2098 21.9326 16.624 21.9326C17.0382 21.9326 17.375 21.5968 17.375 21.1826C17.375 20.7684 17.0382 20.4326 16.624 20.4326Z"
              fill="#ffffff"
            />
          </svg>
          <span>PRODUCCIÓNES PENDIENTES</span>
        </div>
        <div className="contenedor-actividades" onClick={handleClickInformes}>
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M16.8923 16.7332C16.8923 17.9759 15.885 18.9832 14.6423 18.9832H6.34375C5.10111 18.9832 4.09375 17.9759 4.09375 16.7332V8.60187C4.09375 8.00538 4.33061 7.4333 4.75226 7.01138L9.10142 2.65951C9.52341 2.23725 10.0959 2 10.6929 2H14.6423C15.885 2 16.8923 3.00736 16.8923 4.25V16.7332ZM14.6423 17.4832C15.0566 17.4832 15.3923 17.1475 15.3923 16.7332V4.25C15.3923 3.83579 15.0565 3.5 14.6423 3.5H10.8227L10.8249 6.47969C10.8257 7.72296 9.81813 8.73129 8.57486 8.73129H5.59375V16.7332C5.59375 17.1475 5.92954 17.4832 6.34375 17.4832H14.6423ZM6.65314 7.23129L9.32349 4.55928L9.32486 6.48076C9.32516 6.89518 8.98928 7.23129 8.57486 7.23129H6.65314Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            <path
              d="M18.4065 5.68442C18.4065 5.27021 18.7423 4.93442 19.1565 4.93442C19.5707 4.93442 19.9065 5.27021 19.9065 5.68442V17.2514C19.9065 19.8747 17.7799 22.0014 15.1565 22.0014H7.79765C7.38344 22.0014 7.04765 21.6656 7.04765 21.2514C7.04765 20.8371 7.38344 20.5014 7.79765 20.5014H15.1565C16.9514 20.5014 18.4065 19.0463 18.4065 17.2514V5.68442Z"
              fill="#ffffff"
            />
          </svg>
          <span>INFORMES</span>
        </div>
        {/* <div className="contenedor-actividades">
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0 0 0)"
          >
            <path
              d="M9.75 20.5V22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V9.62105C4.5 9.02455 4.73686 8.45247 5.15851 8.03055L10.5262 2.65951C10.9482 2.23725 11.5207 2 12.1177 2H17.25C18.4926 2 19.5 3.00736 19.5 4.25V9.75H18V4.25C18 3.83579 17.6642 3.5 17.25 3.5H12.248L12.2509 7.4984C12.2518 8.74166 11.2442 9.75 10.0009 9.75H6V19.75C6 20.1642 6.33579 20.5 6.75 20.5H9.75ZM10.7488 4.55876L7.05986 8.25H10.0009C10.4153 8.25 10.7512 7.91389 10.7509 7.49947L10.7488 4.55876Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            <path
              d="M12.4853 12.4853C12.1924 12.7782 12.1924 13.2531 12.4853 13.546L15.5643 16.625L12.4853 19.704C12.1924 19.9969 12.1924 20.4718 12.4853 20.7647C12.7782 21.0576 13.2531 21.0576 13.546 20.7647L16.625 17.6857L19.7026 20.7633C19.9955 21.0562 20.4704 21.0562 20.7633 20.7633C21.0562 20.4704 21.0562 19.9955 20.7633 19.7026L17.6857 16.625L20.7633 13.5474C21.0562 13.2545 21.0562 12.7796 20.7633 12.4867C20.4704 12.1938 19.9955 12.1938 19.7026 12.4867L16.625 15.5643L13.546 12.4853C13.2531 12.1924 12.7782 12.1924 12.4853 12.4853Z"
              fill="#ffffff"
            />
          </svg>
          <span>REGRESAR</span>
        </div> */}
      </section>
    </div>
  );
};

export default Home;
