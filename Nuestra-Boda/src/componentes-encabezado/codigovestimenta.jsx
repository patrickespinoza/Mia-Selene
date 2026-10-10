
import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  crema: "#FFF9F5",
  rosaClaro: "#F8E9E8",
  rosaPalo: "#D7A7AE",
  malva: "#A56F85",
  malvaOscuro: "#70465A",
  ciruela: "#452735",
  dorado: "#C7A56A",
  doradoClaro: "#EBD5A5",
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
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

const DressCodePremium = () => {
  return (
    <section
      id="vestimenta"
      className="relative w-full overflow-hidden px-5 py-20 md:py-28"
      style={{
        // MISMO FONDO QUE "MIS MOMENTOS"
        backgroundColor: "#EAD2D6",
      }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto w-full max-w-xl"
      >
        {/* MARCO PRINCIPAL */}
        <div
          className="relative px-6 py-14 text-center sm:px-12 md:py-16"
          style={{
            backgroundColor: COLORS.rosaClaro,
            border: `1px solid ${COLORS.dorado}`,
            boxShadow: "0 15px 45px rgba(69,39,53,0.07)",
          }}
        >
          {/* MARCO INTERIOR */}
          <div
            className="pointer-events-none absolute inset-[7px]"
            style={{
              border: `1px solid ${COLORS.doradoClaro}`,
            }}
          />

          <div className="relative z-10">
            {/* ORNAMENTO SUPERIOR */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-8 flex items-center justify-center gap-4"
            >
              <span
                className="h-px w-12"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />

              <span
                className="text-xl"
                style={{
                  color: COLORS.dorado,
                }}
              >
                ✦
              </span>

              <span
                className="h-px w-12"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />
            </motion.div>

            {/* ENCABEZADO */}
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] uppercase tracking-[0.35em]"
              style={{
                color: COLORS.malvaOscuro,
                fontFamily: "Georgia, serif",
              }}
            >
              CÓDIGO DE
            </motion.p>

            {/* TÍTULO */}
            <motion.h2
              variants={fadeUp}
              className="text-[43px] leading-tight sm:text-[54px] md:text-[62px]"
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: COLORS.ciruela,
              }}
            >
              Vestimenta
            </motion.h2>

            {/* DIVISOR DORADO */}
            <div className="my-9 flex items-center justify-center gap-4">
              <div
                className="h-px w-16 sm:w-24"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />

              <div
                className="h-2.5 w-2.5 rotate-45"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />

              <div
                className="h-px w-16 sm:w-24"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />
            </div>

            {/* VESTIMENTA FORMAL */}
            <motion.h3
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              className="text-[24px] uppercase tracking-[0.22em] sm:text-[29px]"
              style={{
                fontFamily: "Georgia, serif",
                color: COLORS.malvaOscuro,
              }}
            >
              Formal
            </motion.h3>

            {/* SEPARADOR */}
            <div
              className="mx-auto my-10 h-px w-36"
              style={{
                backgroundColor: COLORS.dorado,
              }}
            />

            {/* COLORES RESERVADOS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
              }}
              className="mx-auto max-w-sm"
            >
              <p
                className="text-[15px] leading-[1.9] sm:text-[17px]"
                style={{
                  fontFamily: "Georgia, serif",
                  color: COLORS.ciruela,
                }}
              >
                Nos reservamos el color
                <br />

                <span
                  className="font-semibold"
                  style={{
                    color: COLORS.malvaOscuro,
                  }}
                >
                  Rosa palo, beige y champagne
                </span>

                <br />
                para la quinceañera.
              </p>
            </motion.div>

            {/* ORNAMENTO INFERIOR */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span
                className="h-px w-12"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />

              <span
                className="text-xl"
                style={{
                  color: COLORS.dorado,
                }}
              >
                ✦
              </span>

              <span
                className="h-px w-12"
                style={{
                  backgroundColor: COLORS.dorado,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DressCodePremium;
