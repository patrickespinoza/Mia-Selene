"use client";



import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useMemo, useRef, useState } from "react";



/* =====================================================

   ANIMACIONES

===================================================== */



const fadeUp = {

  hidden: {

    opacity: 0,

    y: 55,

  },



  show: {

    opacity: 1,

    y: 0,



    transition: {

      duration: 1,

      ease: [0.22, 1, 0.36, 1],

    },

  },

};



/* =====================================================

   CONFIGURACIÓN DEL EVENTO

===================================================== */



const DATOS_CONFIRMACION = {

  festejada: "Carla Durán",

  fechaLimite: "1 de marzo de 2027",



  scriptUrl:

    "https\://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec",

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



const Confirmacion = () => {

  const temporizadorRef = useRef(null);



  const [nombreInvitado, setNombreInvitado] = useState("");

  const [mensajeInvitado, setMensajeInvitado] = useState("");

  const [asistencia, setAsistencia] = useState("");

  const [invitados, setInvitados] = useState(1);

  const [pasesPermitidos, setPasesPermitidos] = useState(1);



  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [enviado, setEnviado] = useState(false);



  /* =====================================================
     OBTENER Y DESCIFRAR NOMBRE Y PASES DESDE LA URL
  ===================================================== */

  useEffect(() => {
    let activo = true;

    const cargarInvitacion = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("i");
      const datos = await descifrarInvitacion(token);
      if (!activo || !datos) return;
      setNombreInvitado(datos.nombre);
      setPasesPermitidos(datos.pases);
      setInvitados(1);
    };

    cargarInvitacion();

    return () => {
      activo = false;
      if (temporizadorRef.current) clearTimeout(temporizadorRef.current);
    };
  }, []);

  /* =====================================================

     OPCIONES DE INVITADOS

  ===================================================== */



  const opcionesInvitados = useMemo(() => {

    return Array.from(

      { length: pasesPermitidos },

      (_, index) => index + 1

    );

  }, [pasesPermitidos]);



  /* =====================================================

     CAMBIAR ASISTENCIA

  ===================================================== */



  const seleccionarAsistencia = (opcion) => {

    setAsistencia(opcion);

    setError("");



    if (opcion === "No podré asistir") {

      setInvitados(0);

    } else if (invitados === 0) {

      setInvitados(1);

    }

  };



  /* =====================================================

     VALIDACIÓN

  ===================================================== */



  const validarFormulario = () => {

    if (!nombreInvitado.trim()) {

      setError("Por favor, escribe tu nombre.");

      return false;

    }



    if (!asistencia) {

      setError("Por favor, selecciona si podrás asistir.");

      return false;

    }



    if (

      asistencia === "Sí asistiré" &&

      (invitados < 1 || invitados > pasesPermitidos)

    ) {

      setError(

        `Puedes confirmar un máximo de ${pasesPermitidos} ${

          pasesPermitidos === 1 ? "persona" : "personas"

        }.`

      );



      return false;

    }



    return true;

  };



  /* =====================================================

     ENVIAR CONFIRMACIÓN

  ===================================================== */



  const enviarConfirmacion = async () => {

    if (loading) return;

    if (!validarFormulario()) return;



    setError("");

    setEnviado(false);

    setLoading(true);



    const data = {

      fecha: new Date().toLocaleString("es-MX", {

        timeZone: "America/Mexico_City",

      }),



      nombre: nombreInvitado.trim(),

      asistencia,



      invitados:

        asistencia === "Sí asistiré" ? invitados : 0,



      mensaje: mensajeInvitado.trim(),



      evento: `XV años de ${DATOS_CONFIRMACION.festejada}`,



      pasesAsignados: pasesPermitidos,

    };



    try {

      await fetch(DATOS_CONFIRMACION.scriptUrl, {

        method: "POST",

        mode: "no-cors",



        headers: {

          "Content-Type": "application/json",

        },



        body: JSON.stringify(data),

      });



      setEnviado(true);



      const params = new URLSearchParams(window.location.search);

      const tokenInvitacion = params.get("i");



      if (!tokenInvitacion) {

        setNombreInvitado("");

      }



      setMensajeInvitado("");

      setAsistencia("");

      setInvitados(1);



      temporizadorRef.current = setTimeout(() => {

        setEnviado(false);

      }, 5000);

    } catch (err) {

      console.error("Error enviando confirmación:", err);



      setError(

        "No pudimos enviar tu confirmación. Inténtalo nuevamente."

      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <motion.section

      variants={fadeUp}

      initial="hidden"

      whileInView="show"

      viewport={{

        once: true,

        amount: 0.08,

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

      {/* DESTELLOS */}



      <motion.span

        aria-hidden="true"

        className="

          pointer-events-none

          absolute

          left-[8%]

          top-[17%]

          text-lg

          text-[#B89058]

        "

        animate={{

          opacity: [0.35, 1, 0.35],

          scale: [0.8, 1.2, 0.8],

          rotate: [0, 35, 0],

        }}

        transition={{

          duration: 4,

          repeat: Infinity,

          ease: "easeInOut",

        }}

      >

        ✦

      </motion.span>



      <motion.span

        aria-hidden="true"

        className="

          pointer-events-none

          absolute

          right-[8%]

          top-[38%]

          text-sm

          text-[#70465A]/55

        "

        animate={{

          opacity: [0.25, 0.85, 0.25],

          scale: [1, 1.3, 1],

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

          CONTENEDOR PRINCIPAL

      ================================================= */}



      <div

        className="

          relative

          z-10

          mx-auto

          grid

          w-full

          max-w-6xl

          grid-cols-1

          items-center

          gap-10

          lg:grid-cols-[0.85fr_1.15fr]

          lg:gap-14

        "

      >

        {/* =================================================

            TEXTO

        ================================================= */}



        <motion.div

          initial={{

            opacity: 0,

            x: -35,

          }}

          whileInView={{

            opacity: 1,

            x: 0,

          }}

          transition={{

            duration: 1,

            ease: [0.22, 1, 0.36, 1],

          }}

          viewport={{

            once: true,

          }}

          className="

            mx-auto

            max-w-xl

            text-center

            lg:mx-0

            lg:text-left

          "

        >

          {/* ETIQUETA */}



          <div

            className="

              flex

              items-center

              justify-center

              gap-3

              lg:justify-start

            "

          >

            <div

              className="

                h-px

                w-8

                bg-[#B89058]

                lg:w-14

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

              Reserva la fecha

            </motion.p>



            <div

              className="

                h-px

                w-8

                bg-[#B89058]

                lg:hidden

              "

            />

          </div>



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

              delay: 0.1,

            }}

            viewport={{

              once: true,

            }}

            className="

              mt-5

              font-cursiveDancing

              text-[48px]

              leading-[0.95]

              text-[#70465A]

              sm:text-[64px]

              md:text-[76px]

              lg:text-[86px]

            "

          >

            Confirma tu asistencia

          </motion.h2>



          {/* ORNAMENTO */}



          <div

            className="

              my-7

              flex

              items-center

              justify-center

              lg:justify-start

            "

          >

            <div

              className="

                h-px

                w-16

                bg-[#B89058]

                sm:w-24

              "

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



            <div

              className="

                h-px

                w-16

                bg-[#B89058]

                lg:hidden

                sm:w-24

              "

            />

          </div>



          {/* TEXTO */}



          <p

            className="

              font-playfair

              text-[15px]

              leading-relaxed

              text-[#725563]

              sm:text-[17px]

              md:text-[18px]

            "

          >

            Tu presencia hará que esta celebración sea todavía más

            especial. Por favor, confirma si podrás acompañarme en mis

            XV años.

          </p>



          <p

            className="

              mt-5

              font-cursiveDancing

              text-[26px]

              leading-relaxed

              text-[#70465A]

              sm:text-[31px]

            "

          >

            Espero compartir contigo esta noche inolvidable

          </p>



          {/* FECHA LÍMITE */}



          <div

            className="

              mx-auto

              mt-8

              max-w-sm

              rounded-[22px]

              border

              border-[#B89058]/35

              bg-[#FFF9F5]

              px-5

              py-5

              shadow-[0_14px_35px_rgba(112,70,90,0.10)]

              lg:mx-0

            "

          >

            <p

              className="

                text-[9px]

                font-semibold

                uppercase

                tracking-[0.25em]

                text-[#70465A]

              "

            >

              Confirma antes del

            </p>



            <p

              className="

                mt-2

                font-playfair

                text-[21px]

                text-[#70465A]

                sm:text-[24px]

              "

            >

              {DATOS_CONFIRMACION.fechaLimite}

            </p>

          </div>

        </motion.div>



        {/* =================================================

            FORMULARIO

        ================================================= */}



        <motion.div

          initial={{

            opacity: 0,

            x: 35,

            scale: 0.98,

          }}

          whileInView={{

            opacity: 1,

            x: 0,

            scale: 1,

          }}

          transition={{

            duration: 1,

            delay: 0.1,

            ease: [0.22, 1, 0.36, 1],

          }}

          viewport={{

            once: true,

            amount: 0.1,

          }}

          className="

            relative

            w-full

            overflow-hidden

            rounded-[30px]

            border

            border-[#B89058]/35

            bg-[#FFF9F5]

            px-5

            py-10

            shadow-[0_26px_70px_rgba(112,70,90,0.16)]

            sm:rounded-[38px]

            sm:px-8

            sm:py-12

            md:px-10

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

              border-[#D4B476]/25

              sm:inset-[11px]

              sm:rounded-[29px]

            "

          />



          <div className="relative z-10">

            {/* ENCABEZADO */}



            <div className="text-center">

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

                  border-[#B89058]/35

                  bg-[#EAD2D6]

                  text-3xl

                  shadow-[0_12px_30px_rgba(112,70,90,0.10)]

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

                ✉️

              </motion.div>



              <h3

                className="

                  mt-5

                  font-playfair

                  text-[26px]

                  font-semibold

                  text-[#70465A]

                  sm:text-[32px]

                "

              >

                Confirmación de asistencia

              </h3>



              <p

                className="

                  mx-auto

                  mt-2

                  max-w-md

                  text-sm

                  leading-relaxed

                  text-[#725563]

                  sm:text-[15px]

                "

              >

                Completa los siguientes datos para registrar tu

                respuesta.

              </p>

            </div>



            {/* NOMBRE */}



            <div className="mt-8">

              <label

                htmlFor="nombre-invitado"

                className="

                  mb-2

                  block

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#70465A]

                "

              >

                Nombre completo

              </label>



              <input

                id="nombre-invitado"

                type="text"

                autoComplete="name"

                placeholder="Nombre y apellido"

                value={nombreInvitado}

                disabled={loading}

                onChange={(event) => {

                  setNombreInvitado(event.target.value);

                  setError("");

                }}

                className="

                  min-h-[50px]

                  w-full

                  rounded-2xl

                  border

                  border-[#B89058]/30

                  bg-white

                  px-4

                  py-3

                  font-playfair

                  text-[15px]

                  text-[#452735]

                  outline-none

                  transition

                  placeholder:text-[#A98D98]

                  focus:border-[#70465A]

                  focus:ring-2

                  focus:ring-[#70465A]/10

                  disabled:cursor-not-allowed

                  disabled:opacity-65

                  sm:px-5

                  sm:text-base

                "

              />

            </div>



            {/* ASISTENCIA */}



            <fieldset className="mt-7">

              <legend

                className="

                  mb-3

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#70465A]

                "

              >

                ¿Podrás acompañarme?

              </legend>



              <div

                className="

                  grid

                  grid-cols-1

                  gap-3

                  sm:grid-cols-2

                "

              >

                <label

                  className={`

                    relative

                    flex

                    min-h-[62px]

                    cursor-pointer

                    items-center

                    gap-3

                    rounded-2xl

                    border

                    px-4

                    py-3

                    transition-all



                    ${

                      asistencia === "Sí asistiré"

                        ? `

                          border-[#70465A]

                          bg-[#EAD2D6]

                          shadow-[0_10px_25px_rgba(112,70,90,0.10)]

                        `

                        : `

                          border-[#B89058]/30

                          bg-white

                          hover:border-[#70465A]/40

                        `

                    }



                    ${

                      loading

                        ? "pointer-events-none opacity-65"

                        : ""

                    }

                  `}

                >

                  <span

                    className={`

                      flex

                      h-6

                      w-6

                      flex-shrink-0

                      items-center

                      justify-center

                      rounded-full

                      border-2

                      transition



                      ${

                        asistencia === "Sí asistiré"

                          ? "border-[#70465A]"

                          : "border-[#D7A7AE]"

                      }

                    `}

                  >

                    {asistencia === "Sí asistiré" && (

                      <motion.span

                        initial={{

                          scale: 0,

                        }}

                        animate={{

                          scale: 1,

                        }}

                        className="

                          h-3

                          w-3

                          rounded-full

                          bg-[#70465A]

                        "

                      />

                    )}

                  </span>



                  <span

                    className="

                      text-sm

                      font-medium

                      text-[#70465A]

                      sm:text-[15px]

                    "

                  >

                    Sí asistiré

                  </span>



                  <input

                    type="radio"

                    name="asistencia"

                    value="Sí asistiré"

                    checked={asistencia === "Sí asistiré"}

                    disabled={loading}

                    onChange={() =>

                      seleccionarAsistencia("Sí asistiré")

                    }

                    className="sr-only"

                  />

                </label>



                <label

                  className={`

                    relative

                    flex

                    min-h-[62px]

                    cursor-pointer

                    items-center

                    gap-3

                    rounded-2xl

                    border

                    px-4

                    py-3

                    transition-all



                    ${

                      asistencia === "No podré asistir"

                        ? `

                          border-[#70465A]

                          bg-[#EAD2D6]

                          shadow-[0_10px_25px_rgba(112,70,90,0.10)]

                        `

                        : `

                          border-[#B89058]/30

                          bg-white

                          hover:border-[#70465A]/40

                        `

                    }



                    ${

                      loading

                        ? "pointer-events-none opacity-65"

                        : ""

                    }

                  `}

                >

                  <span

                    className={`

                      flex

                      h-6

                      w-6

                      flex-shrink-0

                      items-center

                      justify-center

                      rounded-full

                      border-2

                      transition



                      ${

                        asistencia === "No podré asistir"

                          ? "border-[#70465A]"

                          : "border-[#D7A7AE]"

                      }

                    `}

                  >

                    {asistencia === "No podré asistir" && (

                      <motion.span

                        initial={{

                          scale: 0,

                        }}

                        animate={{

                          scale: 1,

                        }}

                        className="

                          h-3

                          w-3

                          rounded-full

                          bg-[#70465A]

                        "

                      />

                    )}

                  </span>



                  <span

                    className="

                      text-sm

                      font-medium

                      text-[#70465A]

                      sm:text-[15px]

                    "

                  >

                    No podré asistir

                  </span>



                  <input

                    type="radio"

                    name="asistencia"

                    value="No podré asistir"

                    checked={asistencia === "No podré asistir"}

                    disabled={loading}

                    onChange={() =>

                      seleccionarAsistencia("No podré asistir")

                    }

                    className="sr-only"

                  />

                </label>

              </div>

            </fieldset>



            {/* NÚMERO DE ASISTENTES */}



            <AnimatePresence mode="wait">

              {asistencia === "Sí asistiré" && (

                <motion.div

                  key="selector-invitados"

                  initial={{

                    opacity: 0,

                    height: 0,

                    y: -8,

                  }}

                  animate={{

                    opacity: 1,

                    height: "auto",

                    y: 0,

                  }}

                  exit={{

                    opacity: 0,

                    height: 0,

                    y: -8,

                  }}

                  transition={{

                    duration: 0.35,

                  }}

                  className="overflow-hidden"

                >

                  <div className="mt-7">

                    <label

                      htmlFor="numero-invitados"

                      className="

                        mb-2

                        block

                        text-[10px]

                        font-semibold

                        uppercase

                        tracking-[0.2em]

                        text-[#70465A]

                      "

                    >

                      Personas que asistirán

                    </label>



                    <div className="relative">

                      <select

                        id="numero-invitados"

                        value={invitados}

                        disabled={loading}

                        onChange={(event) =>

                          setInvitados(

                            Number(event.target.value)

                          )

                        }

                        className="

                          min-h-[50px]

                          w-full

                          appearance-none

                          rounded-2xl

                          border

                          border-[#B89058]/30

                          bg-white

                          px-4

                          py-3

                          pr-12

                          text-center

                          font-playfair

                          text-[16px]

                          text-[#452735]

                          outline-none

                          transition

                          focus:border-[#70465A]

                          focus:ring-2

                          focus:ring-[#70465A]/10

                          disabled:cursor-not-allowed

                          disabled:opacity-65

                        "

                      >

                        {opcionesInvitados.map((cantidad) => (

                          <option

                            key={cantidad}

                            value={cantidad}

                          >

                            {cantidad}{" "}

                            {cantidad === 1

                              ? "persona"

                              : "personas"}

                          </option>

                        ))}

                      </select>



                      <span

                        aria-hidden="true"

                        className="

                          pointer-events-none

                          absolute

                          right-5

                          top-1/2

                          -translate-y-1/2

                          text-[#70465A]

                        "

                      >

                        ▾

                      </span>

                    </div>



                    <p

                      className="

                        mt-2

                        text-center

                        text-xs

                        leading-relaxed

                        text-[#725563]

                      "

                    >

                      Esta invitación tiene{" "}

                      <strong className="text-[#70465A]">

                        {pasesPermitidos}{" "}

                        {pasesPermitidos === 1

                          ? "lugar asignado"

                          : "lugares asignados"}

                      </strong>

                      .

                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>



            {/* MENSAJE */}



            <div className="mt-7">

              <label

                htmlFor="mensaje-invitado"

                className="

                  mb-2

                  block

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#70465A]

                "

              >

                Mensaje para Carla



                <span

                  className="

                    ml-2

                    normal-case

                    tracking-normal

                    text-[#A98D98]

                  "

                >

                  (opcional)

                </span>

              </label>



              <textarea

                id="mensaje-invitado"

                rows={4}

                maxLength={350}

                placeholder="Escribe un mensaje especial..."

                value={mensajeInvitado}

                disabled={loading}

                onChange={(event) =>

                  setMensajeInvitado(event.target.value)

                }

                className="

                  min-h-[120px]

                  w-full

                  resize-none

                  rounded-2xl

                  border

                  border-[#B89058]/30

                  bg-white

                  px-4

                  py-4

                  font-playfair

                  text-[15px]

                  leading-relaxed

                  text-[#452735]

                  outline-none

                  transition

                  placeholder:text-[#A98D98]

                  focus:border-[#70465A]

                  focus:ring-2

                  focus:ring-[#70465A]/10

                  disabled:cursor-not-allowed

                  disabled:opacity-65

                  sm:px-5

                "

              />



              <p

                className="

                  mt-1.5

                  text-right

                  text-[10px]

                  text-[#A98D98]

                "

              >

                {mensajeInvitado.length}/350

              </p>

            </div>



            {/* MENSAJES */}



            <div className="mt-5 min-h-[46px]">

              <AnimatePresence mode="wait">

                {error && (

                  <motion.div

                    key="mensaje-error"

                    initial={{

                      opacity: 0,

                      y: 8,

                      scale: 0.98,

                    }}

                    animate={{

                      opacity: 1,

                      y: 0,

                      scale: 1,

                    }}

                    exit={{

                      opacity: 0,

                      y: -5,

                    }}

                    className="

                      rounded-2xl

                      border

                      border-red-200

                      bg-red-50

                      px-4

                      py-3

                      text-center

                      text-sm

                      leading-relaxed

                      text-red-600

                    "

                  >

                    {error}

                  </motion.div>

                )}



                {enviado && !error && (

                  <motion.div

                    key="mensaje-exito"

                    initial={{

                      opacity: 0,

                      y: 8,

                      scale: 0.98,

                    }}

                    animate={{

                      opacity: 1,

                      y: 0,

                      scale: 1,

                    }}

                    exit={{

                      opacity: 0,

                      y: -5,

                    }}

                    className="

                      rounded-2xl

                      border

                      border-[#B89058]/40

                      bg-[#EAD2D6]

                      px-4

                      py-3

                      text-center

                      text-sm

                      leading-relaxed

                      text-[#70465A]

                    "

                  >

                    <span className="mr-1">✓</span>

                    Tu confirmación fue enviada correctamente.

                  </motion.div>

                )}

              </AnimatePresence>

            </div>



            {/* BOTÓN ENVIAR */}



            <motion.button

              type="button"

              onClick={enviarConfirmacion}

              disabled={loading}

              className={`

                mt-2

                inline-flex

                min-h-[52px]

                w-full

                items-center

                justify-center

                rounded-full

                border

                border-[#70465A]

                px-7

                py-4

                text-white

                shadow-[0_16px_34px_rgba(112,70,90,0.25)]

                outline-none

                transition-colors

                focus-visible:ring-2

                focus-visible:ring-[#B89058]

                focus-visible:ring-offset-2



                ${

                  loading

                    ? `

                      cursor-not-allowed

                      bg-[#9B7A89]

                      opacity-70

                    `

                    : `

                      cursor-pointer

                      bg-[#70465A]

                      hover:bg-[#5D394B]

                    `

                }

              `}

              whileHover={

                loading

                  ? undefined

                  : {

                      scale: 1.025,

                      y: -2,

                    }

              }

              whileTap={

                loading

                  ? undefined

                  : {

                      scale: 0.98,

                    }

              }

            >

              <span

                className="

                  flex

                  items-center

                  justify-center

                  gap-3

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  sm:text-[11px]

                  sm:tracking-[0.28em]

                "

              >

                {loading ? (

                  <>

                    <span

                      className="

                        h-5

                        w-5

                        animate-spin

                        rounded-full

                        border-2

                        border-white/40

                        border-t-white

                      "

                    />



                    Enviando

                  </>

                ) : (

                  <>

                    Enviar confirmación

                    <span aria-hidden="true" className="text-base">

                      ✦

                    </span>

                  </>

                )}

              </span>

            </motion.button>



            {/* AVISO */}



            <p

              className="

                mx-auto

                mt-5

                max-w-md

                text-center

                text-[11px]

                leading-relaxed

                text-[#725563]

              "

            >

              Por favor, envía una sola confirmación por invitación.

            </p>

          </div>

        </motion.div>

      </div>

    </motion.section>

  );

};



export default Confirmacion;