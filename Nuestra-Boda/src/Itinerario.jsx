"use client";

import { motion } from "framer-motion";

/* =====================================================
   INFORMACIÓN DEL ITINERARIO
===================================================== */

const eventos = [
  {
    hora: "7:30 pm",
    titulo: "Bienvenida de familiares, amigos y fotografía con la quinceañera.",
    icono: "✦",
  },
  {
    hora: "9:00 PM",
    titulo: "Entrada y Vals de la quinceañera.",
    icono: "✧",
  },
  {
    hora: "9:030 PM",
    titulo: "Baile",
    icono: "❦",
  },
  {
    hora: "10:30 PM",
    titulo: "Bailé sorpresa",
    icono: "♡",
  },
  {
    hora: "11:00 PM",
    titulo: "Cena",
    icono: "✦",
  },
  {
    hora: "11:30 PM a 2:00 am",
    titulo: "Baile",
    icono: "✧",
  },

];

/* =====================================================
   ANIMACIONES
===================================================== */

const animacionContenedor = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

const animacionElemento = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   COMPONENTE
===================================================== */

const ItinerarioTimelinePremium = () => {
  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden

        bg-[#F5E6E5]

        px-4
        py-20

        sm:px-6
        sm:py-24

        md:py-28

        lg:px-10
        lg:py-32
      "
    >
      {/* =================================================
          IMAGEN DE FONDO
      ================================================= */}

      <motion.img
        src="/fondoItinerario.png"
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
          scale: 1.04,
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

      {/* =================================================
          CAPA CLARA PARA MEJORAR LA LECTURA
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-20
          bg-[#FFF9F5]/18
        "
      />

      {/* CLARIDAD CENTRAL */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          -z-10

          h-[92%]
          w-[82%]
          max-w-[720px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
          bg-[#FFF9F5]/35
          blur-[50px]

          sm:w-[70%]
        "
      />

      {/* =================================================
          CONTENIDO
      ================================================= */}

      <motion.div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-[680px]
          text-center
        "
        variants={animacionContenedor}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.08,
        }}
      >
        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <motion.div variants={animacionElemento}>
          <div
            className="
              flex
              items-center
              justify-center
              gap-3

              sm:gap-5
            "
          >
            <span
              className="
                h-px
                w-9

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
                h-px
                w-9

                bg-gradient-to-l
                from-transparent
                to-[#B89058]

                sm:w-16
              "
            />
          </div>


          <h2
            className="
              mt-3

              font-cursiveDancing
              text-[48px]
              leading-[0.95]
              text-[#70465A]

              drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]

              sm:text-[64px]
              md:text-[78px]
            "
          >
            Itinerario
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-lg

              font-playfair
              text-[15px]
              leading-relaxed
              text-[#725563]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[17px]
            "
          >
            Acompáñame a disfrutar cada momento de esta celebración.
          </p>
        </motion.div>

        {/* =================================================
            ORNAMENTO
        ================================================= */}

        <motion.div
          className="
            my-9

            flex
            items-center
            justify-center
            gap-3

            sm:my-12
          "
          variants={animacionElemento}
        >
          <span
            className="
              h-px
              w-12

              bg-gradient-to-r
              from-transparent
              to-[#B89058]

              sm:w-20
            "
          />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#B89058]
              bg-[#FFF9F5]/80
            "
          />

          <span
            className="
              h-px
              w-12

              bg-gradient-to-l
              from-transparent
              to-[#B89058]

              sm:w-20
            "
          />
        </motion.div>

        {/* =================================================
            LÍNEA DEL ITINERARIO
        ================================================= */}

        <div className="relative mx-auto max-w-[460px]">
          {/* LÍNEA CENTRAL */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-5

              h-[calc(100%-2.5rem)]
              w-px

              -translate-x-1/2

              bg-gradient-to-b
              from-transparent
              via-[#B89058]/65
              to-transparent
            "
          />

          {/* EVENTOS */}

          <div
            className="
              relative
              flex
              flex-col
              items-center

              gap-8

              sm:gap-10
            "
          >
            {eventos.map((evento, index) => (
              <motion.article
                key={`${evento.hora}-${evento.titulo}`}
                className="
                  relative
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
                variants={animacionElemento}
              >
                {/* HORA */}

                <p
                  className="
                    relative z-10

                    rounded-full
                    border
                    border-[#B89058]/35

                    bg-[#FFF9F5]/75

                    px-4
                    py-1.5

                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#70465A]

                    shadow-[0_5px_18px_rgba(112,70,90,0.08)]

                    sm:text-[11px]
                    sm:tracking-[0.3em]
                  "
                >
                  {evento.hora}
                </p>

                {/* PUNTO E ICONO */}

                <motion.div
                  className="
                    relative z-10
                    my-3

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full
                    border
                    border-[#B89058]/40

                    bg-[#F8E9E8]

                    text-base
                    text-[#70465A]

                    shadow-[0_8px_22px_rgba(112,70,90,0.13)]
                  "
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  {evento.icono}
                </motion.div>

                {/* NOMBRE DEL EVENTO */}

                <h3
                  className="
                    relative z-10

                    font-cursiveDancing
                    text-[34px]
                    leading-none
                    text-[#452735]

                    drop-shadow-[0_2px_2px_rgba(255,255,255,0.85)]

                    sm:text-[42px]
                  "
                >
                  {evento.titulo}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>

        {/* =================================================
            CIERRE
        ================================================= */}

        <motion.div
          className="
            mt-12

            flex
            flex-col
            items-center

            sm:mt-16
          "
          variants={animacionElemento}
        >
          <div
            className="
              mb-5
              h-px
              w-28

              bg-gradient-to-r
              from-transparent
              via-[#B89058]
              to-transparent

              sm:w-40
            "
          />

          <p
            className="
              max-w-lg

              font-cursiveDancing
              text-[25px]
              leading-relaxed
              text-[#70465A]

              drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]

              sm:text-[32px]
            "
          >
            Cada momento será más especial al compartirlo contigo.
          </p>

  
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ItinerarioTimelinePremium;