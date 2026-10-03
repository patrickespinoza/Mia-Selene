"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  Mail,
} from "lucide-react";

/* =====================================================
   INFORMACIÓN DE REGALOS
===================================================== */

const DATOS_REGALOS = {
  imagenFlores: "/arbolesPadres.png",
  titular: "Mia Mora",
  banco: "Débito Nu",
  numeroCuenta: "5101253694724370",
  clabe: "638180000031067317",
};

/* =====================================================
   ANIMACIÓN GENERAL
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================================================
   OCULTAR INFORMACIÓN BANCARIA
===================================================== */

const ocultarDato = (valor) => {
  const ultimosCuatro = valor.slice(-4);
  const caracteresOcultos = "•".repeat(valor.length - 4);

  return `${caracteresOcultos}${ultimosCuatro}`;
};

/* =====================================================
   COMPONENTE PARA DATOS BANCARIOS
===================================================== */

const DatoBancario = ({ etiqueta, valor }) => {
  const [visible, setVisible] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarDato = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);

      window.setTimeout(() => {
        setCopiado(false);
      }, 2200);
    } catch (error) {
      console.error(`No se pudo copiar ${etiqueta}:`, error);
    }
  };

  return (
    <div
      className="
        w-full
        rounded-[20px]
        border
        border-[#B89058]/35
        bg-[#FFF9F5]
        px-4
        py-4
        shadow-[0_10px_24px_rgba(112,70,90,0.10)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#70465A]/40
        sm:px-5
      "
    >
      <p
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-[#725563]
          sm:text-[10px]
        "
      >
        {etiqueta}
      </p>

      <p
        className="
          mt-2
          min-h-[26px]
          break-all
          font-mono
          text-[14px]
          font-semibold
          tracking-[0.06em]
          text-[#70465A]
          sm:text-[17px]
          sm:tracking-[0.1em]
        "
      >
        {visible ? valor : ocultarDato(valor)}
      </p>

      <div
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {/* MOSTRAR U OCULTAR */}

        <motion.button
          type="button"
          onClick={() => setVisible((estadoActual) => !estadoActual)}
          aria-label={
            visible
              ? `Ocultar ${etiqueta}`
              : `Mostrar ${etiqueta}`
          }
          className="
            inline-flex
            min-h-[40px]
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-[#70465A]/25
            bg-[#EAD2D6]
            px-4
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#70465A]
            transition-colors
            hover:border-[#70465A]
            hover:bg-[#70465A]
            hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#B89058]
          "
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          {visible ? (
            <EyeOff size={16} strokeWidth={1.8} />
          ) : (
            <Eye size={16} strokeWidth={1.8} />
          )}

          <span>{visible ? "Ocultar" : "Mostrar"}</span>
        </motion.button>

        {/* COPIAR */}

        <motion.button
          type="button"
          onClick={copiarDato}
          aria-label={`Copiar ${etiqueta}`}
          className={`
            inline-flex
            min-h-[40px]
            items-center
            justify-center
            gap-2
            rounded-full
            border
            px-4
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            transition-colors
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#B89058]

            ${
              copiado
                ? `
                  border-[#B89058]
                  bg-[#B89058]
                  text-white
                `
                : `
                  border-[#70465A]/25
                  bg-[#FFF9F5]
                  text-[#70465A]
                  hover:border-[#70465A]
                  hover:bg-[#70465A]
                  hover:text-white
                `
            }
          `}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          {copiado ? (
            <Check size={16} strokeWidth={2} />
          ) : (
            <Copy size={16} strokeWidth={1.8} />
          )}

          <span>{copiado ? "Copiado" : "Copiar"}</span>
        </motion.button>
      </div>
    </div>
  );
};

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

const Regalos = () => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      className="
        relative
        flex
        min-h-[1080px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#EAD2D6]
        px-[19%]
        py-24
        sm:min-h-[1180px]
        sm:px-[20%]
        sm:py-28
        md:min-h-[1050px]
        md:px-[18%]
        lg:min-h-[1100px]
        lg:px-[22%]
        lg:py-32
      "
    >
      {/* =================================================
          MARCO FLORAL
      ================================================= */}

      <motion.img
        src={DATOS_REGALOS.imagenFlores}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-full
          w-full
          select-none
          object-fill
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
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{
          once: true,
        }}
      />

      {/* =================================================
          CONTENIDO CENTRAL
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[570px]
          flex-col
          items-center
          text-center
        "
      >
        {/* ORNAMENTO SUPERIOR */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
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
          }}
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
              w-7
              bg-[#B89058]
              sm:w-14
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
              w-7
              bg-[#B89058]
              sm:w-14
            "
          />
        </motion.div>

        {/* ETIQUETA */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#70465A]
            sm:text-[11px]
            sm:tracking-[0.4em]
          "
        >
          Un detalle especial
        </motion.p>

        {/* TÍTULO */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
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
            mt-3
            font-cursiveDancing
            text-[43px]
            leading-[1.05]
            text-[#70465A]
            sm:text-[58px]
            md:text-[68px]
          "
        >
          Sugerencia de regalo
        </motion.h2>

        {/* MENSAJE */}

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
            mt-6
            max-w-lg
            font-playfair
            text-[13px]
            leading-[1.8]
            text-[#725563]
            sm:text-[16px]
            md:text-[17px]
          "
        >
          Lo más importante para mí es que puedas celebrar este día tan
          especial conmigo, pero si deseas hacerme un obsequio, te dejo
          las siguientes opciones:
        </motion.p>

        {/* ORNAMENTO CENTRAL */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          viewport={{
            once: true,
          }}
          className="
            my-6
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-10 bg-[#B89058]" />
          <span className="text-sm text-[#B89058]">✦</span>
          <span className="h-px w-10 bg-[#B89058]" />
        </motion.div>

        {/* SUBTÍTULO */}

        <motion.h3
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          viewport={{
            once: true,
          }}
          className="
            font-cursiveDancing
            text-[38px]
            leading-none
            text-[#70465A]
            sm:text-[48px]
          "
        >
          Regalos
        </motion.h3>

        {/* =================================================
            LLUVIA DE SOBRES
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.4,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-7
            w-full
            rounded-[24px]
            border
            border-[#B89058]/35
            bg-[#FFF9F5]
            px-4
            py-5
            shadow-[0_14px_32px_rgba(112,70,90,0.12)]
            sm:px-6
            sm:py-6
          "
        >
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#B89058]/35
              bg-[#EAD2D6]
              text-[#70465A]
            "
          >
            <Mail size={24} strokeWidth={1.5} />
          </div>

          <h4
            className="
              mt-3
              font-playfair
              text-[18px]
              font-semibold
              text-[#70465A]
              sm:text-[21px]
            "
          >
            Lluvia de sobres
          </h4>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm
              text-[12px]
              leading-relaxed
              text-[#725563]
              sm:text-sm
            "
          >
            Si lo deseas, puedes entregarme tu obsequio en un sobre
            durante la celebración.
          </p>
        </motion.div>

        {/* =================================================
            TRANSFERENCIA
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.5,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-4
            w-full
            rounded-[24px]
            border
            border-[#B89058]/35
            bg-[#FFF9F5]
            px-4
            py-6
            shadow-[0_14px_32px_rgba(112,70,90,0.12)]
            sm:px-6
            sm:py-7
          "
        >
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#B89058]/35
              bg-[#EAD2D6]
              text-[#70465A]
            "
          >
            <CreditCard size={24} strokeWidth={1.5} />
          </div>

          <p
            className="
              mt-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#B89058]
              sm:text-[10px]
            "
          >
            Transferencia
          </p>

          <h4
            className="
              mt-2
              font-playfair
              text-[19px]
              font-semibold
              text-[#70465A]
              sm:text-[22px]
            "
          >
            {DATOS_REGALOS.banco}
          </h4>

          <p
            className="
              mt-1
              font-cursiveDancing
              text-[25px]
              text-[#70465A]
              sm:text-[29px]
            "
          >
            {DATOS_REGALOS.titular}
          </p>

          <div className="mt-5 space-y-3">
            <DatoBancario
              etiqueta="Número de cuenta"
              valor={DATOS_REGALOS.numeroCuenta}
            />

            <DatoBancario
              etiqueta="CLABE"
              valor={DATOS_REGALOS.clabe}
            />
          </div>
        </motion.div>

        {/* MENSAJE FINAL */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-7
            max-w-sm
            font-cursiveDancing
            text-[23px]
            leading-relaxed
            text-[#70465A]
            sm:text-[28px]
          "
        >
          Gracias por compartir conmigo este momento tan especial
        </motion.p>

        {/* ORNAMENTO FINAL */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#B89058]" />

          <Gift
            size={15}
            strokeWidth={1.6}
            className="text-[#B89058]"
          />

          <span className="h-px w-8 bg-[#B89058]" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Regalos;