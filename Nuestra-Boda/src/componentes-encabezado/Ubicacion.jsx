"use client";

import { motion } from "framer-motion";

/* =====================================================
   INFORMACIÓN DEL EVENTO
===================================================== */

const DATOS_EVENTO = {
  diaSemana: "Viernes",
  dia: "30",
  mes: "Octubre",
  anio: "2026",

  // Cambia este texto cuando tengas la hora definitiva
  hora: "Por confirmar",

  ubicacion:
    "https://maps.app.goo.gl/tYqGiXWF39RrR7WB9",
};

/* =====================================================
   ANIMACIONES
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

const contenedor = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const aparecer = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.85,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function EventoDireccion() {
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
        isolate
        flex
        min-h-[760px]
        w-full
        items-center
        justify-center
        overflow-hidden

        px-4
        py-20

        sm:min-h-[820px]
        sm:px-6
        sm:py-24

        lg:px-10
        lg:py-28
      "
      style={{
        background: `
          radial-gradient(
            circle at 15% 15%,
            rgba(215,167,174,0.22),
            transparent 30%
          ),
          radial-gradient(
            circle at 85% 85%,
            rgba(165,111,133,0.18),
            transparent 32%
          ),
          linear-gradient(
            145deg,
            #fffaf8 0%,
            #f8e9e8 45%,
            #ead2d6 100%
          )
        `,
      }}
    >
      {/* =================================================
          RESPLANDORES DECORATIVOS
      ================================================= */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-32 -top-32
          -z-10
          h-[360px] w-[360px]
          rounded-full
          bg-[#D7A7AE]/20
          blur-[100px]

          sm:h-[480px]
          sm:w-[480px]
        "
        animate={{
          scale: [1, 1.13, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-36 -right-36
          -z-10
          h-[380px] w-[380px]
          rounded-full
          bg-[#A56F85]/20
          blur-[110px]

          sm:h-[520px]
          sm:w-[520px]
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          CÍRCULOS DECORATIVOS
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-24 top-1/2
          -z-10
          h-64 w-64
          -translate-y-1/2
          rounded-full
          border
          border-[#C7A56A]/20

          sm:h-80
          sm:w-80
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-20 top-[42%]
          -z-10
          h-48 w-48
          rounded-full
          border
          border-[#A56F85]/15

          sm:h-64
          sm:w-64
        "
      />

      {/* =================================================
          TEXTURA MUY LIGERA
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(112,70,90,0.15) 0px,
              rgba(112,70,90,0.15) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
        }}
      />

      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <motion.div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-4xl
          text-center
        "
        variants={contenedor}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        {/* ETIQUETA SUPERIOR */}

        <motion.div
          className="
            flex items-center
            justify-center
            gap-3

            sm:gap-5
          "
          variants={aparecer}
        >
          <span
            className="
              h-px w-9
              bg-gradient-to-r
              from-transparent
              to-[#C7A56A]

              sm:w-16
            "
          />

          <p
            className="
              whitespace-nowrap
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#70465A]

              sm:text-[11px]
              sm:tracking-[0.45em]
            "
          >
            Save the date
          </p>

          <span
            className="
              h-px w-9
              bg-gradient-to-l
              from-transparent
              to-[#C7A56A]

              sm:w-16
            "
          />
        </motion.div>

        {/* TÍTULO */}

        <motion.h2
          className="
            mt-5

            font-cursiveDancing
            text-[48px]
            font-normal
            leading-tight
            text-[#70465A]

            sm:text-[62px]
            md:text-[76px]
          "
          variants={aparecer}
        >
          Celebremos juntos
        </motion.h2>

        {/* TEXTO */}

        <motion.p
          className="
            mx-auto mt-4
            max-w-xl

            font-playfair
            text-[16px]
            leading-relaxed
            text-[#725563]

            sm:text-[18px]
          "
          variants={aparecer}
        >
          Te espero para compartir conmigo este día tan especial.
        </motion.p>

        {/* =================================================
            TARJETA DE FECHA
        ================================================= */}

        <motion.div
          className="
            relative
            mx-auto mt-10
            w-full
            max-w-[620px]
            overflow-hidden

            rounded-[32px]
            border
            border-white/70

            bg-white/45

            px-5
            py-10

            shadow-[0_25px_65px_rgba(112,70,90,0.13)]
            backdrop-blur-lg

            sm:mt-14
            sm:rounded-[40px]
            sm:px-10
            sm:py-14

            md:px-14
          "
          variants={aparecer}
        >
          {/* BRILLO INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-br
              from-white/60
              via-transparent
              to-[#D7A7AE]/10
            "
          />

          {/* MARCO INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-3
              rounded-[24px]
              border
              border-[#C7A56A]/20

              sm:inset-4
              sm:rounded-[30px]
            "
          />

          <div className="relative z-10">
            {/* ORNAMENTO */}

            <motion.div
              className="
                flex items-center
                justify-center
              "
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  to-[#C7A56A]
                "
                animate={{
                  width: ["38px", "70px", "38px"],
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
                  text-[#C7A56A]
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

              <motion.span
                className="
                  h-px
                  bg-gradient-to-l
                  from-transparent
                  to-[#C7A56A]
                "
                animate={{
                  width: ["38px", "70px", "38px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* DÍA DE LA SEMANA */}

            <p
              className="
                mt-7

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#9A7482]

                sm:text-[12px]
                sm:tracking-[0.5em]
              "
            >
              {DATOS_EVENTO.diaSemana}
            </p>

            {/* NÚMERO DEL DÍA */}

            <motion.p
              className="
                my-2

                font-cursiveDancing
                text-[88px]
                leading-none

                sm:text-[116px]
              "
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    #A56F85 0%,
                    #70465A 48%,
                    #452735 100%
                  )
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 8px 18px rgba(112,70,90,0.15))",
              }}
              animate={{
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {DATOS_EVENTO.dia}
            </motion.p>

            {/* MES Y AÑO */}

            <p
              className="
                text-[12px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#70465A]

                sm:text-[15px]
                sm:tracking-[0.42em]
              "
            >
              {DATOS_EVENTO.mes} • {DATOS_EVENTO.anio}
            </p>

            {/* SEPARADOR */}

            <div
              className="
                mx-auto my-7
                h-px w-28
                bg-gradient-to-r
                from-transparent
                via-[#C7A56A]
                to-transparent

                sm:w-40
              "
            />

            {/* HORA */}

            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#9A7482]

                  sm:text-[11px]
                  sm:tracking-[0.4em]
                "
              >
                Hora
              </p>

              <p
                className="
                  mt-3

                  font-playfair
                  text-[25px]
                  leading-none
                  text-[#452735]

                  sm:text-[32px]
                "
              >
                {DATOS_EVENTO.hora}
              </p>
            </div>

            {/* =================================================
                BOTÓN DE GOOGLE MAPS
            ================================================= */}

            <motion.a
              href={DATOS_EVENTO.ubicacion}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir ubicación del evento en Google Maps"
              className="
                relative
                mx-auto mt-8

                inline-flex
                min-h-[50px]
                w-full
                max-w-[260px]

                items-center
                justify-center
                overflow-hidden

                rounded-full

                px-6
                py-3.5
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #A56F85 0%,
                    #70465A 52%,
                    #452735 100%
                  )
                `,
                boxShadow: `
                  0 14px 30px rgba(112,70,90,0.25),
                  inset 0 1px 0 rgba(255,255,255,0.22)
                `,
              }}
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              {/* BRILLO DEL BOTÓN */}

              <motion.span
                aria-hidden="true"
                className="
                  absolute top-0
                  h-full w-[80%]
                  -skew-x-12
                  bg-white/20
                "
                initial={{
                  left: "-120%",
                }}
                animate={{
                  left: ["-120%", "150%"],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
              />

              {/* ICONO DE UBICACIÓN */}

              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="
                  relative z-10
                  mr-2
                  h-4 w-4
                  shrink-0
                "
              >
                <path
                  d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>

              <span
                className="
                  relative z-10

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white

                  sm:text-[11px]
                  sm:tracking-[0.28em]
                "
              >
                Ver ubicación
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* MENSAJE FINAL */}

        <motion.p
          className="
            mx-auto mt-10
            max-w-xl

            font-cursiveDancing
            text-[26px]
            leading-relaxed
            text-[#70465A]

            sm:mt-14
            sm:text-[34px]
          "
          variants={aparecer}
        >
          Tu presencia hará este momento aún más especial.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}