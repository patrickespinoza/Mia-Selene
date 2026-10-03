import { useMemo, useState } from "react";

const CLAVE_INVITACION = "MIA-SELENE-30-OCTUBRE-2026";

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

const bytesABase64Url = (bytes) => {
  let binario = "";
  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });
  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const obtenerClave = async () => {
  const material = new TextEncoder().encode(CLAVE_INVITACION);
  const hash = await crypto.subtle.digest("SHA-256", material);
  return crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["encrypt"]);
};

const cifrarInvitacion = async ({ nombre, pases }) => {
  const clave = await obtenerClave();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const contenido = new TextEncoder().encode(JSON.stringify({ nombre, pases }));
  const cifrado = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, clave, contenido);
  const cifradoBytes = new Uint8Array(cifrado);
  const paquete = new Uint8Array(iv.length + cifradoBytes.length);
  paquete.set(iv, 0);
  paquete.set(cifradoBytes, iv.length);
  return bytesABase64Url(paquete);
};

const PLANTILLA_INICIAL = `✨ ¡Hola {nombre}!\n\nCon mucha emoción queremos invitarte a celebrar los XV años de Mia Selene. 💕\n\nHemos reservado {pases} {lugares} en tu honor.\n\n💌 Abre tu invitación aquí:\n{link}\n\n¡Esperamos contar con tu presencia! ✨`;

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState(1);
  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState(PLANTILLA_INICIAL);
  const [generando, setGenerando] = useState(false);
  const [copiado, setCopiado] = useState("");

  const cantidadPases = Number.parseInt(pases, 10) || 1;

  const mensajeFinal = useMemo(() => {
    const lugares = cantidadPases === 1 ? "lugar" : "lugares";
    return mensaje
      .replaceAll("{nombre}", nombre.trim() || "Invitado")
      .replaceAll("{pases}", String(cantidadPases))
      .replaceAll("{lugares}", lugares)
      .replaceAll("{link}", link || "[Aquí aparecerá el enlace de la invitación]");
  }, [mensaje, nombre, cantidadPases, link]);

  const marcarCopiado = (tipo) => {
    setCopiado(tipo);
    window.setTimeout(() => setCopiado(""), 1800);
  };

  const generarLink = async () => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      alert("Ingresa el nombre del invitado.");
      return;
    }
    if (!Number.isFinite(cantidadPases) || cantidadPases < 1) {
      alert("Ingresa una cantidad válida de pases.");
      return;
    }

    try {
      setGenerando(true);
      const token = await cifrarInvitacion({ nombre: nombreLimpio, pases: cantidadPases });
      setLink(`${window.location.origin}/?i=${token}`);
    } catch (error) {
      console.error("Error al cifrar la invitación:", error);
      alert("No se pudo generar la invitación.");
    } finally {
      setGenerando(false);
    }
  };

  const copiar = async (texto, tipo) => {
    if (!texto) return;
    try {
      await navigator.clipboard.writeText(texto);
      marcarCopiado(tipo);
    } catch (error) {
      console.error("No se pudo copiar:", error);
      alert("No se pudo copiar. Inténtalo nuevamente.");
    }
  };

  const nuevaInvitacion = () => {
    setNombre("");
    setPases(1);
    setLink("");
    setCopiado("");
  };

  const actualizarNombre = (valor) => {
    setNombre(valor);
    setLink("");
  };

  const actualizarPases = (valor) => {
    setPases(valor);
    setLink("");
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden px-4 py-10 sm:px-6"
      style={{
        background: `
          radial-gradient(circle at 12% 12%, rgba(235,213,165,.30), transparent 28%),
          radial-gradient(circle at 88% 82%, rgba(215,167,174,.36), transparent 32%),
          linear-gradient(145deg, #F8E9E8 0%, #FFF9F5 48%, #EAD2D6 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#A56F85]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#C7A56A]/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C7A56A]" />
            <p className="text-[9px] uppercase tracking-[.38em] text-[#A56F85]">MIS XV AÑOS</p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C7A56A]" />
          </div>
          <h1 className="font-cursiveDancing text-[54px] leading-none text-[#70465A] sm:text-[70px]">Mia Selene</h1>
          <p className="mt-3 text-[10px] uppercase tracking-[.25em] text-[#C7A56A]">Generador de invitaciones</p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-[30px] border border-[#A56F85]/20 bg-[#FFF9F5]/90 p-6 shadow-[0_25px_70px_rgba(69,39,53,.13)] backdrop-blur-xl sm:p-8">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-[#70465A]">Datos del invitado</p>

            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em] text-[#70465A]">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => actualizarNombre(e.target.value)}
              placeholder="Ej. Familia García"
              className="mb-5 min-h-[50px] w-full rounded-2xl border border-[#C7A56A]/30 bg-white px-4 py-3 text-[#452735] outline-none transition focus:border-[#A56F85] focus:ring-2 focus:ring-[#D7A7AE]/30"
            />

            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[.16em] text-[#70465A]">Número de pases</label>
            <input
              type="number"
              min="1"
              value={pases}
              onChange={(e) => actualizarPases(e.target.value)}
              className="mb-6 min-h-[50px] w-full rounded-2xl border border-[#C7A56A]/30 bg-white px-4 py-3 text-[#452735] outline-none transition focus:border-[#A56F85] focus:ring-2 focus:ring-[#D7A7AE]/30"
            />

            <button
              type="button"
              onClick={generarLink}
              disabled={generando}
              className="w-full rounded-2xl bg-gradient-to-r from-[#A56F85] to-[#70465A] px-5 py-4 text-[11px] font-semibold uppercase tracking-[.20em] text-white shadow-[0_14px_30px_rgba(112,70,90,.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generando ? "Generando..." : "Generar invitación"}
            </button>

            {link && (
              <div className="mt-6 rounded-2xl border border-[#C7A56A]/25 bg-[#F8E9E8]/55 p-4">
                <p className="mb-2 text-[9px] uppercase tracking-[.22em] text-[#A56F85]">Enlace cifrado</p>
                <p className="break-all text-xs leading-relaxed text-[#452735]">{link}</p>
                <button
                  type="button"
                  onClick={() => copiar(link, "link")}
                  className="mt-4 w-full rounded-xl border border-[#C7A56A] px-4 py-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#70465A] transition hover:bg-[#F8E9E8]"
                >
                  {copiado === "link" ? "✓ Link copiado" : "Copiar link"}
                </button>
              </div>
            )}
          </section>

          <section className="rounded-[30px] border border-[#A56F85]/20 bg-[#FFF9F5]/90 p-6 shadow-[0_25px_70px_rgba(69,39,53,.13)] backdrop-blur-xl sm:p-8">
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#70465A]">Mensaje para WhatsApp</p>
              <p className="mt-2 text-xs leading-relaxed text-[#8B6877]">Puedes editarlo. Usa {`{nombre}`}, {`{pases}`}, {`{lugares}`} y {`{link}`} para insertar los datos automáticamente.</p>
            </div>

            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={9}
              className="w-full resize-y rounded-2xl border border-[#C7A56A]/30 bg-white px-4 py-4 text-sm leading-relaxed text-[#452735] outline-none transition focus:border-[#A56F85] focus:ring-2 focus:ring-[#D7A7AE]/30"
            />

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C7A56A]/60" />
              <span className="text-[9px] uppercase tracking-[.24em] text-[#A56F85]">Vista previa</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C7A56A]/60" />
            </div>

            <div className="rounded-[24px] bg-[#E8F3E7] p-4 shadow-inner sm:p-5">
              <div className="ml-auto max-w-[92%] rounded-[18px] rounded-tr-[5px] bg-white px-4 py-3 shadow-sm">
                <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed text-[#3E3438]">{mensajeFinal}</p>
                <p className="mt-2 text-right text-[9px] text-gray-400">Vista previa</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copiar(mensajeFinal, "mensaje")}
              disabled={!link}
              className="mt-5 w-full rounded-2xl bg-[#70465A] px-5 py-4 text-[11px] font-semibold uppercase tracking-[.20em] text-white transition hover:bg-[#5F394B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copiado === "mensaje" ? "✓ Mensaje copiado" : "Copiar mensaje para WhatsApp"}
            </button>

            {link && (
              <button type="button" onClick={nuevaInvitacion} className="mt-3 w-full py-3 text-[9px] uppercase tracking-[.20em] text-[#A56F85] transition hover:text-[#70465A]">
                + Nueva invitación
              </button>
            )}
          </section>
        </div>

        <div className="mx-auto mt-9 h-px w-24 bg-gradient-to-r from-transparent via-[#C7A56A] to-transparent" />
        <p className="mt-4 text-center text-[8px] uppercase tracking-[.30em] text-[#A56F85]">30 • Octubre • 2026</p>
      </div>
    </main>
  );
}
