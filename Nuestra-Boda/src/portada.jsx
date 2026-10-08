import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Countdown from "./componentes-encabezado/encabeza-cuenta";

import GlitterIntro from "./componentes-encabezado/gliter";



/* =====================================================

   DATOS DE LA INVITACIÓN

===================================================== */



const DATOS_XV = {

  nombre: "Mia Selene",

  inicial: "M",

  fechaTexto: "30 • Octubre • 2026",

  fechaCuentaRegresiva: "2026-10-30T17:00:00-06:00",



  imagenDesktop: "/portada.jpeg",

  imagenMobile: "/portada.jpeg",



  cancion: "/musica1.mp3",

};



/* =====================================================

   PALETA DE COLORES

===================================================== */



const colores = {

  rosaClaro: "#F8E9E8",

  rosaPalo: "#D7A7AE",

  malva: "#A56F85",

  malvaOscuro: "#70465A",

  ciruela: "#452735",

  crema: "#FFF9F5",

  dorado: "#C7A56A",

  doradoClaro: "#EBD5A5",

};



/* =====================================================

   TEMA DEL SOBRE

===================================================== */



const envelopeTheme = {

  body: `

    linear-gradient(

      145deg,

      #d9aeb5 0%,

      #bb8496 46%,

      #8c5a70 100%

    )

  `,



  flap: `

    linear-gradient(

      180deg,

      #e5bdc1 0%,

      #c58d9d 48%,

      #956178 100%

    )

  `,



  seal: `

    radial-gradient(

      circle at 30% 25%,

      #fffaf0 0%,

      #f0dcae 18%,

      #d4b476 45%,

      #a47b3e 72%,

      #6d4b1d 100%

    )

  `,

};



/* =====================================================

   DECORACIÓN BOTÁNICA

===================================================== */



const RamaDecorativa = ({ posicion }) => {

  const esIzquierda = posicion === "izquierda";



  return (

    <div

      aria-hidden="true"

      className={`

        pointer-events-none absolute

        ${esIzquierda ? "-left-14 top-5" : "-right-14 bottom-4"}

        h-52 w-52

        opacity-35

        sm:h-72 sm:w-72

      `}

      style={{

        transform: esIzquierda ? "rotate(-20deg)" : "rotate(160deg)",

      }}

    >

      <div

        className="

          absolute left-1/2 top-2

          h-[90%] w-[2px]

          origin-bottom

          rotate-[-36deg]

          rounded-full

        "

        style={{

          background: `linear-gradient(to top, ${colores.malvaOscuro}, transparent)`,

        }}

      />



      {[12, 30, 48, 66].map((top, index) => (

        <React.Fragment key={top}>

          <div

            className="

              absolute h-8 w-16

              rounded-[100%_0_100%_0]

            "

            style={{

              left: `${36 + index * 5}%`,

              top: `${top}%`,

              background: `linear-gradient(

                145deg,

                rgba(165,111,133,0.85),

                rgba(215,167,174,0.35)

              )`,

              transform: `rotate(${28 + index * 5}deg)`,

            }}

          />



          <div

            className="

              absolute h-7 w-14

              rounded-[0_100%_0_100%]

            "

            style={{

              right: `${38 - index * 4}%`,

              top: `${top + 8}%`,

              background: `linear-gradient(

                145deg,

                rgba(112,70,90,0.75),

                rgba(215,167,174,0.3)

              )`,

              transform: `rotate(${-28 - index * 4}deg)`,

            }}

          />

        </React.Fragment>

      ))}

    </div>

  );

};



/* =====================================================
   DESCIFRAR INVITACIÓN DESDE ?i=
===================================================== */

const CLAVE_INVITACION = "MIA-SELENE-30-OCTUBRE-2026";

const base64UrlABytes = (valor) => {
  let base64 = valor.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binario = atob(base64);
  return Uint8Array.from(binario, (caracter) => caracter.charCodeAt(0));
};

const obtenerClave = async () => {
  const material = new TextEncoder().encode(CLAVE_INVITACION);
  const hash = await crypto.subtle.digest("SHA-256", material);
  return crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["decrypt"]);
};

const descifrarInvitacion = async (token) => {
  try {
    if (!token) return null;
    const paquete = base64UrlABytes(token);
    if (paquete.length < 13) return null;
    const iv = paquete.slice(0, 12);
    const cifrado = paquete.slice(12);
    const clave = await obtenerClave();
    const plano = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, clave, cifrado);
    const datos = JSON.parse(new TextDecoder().decode(plano));
    const nombre = String(datos?.nombre || "").trim();
    const pases = Number.parseInt(datos?.pases, 10);
    if (!nombre || !Number.isFinite(pases) || pases < 1) return null;
    return { nombre, pases };
  } catch (error) {
    console.error("No se pudo descifrar la invitación:", error);
    return null;
  }
};

/* =====================================================

   COMPONENTE PRINCIPAL

===================================================== */



export default function Portada() {

  const audioRef = useRef(null);

  const temporizadorRef = useRef(null);



  const [introActiva, setIntroActiva] = useState(true);

  const [mostrarContenido, setMostrarContenido] = useState(false);

  const [abrirSobre, setAbrirSobre] = useState(false);

  const [experienciaIniciada, setExperienciaIniciada] =

    useState(false);



  const [invitado, setInvitado] = useState("Invitado especial");

  const [pases, setPases] = useState(1);



  /* =====================================================
     LEER Y DESCIFRAR INVITADO Y PASES DESDE LA URL
  ===================================================== */

  useEffect(() => {
    let activo = true;

    const cargarInvitacion = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("i");
      const datos = await descifrarInvitacion(token);
      if (!activo || !datos) return;
      setInvitado(datos.nombre);
      setPases(datos.pases);
    };

    cargarInvitacion();

    return () => {
      activo = false;
      if (temporizadorRef.current) clearTimeout(temporizadorRef.current);
    };
  }, []);

  /* =====================================================

     ABRIR SOBRE E INICIAR MÚSICA

  ===================================================== */



  const iniciarExperiencia = () => {

    if (experienciaIniciada) return;



    setExperienciaIniciada(true);

    setAbrirSobre(true);



    temporizadorRef.current = setTimeout(async () => {

      if (audioRef.current) {

        audioRef.current.volume = 0.45;



        try {

          await audioRef.current.play();

        } catch (error) {

          console.warn(

            "El navegador bloqueó la reproducción automática:",

            error

          );

        }

      }



      setIntroActiva(false);

      setMostrarContenido(true);

    }, 1750);

  };



  const textoLugares = pases === 1 ? "LUGAR" : "LUGARES";



  return (

    <main

      className="

        relative

        w-full

        overflow-x-hidden

        bg-[#FFF9F5]

        text-[#452735]

      "

    >

      <audio ref={audioRef} loop preload="auto">

        <source src={DATOS_XV.cancion} type="audio/mpeg" />

      </audio>



      {/* =================================================

          INTRODUCCIÓN

      ================================================= */}



      <AnimatePresence mode="wait">

        {introActiva && (

          <motion.section

            key="intro-mia-selene"

            className="

              fixed inset-0 z-50

              min-h-[100dvh]

              overflow-y-auto overflow-x-hidden

            "

            style={{

              background: `

                radial-gradient(

                  circle at 50% 18%,

                  rgba(255,249,245,0.18),

                  transparent 30%

                ),

                radial-gradient(

                  circle at 10% 85%,

                  rgba(235,213,165,0.14),

                  transparent 28%

                ),

                radial-gradient(

                  circle at 90% 75%,

                  rgba(215,167,174,0.2),

                  transparent 30%

                ),

                linear-gradient(

                  150deg,

                  #b98194 0%,

                  #8b5a70 45%,

                  #4c2b3a 100%

                )

              `,

            }}

            initial={{ opacity: 1 }}

            exit={{

              opacity: 0,

              transition: {

                duration: 0.75,

                ease: "easeInOut",

              },

            }}

          >

            <GlitterIntro />



            <RamaDecorativa posicion="izquierda" />

            <RamaDecorativa posicion="derecha" />



            {/* LUCES */}



            <div

              aria-hidden="true"

              className="

                pointer-events-none

                absolute left-[10%] top-[14%]

                h-1.5 w-1.5 rounded-full

                bg-[#F8E9E8]

                shadow-[0_0_16px_rgba(248,233,232,0.9)]

              "

            />



            <div

              aria-hidden="true"

              className="

                pointer-events-none

                absolute right-[13%] top-[23%]

                h-1 w-1 rounded-full

                bg-[#EBD5A5]

                shadow-[0_0_16px_rgba(235,213,165,0.95)]

              "

            />



            <div

              aria-hidden="true"

              className="

                pointer-events-none

                absolute bottom-[18%] left-[18%]

                h-1 w-1 rounded-full

                bg-white/80

                shadow-[0_0_14px_rgba(255,255,255,0.85)]

              "

            />



            <div

              className="

                relative z-10

                flex min-h-[100dvh]

                w-full

                flex-col items-center justify-center

                px-4 py-10

                text-center

                sm:px-6 sm:py-14

                lg:px-10 lg:py-16

              "

            >

              {/* ENCABEZADO */}



              <motion.div

                className="relative mb-8 w-full max-w-3xl sm:mb-10"

                initial={{ opacity: 0, y: -18 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.9 }}

              >

                <div className="mb-4 flex items-center justify-center gap-3 sm:gap-5">

                  <div

                    className="

                      h-px w-9

                      bg-gradient-to-r

                      from-transparent to-[#EBD5A5]

                      sm:w-16

                    "

                  />



                  <p

                    className="

                      whitespace-nowrap

                      text-[9px] font-light uppercase

                      tracking-[0.32em]

                      text-[#FFF4F2]

                      sm:text-[11px] sm:tracking-[0.5em]

                    "

                  >

                    MIS XV AÑOS

                  </p>



                  <div

                    className="

                      h-px w-9

                      bg-gradient-to-l

                      from-transparent to-[#EBD5A5]

                      sm:w-16

                    "

                  />

                </div>



                <h1

                  className="

                    mx-auto

                    max-w-full

                    break-words

                    px-2

                    font-cursiveDancing

                    text-[54px]

                    leading-[0.92]

                    sm:text-[74px]

                    md:text-[94px]

                    lg:text-[110px]

                  "

                  style={{

                    color: colores.crema,

                    textShadow: `

                      0 4px 10px rgba(69,39,53,0.3),

                      0 16px 35px rgba(45,20,31,0.28)

                    `,

                  }}

                >

                  {DATOS_XV.nombre}

                </h1>



                <div className="mt-5 flex flex-col items-center">

                  <div

                    className="

                      mb-4 h-px w-28

                      bg-gradient-to-r

                      from-transparent via-[#EBD5A5] to-transparent

                      sm:w-36

                    "

                  />



                  <p

                    className="

                      text-[10px] uppercase

                      tracking-[0.24em]

                      text-[#FFF2EE]

                      sm:text-[13px] sm:tracking-[0.38em]

                    "

                  >

                    {DATOS_XV.fechaTexto}

                  </p>

                </div>

              </motion.div>



              {/* =================================================

                  SOBRE

              ================================================= */}



              <motion.button

                type="button"

                onClick={iniciarExperiencia}

                disabled={experienciaIniciada}

                aria-label="Abrir invitación de quince años"

                className="

                  group relative block

                  w-[88vw] max-w-[350px]

                  cursor-pointer

                  border-0 bg-transparent p-0

                  outline-none

                  disabled:cursor-default

                  sm:w-[350px]

                  md:max-w-[390px]

                "

                style={{

                  aspectRatio: "340 / 240",

                  perspective: 2200,

                }}

                initial={{ opacity: 0, scale: 0.92, y: 18 }}

                animate={{ opacity: 1, scale: 1, y: 0 }}

                transition={{

                  duration: 0.9,

                  delay: 0.15,

                }}

                whileHover={

                  experienciaIniciada

                    ? undefined

                    : {

                        scale: 1.015,

                        y: -4,

                      }

                }

                whileTap={

                  experienciaIniciada

                    ? undefined

                    : {

                        scale: 0.985,

                      }

                }

              >

                {/* RESPLANDOR */}



                <div

                  className="

                    absolute inset-0

                    scale-110 rounded-[30px]

                    bg-[#F0C8CD]/25

                    opacity-80 blur-3xl

                  "

                />



                {/* SOMBRA */}



                <div

                  className="

                    absolute -bottom-7 left-1/2

                    h-12 w-[72%]

                    -translate-x-1/2

                    rounded-full

                    bg-[#29131D]/35 blur-3xl

                    sm:-bottom-9 sm:h-16

                  "

                />



                {/* CUERPO DEL SOBRE */}



                <div

                  className="

                    absolute inset-0

                    overflow-hidden

                    rounded-[22px]

                    border

                    backdrop-blur-xl

                    sm:rounded-[28px]

                  "

                  style={{

                    background: `

                      linear-gradient(

                        145deg,

                        rgba(255,255,255,0.18),

                        rgba(255,255,255,0.025)

                      ),

                      ${envelopeTheme.body}

                    `,

                    borderColor: "rgba(255,245,242,0.3)",

                    boxShadow: `

                      0 35px 75px rgba(45,20,31,0.42),

                      inset 0 1px 0 rgba(255,255,255,0.28),

                      inset 0 -3px 14px rgba(69,39,53,0.3)

                    `,

                  }}

                >

                  <div

                    className="absolute inset-0 opacity-[0.08]"

                    style={{

                      backgroundImage: `

                        repeating-linear-gradient(

                          45deg,

                          rgba(255,255,255,0.2) 0px,

                          rgba(255,255,255,0.2) 1px,

                          transparent 1px,

                          transparent 7px

                        )

                      `,

                    }}

                  />



                  <div

                    className="absolute left-0 top-0 h-24 w-full opacity-40"

                    style={{

                      background:

                        "linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)",

                    }}

                  />

                </div>



                <div

                  className="

                    absolute inset-[7px]

                    rounded-[17px]

                    border border-white/15

                    sm:inset-[9px] sm:rounded-[21px]

                  "

                />



                {/* TAPA DEL SOBRE */}



                <motion.div

                  className="

                    absolute left-0 top-0 z-20

                    h-1/2 w-full

                    origin-top

                  "

                  style={{

                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",

                    background: `

                      linear-gradient(

                        to bottom,

                        rgba(255,255,255,0.2),

                        rgba(255,255,255,0.02)

                      ),

                      ${envelopeTheme.flap}

                    `,

                    boxShadow: `

                      0 25px 40px rgba(45,20,31,0.35),

                      inset 0 2px 0 rgba(255,255,255,0.2)

                    `,

                  }}

                  animate={

                    abrirSobre

                      ? {

                          rotateX: -185,

                          y: -2,

                        }

                      : {

                          rotateX: 0,

                          y: 0,

                        }

                  }

                  transition={{

                    duration: 1.35,

                    ease: [0.22, 1, 0.36, 1],

                  }}

                />



                {/* TARJETA INTERIOR */}



                <motion.div

                  className="

                    absolute left-1/2 top-[9%] z-10

                    flex h-[79%] w-[83%]

                    -translate-x-1/2

                    flex-col items-center justify-between

                    overflow-hidden

                    rounded-[15px]

                    px-3 py-4

                    sm:rounded-[19px]

                    sm:px-5 sm:py-6

                  "

                  style={{

                    background: `

                      radial-gradient(

                        circle at top,

                        rgba(255,255,255,0.95),

                        transparent 45%

                      ),

                      linear-gradient(

                        180deg,

                        #fffdfb 0%,

                        #faeeee 55%,

                        #efd8dc 100%

                      )

                    `,

                    border: "1px solid rgba(112,70,90,0.15)",

                    boxShadow: `

                      0 12px 34px rgba(45,20,31,0.24),

                      inset 0 1px 0 rgba(255,255,255,0.95)

                    `,

                  }}

                  animate={

                    abrirSobre

                      ? {

                          y: -72,

                          scale: 1.025,

                        }

                      : {

                          y: 0,

                          scale: 1,

                        }

                  }

                  transition={{

                    duration: 1.2,

                    ease: [0.22, 1, 0.36, 1],

                  }}

                >

                  <div

                    className="

                      mt-0.5 h-[2px] w-14

                      bg-gradient-to-r

                      from-transparent via-[#C7A56A] to-transparent

                      sm:w-16

                    "

                  />



                  <p

                    className="

                      whitespace-nowrap

                      text-center

                      text-[7px] uppercase

                      tracking-[0.23em]

                      text-[#70465A]

                      sm:text-[10px] sm:tracking-[0.38em]

                    "

                  >

                    INVITACIÓN ESPECIAL

                  </p>



                  <div className="flex flex-col items-center justify-center">

                    <span

                      className="

                        mb-0.5

                        font-serif

                        text-[9px] uppercase

                        tracking-[0.2em]

                        text-[#A47B3E]

                        sm:text-[11px]

                      "

                    >

                      MIS XV AÑOS

                    </span>



                    <h3

                      className="

                        max-w-full

                        break-words

                        text-center

                        font-cursiveDancing

                        text-[28px]

                        leading-none

                        text-[#70465A]

                        sm:text-[38px]

                      "

                    >

                      {DATOS_XV.nombre}

                    </h3>

                  </div>



                  <p

                    className="

                      whitespace-nowrap

                      text-center

                      text-[7px] uppercase

                      tracking-[0.15em]

                      text-[#9A7482]

                      sm:text-[9px] sm:tracking-[0.25em]

                    "

                  >

                    TOCA PARA ABRIR

                  </p>

                </motion.div>



                {/* SELLO */}



                <motion.div

                  className="

                    pointer-events-none

                    absolute inset-0 z-30

                    flex items-center justify-center

                  "

                  animate={

                    abrirSobre

                      ? {

                          scale: 0.55,

                          opacity: 0,

                          y: -20,

                        }

                      : {

                          scale: 1,

                          opacity: 1,

                          y: 0,

                        }

                  }

                  transition={{ duration: 0.6 }}

                >

                  <div

                    className="

                      relative

                      flex h-20 w-20

                      items-center justify-center

                      sm:h-28 sm:w-28

                    "

                  >

                    <div

                      className="

                        absolute inset-0

                        scale-125 rounded-full

                        bg-[#EBD5A5]/30 blur-2xl

                      "

                    />



                    <div

                      className="absolute inset-0 rounded-full"

                      style={{

                        background: envelopeTheme.seal,

                        boxShadow: `

                          inset 0 4px 10px rgba(255,255,255,0.7),

                          inset 0 -12px 20px rgba(80,50,15,0.4),

                          0 18px 34px rgba(45,20,31,0.45)

                        `,

                      }}

                    />



                    <div

                      className="

                        absolute inset-[6px]

                        rounded-full

                        border border-[#6D4B1D]/30

                      "

                    />



                    <div

                      className="

                        absolute inset-[10px]

                        rounded-full

                        border border-white/30

                      "

                    />



                    <span

                      className="

                        relative z-10

                        font-serif

                        text-[27px]

                        text-[#694900]

                        sm:text-[37px]

                      "

                      style={{

                        textShadow: `

                          1px 1px 0 rgba(255,255,255,0.5),

                          -1px -1px 0 rgba(73,42,0,0.4),

                          0 4px 7px rgba(44,23,0,0.3)

                        `,

                      }}

                    >

                      {DATOS_XV.inicial}

                    </span>

                  </div>

                </motion.div>



                <motion.div

                  className="

                    pointer-events-none

                    absolute inset-0 z-40

                    flex items-start justify-center

                    pt-4

                    sm:pt-6

                  "

                  animate={

                    abrirSobre

                      ? { opacity: 0 }

                      : { opacity: 1 }

                  }

                >

                  <p

                    className="

                      text-[8px] font-light uppercase

                      tracking-[0.28em]

                      text-white/85

                      sm:text-[10px] sm:tracking-[0.42em]

                    "

                  >

                    ABRIR

                  </p>

                </motion.div>

              </motion.button>



              {/* =================================================

                  PASES

              ================================================= */}



              <motion.div

                className="

                  mt-9 flex w-full

                  max-w-lg flex-col items-center

                  sm:mt-12

                "

                initial={{ opacity: 0, y: 16 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{

                  duration: 0.8,

                  delay: 0.35,

                }}

              >

                <div

                  className="

                    mb-4 h-px w-24

                    bg-gradient-to-r

                    from-transparent via-[#EBD5A5] to-transparent

                  "

                />



                <p

                  className="

                    text-[9px] uppercase

                    tracking-[0.32em]

                    text-[#F8E9E8]

                    sm:text-[11px] sm:tracking-[0.48em]

                  "

                >

                  HEMOS RESERVADO

                </p>



                <div className="relative my-2.5 sm:my-3">

                  <div

                    className="

                      absolute inset-0

                      scale-150 rounded-full

                      bg-[#EBD5A5]/20 blur-2xl

                    "

                  />



                  <span

                    className="

                      relative

                      font-serif

                      text-[50px]

                      leading-none

                      text-[#FFF9F5]

                      sm:text-[62px]

                      md:text-[70px]

                    "

                    style={{

                      textShadow:

                        "0 7px 18px rgba(45,20,31,0.32)",

                    }}

                  >

                    {pases}

                  </span>

                </div>



                <p

                  className="

                    px-3

                    text-center

                    text-[9px] uppercase

                    tracking-[0.26em]

                    text-[#F8E9E8]

                    sm:text-[11px] sm:tracking-[0.4em]

                  "

                >

                  {textoLugares} EN TU HONOR

                </p>



                <div

                  className="

                    my-4 h-px w-16

                    bg-gradient-to-r

                    from-transparent via-[#EBD5A5]/80 to-transparent

                    sm:my-5

                  "

                />



                <div

                  className="

                    max-w-[94vw]

                    rounded-full

                    border

                    px-4 py-2.5

                    backdrop-blur-md

                    sm:px-6 sm:py-3

                  "

                  style={{

                    background: "rgba(255,249,245,0.12)",

                    borderColor: "rgba(255,240,238,0.25)",

                    boxShadow: `

                      0 10px 28px rgba(45,20,31,0.2),

                      inset 0 1px 0 rgba(255,255,255,0.16)

                    `,

                  }}

                >

                  <p

                    className="

                      break-words

                      text-center

                      text-[10px]

                      tracking-[0.08em]

                      text-[#F8E9E8]

                      sm:text-[12px] sm:tracking-[0.14em]

                    "

                  >

                    Invitación para:

                    <span className="ml-2 font-semibold text-white">

                      {invitado}

                    </span>

                  </p>

                </div>

              </motion.div>

            </div>

          </motion.section>

        )}

      </AnimatePresence>



      {/* =================================================

          PORTADA PRINCIPAL

      ================================================= */}



      <section

        className="

          relative

          min-h-[100svh]

          w-full

          overflow-hidden

          bg-[#70465A]

        "

      >

        {/* IMAGEN DE ESCRITORIO */}



        <motion.img

          src={DATOS_XV.imagenDesktop}

          alt="Portada de los XV años de Mia Selene"

          className="

            absolute inset-0

            hidden h-full w-full

            object-cover object-center

            md:block

          "

          initial={{ opacity: 0, scale: 1.05 }}

          animate={

            mostrarContenido

              ? { opacity: 1, scale: 1 }

              : { opacity: 0, scale: 1.05 }

          }

          transition={{

            opacity: { duration: 1.2 },

            scale: { duration: 4.5 },

          }}

        />



        {/* IMAGEN MÓVIL */}



        <motion.img

          src={DATOS_XV.imagenMobile}

          alt="Portada móvil de los XV años de Mia Selene"

          className="

            absolute inset-0

            block h-full w-full

            object-cover object-center

            md:hidden

          "

          initial={{ opacity: 0, scale: 1.05 }}

          animate={

            mostrarContenido

              ? { opacity: 1, scale: 1 }

              : { opacity: 0, scale: 1.05 }

          }

          transition={{

            opacity: { duration: 1.2 },

            scale: { duration: 4.5 },

          }}

        />



        {/* CAPA DE COLOR MALVA */}



        <motion.div

          className="absolute inset-0"

          style={{

            background: `

              linear-gradient(

                180deg,

                rgba(112,70,90,0.16) 0%,

                rgba(112,70,90,0.25) 42%,

                rgba(69,39,53,0.82) 100%

              )

            `,

          }}

          initial={{ opacity: 0 }}

          animate={

            mostrarContenido

              ? { opacity: 0 }

              : { opacity: 0 }

          }

          transition={{ duration: 1.2 }}

        />



        <div

          className="

            pointer-events-none

            absolute inset-x-0 bottom-0

            h-[40%]

          "

          style={{

            background:

              "linear-gradient(to top, rgba(69,39,53,0.92), transparent)",

          }}

        />



 {/* CONTENIDO INFERIOR */}



<motion.div

  className="

    relative z-10

    flex min-h-[100svh]

    w-full

    flex-col items-center justify-end



    px-4

    pb-10

    pt-28



    text-center text-white



    sm:px-8

    sm:pb-14

    sm:pt-32



    md:pb-16



    lg:px-12

    lg:pb-20

  "

  initial={{

    opacity: 0,

    y: 24,

  }}

  animate={

    mostrarContenido

      ? {

          opacity: 1,

          y: 0,

        }

      : {

          opacity: 0,

          y: 24,

        }

  }

  transition={{

    duration: 1.1,

    delay: 0.2,

  }}

>

  {/* NOMBRE */}



  <h1

    className="

      max-w-5xl

      break-words

      font-cursiveDancing

      text-[62px]

      leading-[0.88]



      sm:text-[88px]

      md:text-[110px]

      lg:text-[132px]

    "

    style={{

      color: colores.crema,

      textShadow: `

        0 3px 8px rgba(69,39,53,0.5),

        0 16px 40px rgba(45,20,31,0.5)

      `,

    }}

  >

    {DATOS_XV.nombre}

  </h1>





  {/* DIVISOR */}



  <div

    className="

      my-5 h-px w-28

      bg-gradient-to-r

      from-transparent

      via-[#EBD5A5]

      to-transparent



      sm:my-7

      sm:w-40

    "

  />



  {/* CUENTA REGRESIVA */}



  <div className="w-full max-w-4xl">

    <p

      className="

        mb-3

        text-[9px] uppercase

        tracking-[0.25em]

        text-[#F8E9E8]



        sm:text-[11px]

        sm:tracking-[0.42em]

      "

    >

      Faltan

    </p>



    <Countdown

      targetDate={DATOS_XV.fechaCuentaRegresiva}

    />

  </div>

</motion.div>

      </section>

    </main>

  );

}