import React from "react";
import { motion } from "framer-motion";

const Familia = () => {
  const animacionContenedor = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const animacionElemento = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
  };

  const animacionNombres = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 18,
    },

    visible: {
      opacity: 1,
      scale: 1,
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
        min-h-[760px]
        w-full
        items-center
        justify-center
        overflow-hidden

        bg-[linear-gradient(180deg,#FFF9F5_0%,#F7E7E7_48%,#EACFD3_100%)]

        px-5
        py-20

        sm:min-h-[820px]
        sm:px-8
        sm:py-24

        md:min-h-[880px]

        lg:px-12
        lg:py-28
      "
    >
      {/* =================================================
          RESPLANDORES DEL FONDO
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          -z-30
          h-[70%] w-[75%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/70
          blur-[80px]
        "
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-32 top-1/3
          -z-30
          h-80 w-80
          rounded-full
          bg-[#D7A7AE]/20
          blur-[100px]
        "
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.45, 0.8, 0.45],
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
          absolute -right-32 bottom-1/4
          -z-30
          h-80 w-80
          rounded-full
          bg-[#A56F85]/15
          blur-[100px]
        "
        animate={{
          scale: [1.12, 1, 1.12],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          ÁRBOLES FLORALES
      ================================================= */}

      <motion.img
        src="/arbolesPadres.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          h-full w-full
          object-cover
          object-center

          sm:object-fill
        "
        initial={{
          opacity: 0,
          scale: 1.04,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: {
            duration: 1.3,
          },

          scale: {
            duration: 4,
            ease: "easeOut",
          },
        }}
        viewport={{
          once: true,
        }}
      />

      {/* =================================================
          PEQUEÑOS PUNTOS DE LUZ
      ================================================= */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[14%] top-[32%]
          z-0
          h-1.5 w-1.5
          rounded-full
          bg-[#EBD5A5]
          shadow-[0_0_18px_rgba(235,213,165,0.95)]
        "
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.25, 0.8],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[15%] top-[43%]
          z-0
          h-1 w-1
          rounded-full
          bg-[#EBD5A5]
          shadow-[0_0_16px_rgba(235,213,165,0.9)]
        "
        animate={{
          opacity: [1, 0.3, 1],
          scale: [1, 0.7, 1],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[24%] left-[19%]
          z-0
          h-1 w-1
          rounded-full
          bg-white
          shadow-[0_0_14px_rgba(255,255,255,0.95)]
        "
        animate={{
          opacity: [0.35, 1, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          CONTENIDO CENTRAL
      ================================================= */}

      <motion.div
        className="
          relative z-10
          mx-auto
          flex w-full
          max-w-[620px]
          flex-col
          items-center
          text-center
        "
        variants={animacionContenedor}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
      >
        {/* ENCABEZADO */}

        <motion.div
          className="
            mb-6
            flex items-center justify-center
            gap-3

            sm:mb-8
            sm:gap-5
          "
          variants={animacionElemento}
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

        {/* TEXTO INTRODUCTORIO */}

  

        {/* TÍTULO */}

        <motion.h2
          className="
            font-cursiveDancing
            text-[48px]
            font-normal
            leading-none
            text-[#70465A]

            drop-shadow-[0_2px_2px_rgba(255,255,255,0.75)]

            sm:text-[64px]
            md:text-[74px]
          "
          variants={animacionElemento}
        >
          Mis padres
        </motion.h2>

        {/* DIVISOR */}

        <motion.div
          className="
            my-6
            flex items-center justify-center
            gap-3

            sm:my-8
          "
          variants={animacionElemento}
        >
          <span
            className="
              h-px w-8
              bg-gradient-to-r
              from-transparent
              to-[#C7A56A]

              sm:w-12
            "
          />

          <span
            className="
              h-1.5 w-1.5
              rotate-45
              bg-[#C7A56A]
            "
          />

          <span
            className="
              h-px w-8
              bg-gradient-to-l
              from-transparent
              to-[#C7A56A]

              sm:w-12
            "
          />
        </motion.div>

        {/* NOMBRES DE LOS PADRES */}

        <motion.div
          className="
            flex flex-col
            items-center
            gap-3
          "
          variants={animacionNombres}
        >
          <p
            className="
              font-playfair
              text-[25px]
              leading-snug
              text-[#452735]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[32px]
              md:text-[36px]
            "
          >
            Antonio Mora
          </p>

          <span
            className="
              font-cursiveDancing
              text-2xl
              leading-none
              text-[#B89058]

              sm:text-3xl
            "
          >
            &
          </span>

          <p
            className="
              font-playfair
              text-[25px]
              leading-snug
              text-[#452735]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[32px]
              md:text-[36px]
            "
          >
            Mayte Sánchez
          </p>
        </motion.div>

        {/* SEPARACIÓN CENTRAL */}

        <motion.div
          className="
            my-9
            flex flex-col
            items-center

            sm:my-11
          "
          variants={animacionElemento}
        >
          <span
            className="
              h-10 w-px
              bg-gradient-to-b
              from-transparent
              via-[#B89058]
              to-[#B89058]
            "
          />

          <span
            className="
              my-2
              h-2 w-2
              rotate-45
              border
              border-[#B89058]
              bg-[#FFF9F5]/70
            "
          />

          <span
            className="
              h-10 w-px
              bg-gradient-to-b
              from-[#B89058]
              via-[#B89058]
              to-transparent
            "
          />
        </motion.div>

        {/* TEXTO DE PADRINOS */}

        <motion.p
          className="
            mx-auto
            mb-5
            max-w-[440px]

            font-playfair
            text-[17px]
            italic
            leading-relaxed
            text-[#70465A]

            drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]

            sm:text-[21px]
            md:text-[23px]
          "
          variants={animacionElemento}
        >
          Y acompañada siempre por mis padrinos
        </motion.p>

        {/* NOMBRES DE LOS PADRINOS */}

        <motion.div
          className="
            flex flex-col
            items-center
            gap-3
          "
          variants={animacionNombres}
        >
          <p
            className="
              font-playfair
              text-[24px]
              leading-snug
              text-[#452735]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[30px]
              md:text-[34px]
            "
          >
            Fermín García
          </p>

          <span
            className="
              font-cursiveDancing
              text-2xl
              leading-none
              text-[#B89058]

              sm:text-3xl
            "
          >
            &
          </span>

          <p
            className="
              font-playfair
              text-[24px]
              leading-snug
              text-[#452735]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[30px]
              md:text-[34px]
            "
          >
            Samantha López
          </p>
        </motion.div>

        {/* CIERRE DECORATIVO */}

        <motion.div
          className="
            mt-8
            flex items-center justify-center
            gap-3

            sm:mt-10
          "
          variants={animacionElemento}
        >
          <span
            className="
              h-px w-10
              bg-gradient-to-r
              from-transparent
              to-[#B89058]/70

              sm:w-16
            "
          />

          <span
            className="
              font-playfair
              text-base
              text-[#B89058]
            "
          >
            ❦
          </span>

          <span
            className="
              h-px w-10
              bg-gradient-to-l
              from-transparent
              to-[#B89058]/70

              sm:w-16
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Familia;