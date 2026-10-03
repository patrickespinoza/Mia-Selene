import React from "react";
import { motion } from "framer-motion";

const FrasePersonalizada = () => {
  const frase =
    "Hoy doy gracias a Dios por regalarme la vida y poder celebrar con mi familia y amigos mis XV años, el comienzo de otra etapa, otros sueños.";

  const nombre = "Mia Selene";

  const contenedor = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.15,
      },
    },
  };

  const aparecerArriba = {
    hidden: {
      opacity: 0,
      y: -20,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  const aparecerCentro = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },

    show: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  const aparecerAbajo = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="
        relative
        isolate
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#E8D2D4]

        px-4
        py-20

        sm:px-8
        sm:py-24

        md:min-h-[760px]

        lg:px-12
        lg:py-28
      "
    >
      {/* =================================================
          IMAGEN DE FONDO
      ================================================= */}

      <motion.img
        src="/fraseBosque.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-30
          h-full w-full
          object-cover
          object-center
        "
        initial={{
          opacity: 0,
          scale: 1.06,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: {
            duration: 1.2,
          },

          scale: {
            duration: 5,
            ease: "easeOut",
          },
        }}
        viewport={{
          once: true,
        }}
      />

      {/* CAPA MUY LIGERA SOBRE LA IMAGEN */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-20
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,249,247,0.04) 0%,
              rgba(255,245,243,0.08) 45%,
              rgba(112,70,90,0.08) 100%
            )
          `,
        }}
      />

      {/* LUCES DECORATIVAS */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[11%] top-[35%]
          h-1.5 w-1.5
          rounded-full
          bg-[#F5DCA4]
          shadow-[0_0_18px_rgba(245,220,164,0.95)]
        "
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.25, 0.8],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[12%] top-[24%]
          h-1 w-1
          rounded-full
          bg-[#F5DCA4]
          shadow-[0_0_16px_rgba(245,220,164,0.9)]
        "
        animate={{
          opacity: [1, 0.35, 1],
          scale: [1, 0.7, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[22%] right-[16%]
          h-1.5 w-1.5
          rounded-full
          bg-[#FFF4DE]
          shadow-[0_0_18px_rgba(255,244,222,0.95)]
        "
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          CONTENIDO
      ================================================= */}

      <motion.div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-[760px]
        "
        variants={contenedor}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        {/* =================================================
            TARJETA COMPLETAMENTE TRANSPARENTE
        ================================================= */}

        <motion.div
          className="
            relative
            overflow-hidden

            rounded-[2rem]
            border
            border-white/45

            bg-transparent

            px-6
            py-12

            text-center

            shadow-none
            backdrop-blur-none

            sm:rounded-[2.5rem]
            sm:px-12
            sm:py-16

            md:px-16
            md:py-20
          "
          variants={aparecerCentro}
        >
          {/* MARCO INTERIOR */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-3

              rounded-[1.45rem]
              border
              border-[#B89058]/35

              sm:inset-4
              sm:rounded-[2rem]
            "
          />

          {/* ENCABEZADO */}

          <motion.div
            className="
              relative z-10
              mb-6
              flex
              items-center
              justify-center
              gap-3

              sm:mb-8
              sm:gap-5
            "
            variants={aparecerArriba}
          >
            <span
              className="
                h-px w-10
                bg-gradient-to-r
                from-transparent
                to-[#B89058]

                sm:w-16
              "
            />

            <motion.span
              className="
                text-lg
                text-[#B89058]

                sm:text-2xl
              "
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.span>

            <span
              className="
                h-px w-10
                bg-gradient-to-l
                from-transparent
                to-[#B89058]

                sm:w-16
              "
            />
          </motion.div>

          {/* TEXTO SUPERIOR */}

          <motion.p
            className="
              relative z-10
              mb-5

              text-[9px]
              font-semibold
              uppercase
              tracking-[0.27em]
              text-[#70465A]

              sm:text-[11px]
              sm:tracking-[0.42em]
            "
            variants={aparecerArriba}
          >
            Una nueva etapa comienza
          </motion.p>

          {/* COMILLA DE APERTURA */}

          <motion.span
            className="
              relative z-10
              block
              h-10

              font-playfair
              text-6xl
              leading-none
              text-[#B89058]/75

              sm:h-12
              sm:text-7xl
            "
            variants={aparecerCentro}
          >
            “
          </motion.span>

          {/* FRASE */}

          <motion.p
            className="
              relative z-10
              mx-auto
              max-w-2xl

              font-playfair
              text-[22px]
              font-normal
              leading-[1.65]
              text-[#452735]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]

              sm:text-[29px]
              sm:leading-[1.65]

              md:text-[34px]
              md:leading-[1.6]

              lg:text-[38px]
            "
            variants={aparecerCentro}
          >
            {frase}
          </motion.p>

          {/* COMILLA DE CIERRE */}

          <motion.span
            className="
              relative z-10
              mt-1
              block h-8

              font-playfair
              text-6xl
              leading-none
              text-[#B89058]/75

              sm:text-7xl
            "
            variants={aparecerCentro}
          >
            ”
          </motion.span>

          {/* SEPARADOR */}

          <motion.div
            className="
              relative z-10
              mx-auto
              my-7

              flex
              items-center
              justify-center
              gap-3

              sm:my-9
            "
            variants={aparecerAbajo}
          >
            <span
              className="
                h-px w-8
                bg-gradient-to-r
                from-transparent
                to-[#B89058]

                sm:w-14
              "
            />

            <span
              className="
                h-1.5 w-1.5
                rotate-45
                bg-[#B89058]
                shadow-[0_0_12px_rgba(184,144,88,0.55)]
              "
            />

            <span
              className="
                h-px w-8
                bg-gradient-to-l
                from-transparent
                to-[#B89058]

                sm:w-14
              "
            />
          </motion.div>


          {/* ESQUINA SUPERIOR IZQUIERDA */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-6 top-6

              h-12 w-12

              border-l
              border-t
              border-[#B89058]/45

              sm:left-9
              sm:top-9
              sm:h-16
              sm:w-16
            "
          />

          {/* ESQUINA INFERIOR DERECHA */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute bottom-6 right-6

              h-12 w-12

              border-b
              border-r
              border-[#B89058]/45

              sm:bottom-9
              sm:right-9
              sm:h-16
              sm:w-16
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FrasePersonalizada;