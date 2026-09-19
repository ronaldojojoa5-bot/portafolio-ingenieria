// ============================================================
//  PLANTILLA — PORTAFOLIO DE INGENIERÍA CIVIL
//  Sitio de demostración. Todos los datos son de ejemplo.
//  Cambia lo de abajo y el sitio entero se actualiza.
// ============================================================

export const PERFIL = {
  nombre: 'Nombre Apellido',
  estudio: 'Obra',
  estudioSub: 'civil',
  rol: 'Ingeniero civil',
  formacion: 'Universidad',
  ciudad: 'Colombia',
  edicion: 'Plantilla de demostración',
  bio: 'Ingeniero civil enfocado en costos, estructuras y representación gráfica de proyectos. Presupuestos verificables, evaluación estructural bajo normativa colombiana y planos que se entienden a la primera.',
  lema: 'Lo que no se mide, no se controla.',
  disponible: true,
}

// ⚠️ Datos de ejemplo — reemplazar antes de publicar.
export const CONTACTO = {
  whatsapp: '3000000000', // sin indicativo
  indicativo: '57',
  email: 'correo@ejemplo.com',
  instagram: { user: '@usuario', url: 'https://www.instagram.com/' },
  behance: { user: 'Portafolio', url: 'https://www.behance.net/' },
}

// ⚠️ Cifras de ejemplo.
export const CIFRAS = [
  { n: 12, suf: '+', t: 'obras presupuestadas' },
  { n: 40, suf: '+', t: 'fichas técnicas' },
  { n: 6, suf: '', t: 'años de ejercicio' },
]

export const SERVICIOS = [
  {
    t: 'Presupuestos y APU',
    d: 'Análisis de precios unitarios completo: rendimientos, cuadrillas, materiales, equipo y transporte. Cantidades de obra levantadas desde los planos y presupuesto trazable hasta el último ítem.',
    tags: ['APU', 'Cantidades', 'AIU', 'Precios de mercado'],
  },
  {
    t: 'Evaluación post-sísmica',
    d: 'Inspección y ficha técnica de daño según NSR-10 Título A: clasificación de habitabilidad, registro fotográfico y recomendaciones de intervención.',
    tags: ['NSR-10', 'Habitabilidad', 'Ficha técnica', 'Inspección'],
  },
  {
    t: 'Programación de obra',
    d: 'Cronograma de actividades, ruta crítica y flujo de caja. Seguimiento de avance contra lo programado para que la obra no se entere tarde de que va atrasada.',
    tags: ['Cronograma', 'Ruta crítica', 'Flujo de caja', 'Avance'],
  },
  {
    t: 'Planos 2D a 3D',
    d: 'Conversión de plantas arquitectónicas a vistas isométricas y renders para presentación a clientes, licencias y comités.',
    tags: ['Isométrico', 'Render', 'Modelado', 'Presentación'],
  },
]

// ── PROYECTOS ────────────────────────────────────────────────
// Sin imagen, la tarjeta dibuja una portada tipográfica con la
// palabra de `cover`. Para poner la foto real: súbela a /public
// y cambia  img: null  por  img: '/obra.jpg'
// ─────────────────────────────────────────────────────────────
export const PROYECTOS = [
  {
    t: 'Edificio residencial 5 pisos',
    cover: 'APU',
    variante: 'acc', // acc · ink · paper
    anio: '2024',
    tipo: 'Presupuesto',
    img: null,
    d: 'Presupuesto completo de obra: 380 ítems con APU, cantidades levantadas desde planos estructurales y arquitectónicos, y programación a 14 meses.',
    tags: ['APU', 'Cantidades', 'Cronograma'],
    url: null,
  },
  {
    t: 'Evaluación post-sísmica',
    cover: 'NSR',
    variante: 'ink',
    anio: '2025',
    tipo: 'Estructural',
    img: null,
    d: 'Inspección de viviendas tras evento sísmico. Ficha técnica por predio, clasificación de habitabilidad y priorización de intervenciones.',
    tags: ['NSR-10', 'Título A', 'Habitabilidad'],
    url: null,
  },
  {
    t: 'Vivienda unifamiliar 2D → 3D',
    cover: '3D',
    variante: 'paper',
    anio: '2026',
    tipo: 'Modelado',
    img: null,
    d: 'Plantas arquitectónicas convertidas a modelo isométrico y vistas de presentación para el cliente y el trámite de licencia.',
    tags: ['Isométrico', 'Render', 'Licencia'],
    url: null,
  },
]

export const EXPERIENCIA = [
  {
    p: '2020 — 2023',
    t: 'Residente de obra',
    d: 'Control de ejecución, actas de avance y verificación de cantidades en obra de vivienda multifamiliar.',
  },
  {
    p: '2023 — Presente',
    t: 'Analista de costos',
    d: 'Elaboración de presupuestos y APU para licitaciones públicas y privadas. Seguimiento de precios y actualización de bases.',
  },
  {
    p: 'Formación',
    t: 'Ingeniería civil',
    d: 'Énfasis en estructuras y gestión de proyectos. Base normativa en NSR-10 y contratación estatal.',
  },
]

export const HABILIDADES = [
  { i: '◧', t: 'Presupuestos' },
  { i: '◈', t: 'Estructuras' },
  { i: '▤', t: 'Programación' },
  { i: '◎', t: 'Modelado 3D' },
]

export const SOFTWARE = ['CAD', 'Rvt', 'Exc', 'MSP', 'SAP', 'ETB', 'QGS', 'PDF']

export const NAV = [
  ['#acerca', 'Acerca de'],
  ['#servicios', 'Servicios'],
  ['#proyectos', 'Proyectos'],
  ['#estudio', 'Capacidades'],
  ['#contacto', 'Contacto'],
]

// Palabras grandes del hero y del cierre
export const TITULARES = {
  hero1: 'INGENIERÍA',
  hero2: 'CIVIL',
  cierre: 'HABLEMOS',
  marquee1: 'Presupuestos verificables · Obra controlada ',
}
