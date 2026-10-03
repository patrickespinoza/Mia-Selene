"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* =====================================================
   ANIMACIÓN GENERAL
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   INFORMACIÓN DEL ÁLBUM
===================================================== */

const DATOS_ALBUM = {
  nombreAplicacion: "Wedshoots",
  codigo: "MXat19tb26",
  enlaceAplicacion:
    "https://apps.apple.com/mx/app/wedshoots/id660256196",
  imagenQr: "/qr.png",
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function AlbumCompartido() {
  const [open, setOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);

  /* =====================================================
     CERRAR MODAL CON ESCAPE
  ===================================================== */

  useEffect(() => {
    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =====================================================
     COPIAR CÓDIGO
  ===================================================== */

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(DATOS_ALBUM.codigo);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2200);
    } catch (error) {
      console.error("No se pudo copiar el código:", error);
    }
  };

  return (
    <>
      {/* =================================================
          SECCIÓN PRINCIPAL
      ================================================= */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          flex
          w-full
          items-center
          justify-center
          overflow-hidden

          bg-[#EAD2D6]

          px-4
          py-20

          sm:px-6
          sm:py-24

          lg:px-10
          lg:py-32
        "
      >
        {/* DESTELLO IZQUIERDO */}

        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[7%]
            top-[18%]

            text-xl
            text-[#B89058]
          "
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [0.85, 1.2, 0.85],
            rotate: [0, 25, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>

        {/* DESTELLO DERECHO */}

        <motion.span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[20%]
            right-[8%]

            text-lg
            text-[#70465A]/55
          "
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.25, 1],
            rotate: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✧
        </motion.span>

        {/* =================================================
            TARJETA PRINCIPAL
        ================================================= */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            relative
            z-10

            w-full
            max-w-3xl
            overflow-hidden

            rounded-[30px]
            border
            border-[#B89058]/35

            bg-[#FFF9F5]

            px-5
            py-12

            text-center

            shadow-[0_24px_60px_rgba(112,70,90,0.16)]

            sm:rounded-[38px]
            sm:px-10
            sm:py-16

            md:px-16
          "
        >
          {/* BORDE INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[8px]

              rounded-[22px]
              border
              border-[#D4B476]/30

              sm:inset-[11px]
              sm:rounded-[29px]
            "
          />

          {/* ESQUINA SUPERIOR */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-6
              top-6

              h-10
              w-10

              border-l
              border-t
              border-[#D4B476]/70

              sm:h-14
              sm:w-14
            "
          />

          {/* ESQUINA INFERIOR */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-6
              right-6

              h-10
              w-10

              border-b
              border-r
              border-[#D4B476]/70

              sm:h-14
              sm:w-14
            "
          />

          <div className="relative z-10">
            {/* ETIQUETA */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3

                sm:gap-5
              "
            >
              <div
                className="
                  h-px
                  w-8
                  bg-[#B89058]

                  sm:w-16
                "
              />

              <motion.p
                className="
                  whitespace-nowrap

                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#70465A]

                  sm:text-[11px]
                  sm:tracking-[0.42em]
                "
                animate={{
                  opacity: [0.72, 1, 0.72],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Comparte tus recuerdos
              </motion.p>

              <div
                className="
                  h-px
                  w-8
                  bg-[#B89058]

                  sm:w-16
                "
              />
            </div>

            {/* ÍCONO */}

            <motion.div
              className="
                mx-auto
                mt-7

                flex
                h-16
                w-16
                items-center
                justify-center

                rounded-full
                border
                border-[#B89058]/40

                bg-[#EAD2D6]

                text-3xl

                shadow-[0_12px_30px_rgba(112,70,90,0.12)]

                sm:h-20
                sm:w-20
                sm:text-4xl
              "
              animate={{
                y: [0, -4, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              📸
            </motion.div>

            {/* TÍTULO */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="
                mt-7

                font-cursiveDancing
                text-[46px]
                leading-[0.95]
                text-[#70465A]

                sm:text-[62px]
                md:text-[76px]
              "
            >
              Álbum compartido
            </motion.h2>

            {/* ORNAMENTO */}

            <motion.div
              className="
                my-7

                flex
                items-center
                justify-center

                sm:my-9
              "
              animate={{
                opacity: [0.72, 1, 0.72],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="
                  h-px
                  bg-[#B89058]
                "
                animate={{
                  width: ["45px", "80px", "45px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.span
                className="
                  mx-4
                  text-lg
                  text-[#B89058]
                "
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.span>

              <motion.div
                className="
                  h-px
                  bg-[#B89058]
                "
                animate={{
                  width: ["45px", "80px", "45px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* DESCRIPCIÓN */}

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
              viewport={{
                once: true,
              }}
              className="
                mx-auto
                max-w-xl

                font-playfair
                text-[15px]
                leading-relaxed
                text-[#725563]

                sm:text-[17px]
                md:text-[18px]
              "
            >
              Ayúdame a guardar cada momento especial de mis XV años.
              Sube tus fotografías y comparte conmigo los recuerdos de
              esta noche inolvidable.
            </motion.p>

            {/* FRASE */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.35,
              }}
              viewport={{
                once: true,
              }}
              className="
                mx-auto
                mt-4
                max-w-lg

                font-cursiveDancing
                text-[24px]
                leading-relaxed
                text-[#70465A]

                sm:text-[29px]
              "
            >
              Cada fotografía será parte de mi historia
            </motion.p>

            {/* BOTÓN */}

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              className="
                mt-9

                inline-flex
                min-h-[50px]
                w-full
                max-w-[280px]
                items-center
                justify-center

                rounded-full
                border
                border-[#70465A]

                bg-[#70465A]

                px-7
                py-4

                text-white

                shadow-[0_14px_30px_rgba(112,70,90,0.24)]

                outline-none
                transition-colors

                hover:bg-[#5D394B]

                focus-visible:ring-2
                focus-visible:ring-[#B89058]
                focus-visible:ring-offset-2

                sm:mt-11
              "
              whileHover={{
                scale: 1.045,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]

                  sm:text-[11px]
                  sm:tracking-[0.3em]
                "
              >
                Abrir álbum
              </span>

              <span
                aria-hidden="true"
                className="ml-2 text-base"
              >
                📸
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* =================================================
          MODAL
      ================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-album"
            className="
              fixed
              inset-0
              z-[100]

              flex
              items-center
              justify-center
              overflow-y-auto

              bg-[#452735]/80

              px-4
              py-8

              sm:px-6
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              initial={{
                scale: 0.88,
                opacity: 0,
                y: 45,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.88,
                opacity: 0,
                y: 45,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                my-auto

                w-full
                max-w-md
                overflow-hidden

                rounded-[28px]
                border
                border-[#B89058]/40

                bg-[#FFF9F5]

                px-5
                py-9

                text-center

                shadow-[0_28px_90px_rgba(69,39,53,0.38)]

                sm:rounded-[36px]
                sm:px-8
                sm:py-11
              "
            >
              {/* BORDE INTERIOR */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-2

                  rounded-[21px]
                  border
                  border-[#D4B476]/25

                  sm:inset-3
                  sm:rounded-[28px]
                "
              />

              {/* CERRAR */}

              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar álbum compartido"
                className="
                  absolute
                  right-4
                  top-4
                  z-20

                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-[#70465A]/20

                  bg-[#EAD2D6]

                  text-lg
                  text-[#70465A]

                  shadow-sm
                  transition-colors

                  hover:bg-[#70465A]
                  hover:text-white

                  sm:right-5
                  sm:top-5
                "
                whileHover={{
                  rotate: 90,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                ✕
              </motion.button>

              <div className="relative z-10">
                {/* ÍCONO */}

                <motion.div
                  className="
                    mx-auto

                    flex
                    h-16
                    w-16
                    items-center
                    justify-center

                    rounded-full
                    border
                    border-[#B89058]/40

                    bg-[#EAD2D6]

                    text-3xl

                    shadow-[0_12px_30px_rgba(112,70,90,0.12)]
                  "
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  📸
                </motion.div>

                {/* TÍTULO */}

                <h2
                  id="titulo-album"
                  className="
                    mt-5

                    font-cursiveDancing
                    text-[40px]
                    leading-none
                    text-[#70465A]

                    sm:text-[48px]
                  "
                >
                  Mis recuerdos
                </h2>

                {/* LÍNEA */}

                <div
                  className="
                    mx-auto
                    my-6

                    h-px
                    w-28

                    bg-[#B89058]
                  "
                />

                {/* APLICACIÓN */}

                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-[#725563]
                  "
                >
                  Descarga la aplicación
                </p>

                <p
                  className="
                    mt-1

                    font-playfair
                    text-[23px]
                    font-semibold
                    text-[#70465A]
                  "
                >
                  {DATOS_ALBUM.nombreAplicacion}
                </p>

                {/* DESCARGAR */}

                <motion.a
                  href={DATOS_ALBUM.enlaceAplicacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-5

                    inline-flex
                    min-h-[44px]
                    items-center
                    justify-center

                    rounded-full
                    border
                    border-[#70465A]

                    px-6
                    py-3

                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#70465A]

                    transition-colors

                    hover:bg-[#70465A]
                    hover:text-white
                  "
                  whileHover={{
                    scale: 1.04,
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  Descargar aplicación
                </motion.a>

                {/* CÓDIGO */}

                <div className="mt-7">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.24em]
                      text-[#725563]
                    "
                  >
                    Código del álbum
                  </p>

                  <button
                    type="button"
                    onClick={copiarCodigo}
                    className="
                      group
                      relative

                      mt-3
                      w-full
                      overflow-hidden

                      rounded-2xl
                      border
                      border-[#B89058]/35

                      bg-[#EAD2D6]

                      px-4
                      py-4

                      transition-colors

                      hover:border-[#70465A]/40
                    "
                  >
                    <span
                      className="
                        block
                        break-all

                        font-mono
                        text-[17px]
                        font-semibold
                        tracking-[0.18em]
                        text-[#70465A]

                        sm:text-lg
                        sm:tracking-[0.28em]
                      "
                    >
                      {DATOS_ALBUM.codigo}
                    </span>

                    <span
                      className="
                        mt-2
                        block

                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-[#725563]
                      "
                    >
                      {copiado
                        ? "Código copiado"
                        : "Toca para copiar"}
                    </span>
                  </button>
                </div>

                {/* QR */}

                <div className="mt-7 flex justify-center">
                  <div
                    className="
                      rounded-[22px]
                      border
                      border-[#B89058]/35

                      bg-white

                      p-3

                      shadow-[0_14px_35px_rgba(112,70,90,0.12)]
                    "
                  >
                    <img
                      src={DATOS_ALBUM.imagenQr}
                      alt="Código QR para acceder al álbum compartido"
                      className="
                        h-40
                        w-40

                        rounded-xl
                        object-contain

                        sm:h-44
                        sm:w-44
                      "
                    />
                  </div>
                </div>

                {/* MENSAJE */}

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-xs

                    text-xs
                    leading-relaxed
                    text-[#725563]
                  "
                >
                  Escanea el código QR o utiliza el código del álbum
                  para subir las fotografías de mis XV años.
                </p>

                <p
                  className="
                    mt-4

                    font-cursiveDancing
                    text-[23px]
                    text-[#70465A]
                  "
                >
                  Gracias por compartir este recuerdo conmigo
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}