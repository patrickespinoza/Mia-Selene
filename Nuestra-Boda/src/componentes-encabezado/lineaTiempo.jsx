import React from "react";
import { motion } from "framer-motion";

/* =====================================================
   IMÁGENES DE LA GALERÍA
===================================================== */

const IMAGENES = [
  {
    src: "/galeria01.jpeg",
    posicion: "object-[center_35%]",
    tamanio:
      "md:col-span-7 md:row-span-2 lg:col-span-7 lg:row-span-2",
    altura: "h-[460px] sm:h-[560px] md:h-full",
    entrada: {
      x: -50,
      y: 30,
    },
  },
  {
    src: "/galeria02.jpeg",
    posicion: "object-[center_30%]",
    tamanio:
      "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
    altura: "h-[360px] sm:h-[430px] md:h-full",
    entrada: {
      x: 50,
      y: 20,
    },
  },
  {
    src: "/galeria03.jpeg",
    posicion: "object-[center_42%]",
    tamanio:
      "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
    altura: "h-[420px] sm:h-[480px] md:h-full",
    entrada: {
      x: 50,
      y: 40,
    },
  },
  {
    src: "/galeria04.jpeg",
    posicion: "object-[center_35%]",
    tamanio:
      "md:col-span-5 md:row-span-1 lg:col-span-5 lg:row-span-1",
    altura: "h-[390px] sm:h-[460px] md:h-full",
    entrada: {
      x: -45,
      y: 35,
    },
  },
  {
    src: "/galeria05.jpeg",
    posicion: "object-[center_40%]",
    tamanio:
      "md:col-span-7 md:row-span-2 lg:col-span-7 lg:row-span-2",
    altura: "h-[500px] sm:h-[600px] md:h-full",
    entrada: {
      x: 50,
      y: 30,
    },
  },
];

/* =====================================================
   COMPONENTE
===================================================== */

const LineaDelTiempo = () => {
  return (
    <section
      className="
        relative
        w-full
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
      <div className="relative mx-auto w-full max-w-7xl">
        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mx-auto
            mb-14
            max-w-3xl
            text-center

            sm:mb-16
            md:mb-20
          "
        >
          {/* ORNAMENTO SUPERIOR */}

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
                w-8

                bg-gradient-to-r
                from-transparent
                to-[#B89058]

                sm:w-16
              "
            />

            <motion.span
              className="
                text-base
                text-[#B89058]

                sm:text-lg
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
                w-8

                bg-gradient-to-l
                from-transparent
                to-[#B89058]

                sm:w-16
              "
            />
          </div>

          {/* ETIQUETA */}

          <p
            className="
              mt-5

              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#70465A]

              sm:text-[11px]
              sm:tracking-[0.45em]
            "
          >
            Recuerdos que atesoro
          </p>

          {/* TÍTULO */}

          <h2
            className="
              mt-3

              font-cursiveDancing
              text-[48px]
              leading-tight
              text-[#70465A]

              sm:text-[64px]
              md:text-[78px]
            "
          >
            Mis momentos
          </h2>

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl

              font-playfair
              text-[15px]
              leading-relaxed
              text-[#725563]

              sm:text-[18px]
            "
          >
            Instantes especiales que forman parte de mi historia.
          </p>
        </motion.div>

        {/* =================================================
            GALERÍA
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            sm:gap-6

            md:auto-rows-[260px]
            md:grid-cols-12
            md:gap-7

            lg:auto-rows-[300px]
            lg:gap-8
          "
        >
          {IMAGENES.map((imagen, index) => (
            <motion.article
              key={imagen.src}
              initial={{
                opacity: 0,
                scale: 0.96,
                x: imagen.entrada.x,
                y: imagen.entrada.y,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
                amount: 0.16,
              }}
              className={`
                group
                relative
                w-full
                overflow-hidden

                rounded-[28px]
                border
                border-[#B89058]/35

                bg-[#FFF9F5]/60

                p-2.5

                shadow-[0_24px_60px_rgba(112,70,90,0.16)]

                sm:rounded-[34px]
                sm:p-3

                ${imagen.tamanio}
              `}
            >
              {/* MARCO DE LA FOTOGRAFÍA */}

              <div
                className={`
                  relative
                  w-full
                  overflow-hidden

                  rounded-[21px]
                  bg-[#D7A7AE]

                  sm:rounded-[27px]

                  ${imagen.altura}
                `}
              >
                <motion.img
                  src={imagen.src}
                  alt={`Fotografía ${index + 1} de Mia Selene`}
                  loading={index < 2 ? "eager" : "lazy"}
                  className={`
                    h-full
                    w-full
                    object-cover

                    transition-transform
                    duration-1000
                    ease-out

                    group-hover:scale-[1.06]

                    ${imagen.posicion}
                  `}
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* SOMBRA INFERIOR */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-[#452735]/30
                    via-transparent
                    to-transparent
                  "
                />

                {/* BRILLO ANIMADO */}

                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    top-0

                    h-full
                    w-[40%]

                    -skew-x-12

                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                  "
                  initial={{
                    left: "-70%",
                  }}
                  whileInView={{
                    left: "140%",
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.3 + index * 0.08,
                    ease: "easeInOut",
                  }}
                  viewport={{
                    once: true,
                  }}
                />

                {/* BORDE INTERIOR */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-3

                    rounded-[16px]
                    border
                    border-white/25

                    sm:rounded-[20px]
                  "
                />

                {/* ESQUINA SUPERIOR IZQUIERDA */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-5

                    h-9
                    w-9

                    border-l
                    border-t
                    border-[#D4B476]/70

                    sm:h-12
                    sm:w-12
                  "
                />

                {/* ESQUINA INFERIOR DERECHA */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-5
                    right-5

                    h-9
                    w-9

                    border-b
                    border-r
                    border-[#D4B476]/70

                    sm:h-12
                    sm:w-12
                  "
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* =================================================
            ORNAMENTO FINAL
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className="
            mt-16

            flex
            items-center
            justify-center
            gap-4

            sm:mt-24
          "
        >
          <span
            className="
              h-px
              w-12

              bg-gradient-to-r
              from-transparent
              to-[#B89058]

              sm:w-24
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
              w-12

              bg-gradient-to-l
              from-transparent
              to-[#B89058]

              sm:w-24
            "
          />
        </motion.div>

        {/* NOMBRE */}

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
            duration: 0.85,
            delay: 0.15,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-6
            text-center

            font-cursiveDancing
            text-[28px]
            text-[#70465A]

            sm:text-[36px]
          "
        >
          Mia Selene
        </motion.p>
      </div>
    </section>
  );
};

export default LineaDelTiempo;