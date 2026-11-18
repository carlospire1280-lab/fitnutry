// ============================================================
//  FitNutri — Nutrición, hábitos, ejercicios y más
//  ============================================================
//  CÓMO EDITAR ESTE ARCHIVO
//  Todo lo marcado con ✏️ EDITABLE se puede cambiar a mano:
//  textos, listas, colores de datos, metas y ajustes.
//  No hace falta saber programar — solo respeta el formato
//  de cada ejemplo (comillas, comas, corchetes).
//
//  QUÉ HACE CADA SECCIÓN (en orden):
//  - MEALS .......... Comidas del día que se marcan como hechas
//  - EXERCISES ...... Rutina de cardio/movimiento por día de semana
//  - HABITS ......... Hábitos base que todo perfil empieza teniendo
//  - RECIPES ........ Recetas del apartado Recetas y del menú semanal
//  - AUTO_LIST ...... Alimentos del botón "Generar desde mi plan"
//  - ACHIEVEMENTS ... Trofeos/logros del apartado Progreso
//  - FOODS .......... Base de alimentos (autocompletado y código de barras)
//  - GYM_PROG, WEEK_PHASES, GYM, GYM_SPLIT .. Rutina de fuerza y progresión
//  - SECRET_* ....... Sección secreta: contraseña, mensaje, días para abrirla
//  - DEDICATORIAS ... Frases que salen en la pantalla de carga
//  - MEASURE_FIELDS . Campos de las medidas corporales
//  - ONBOARD_SLIDES . Pantallas de bienvenida (solo la primera vez)
//  - FAST_H / EAT_H . Horas de ayuno 16:8 y ventana de alimentación
//  - SPLASH_MS ...... Duración de la pantalla de carga (milisegundos)
//  - Estado ......... Todo se guarda en localStorage ("fitnutri-v2"):
//                     perfiles, días, listas, peso, fotos, música...
// ============================================================

// ===== Datos base =====
// ✏️ EDITABLE: Plan de comidas del día (emoji, título, descripción, kcal y hora)
const MEALS = [
  { id: "desayuno", emoji: "🍳", title: "Desayuno", sub: "Avena con frutas, huevo y café/té", kcal: "~450 kcal", time: "7:30" },
  { id: "almuerzo", emoji: "🥗", title: "Almuerzo", sub: "Pechuga de pollo, arroz integral y ensalada", kcal: "~650 kcal", time: "13:00" },
  { id: "merienda", emoji: "🥛", title: "Merienda", sub: "Yogur griego con nueces", kcal: "~250 kcal", time: "17:00" },
  { id: "cena", emoji: "🐟", title: "Cena", sub: "Pescado a la plancha con verduras", kcal: "~500 kcal", time: "20:00" },
];

// ✏️ EDITABLE: Rutina de cardio/movimiento por día de la semana
// Claves: domingo, lunes, martes, miercoles, jueves, viernes, sabado
// Cada ejercicio: { t: título, d: descripción, m: "X min" }
const EXERCISES = {
  lunes:     [{ t: "Cardio suave", d: "Caminata 30 min", m: "30 min" }, { t: "Fuerza", d: "Sentadillas, flexiones, plancha", m: "20 min" }],
  martes:    [{ t: "Cardio", d: "Correr o bicicleta 35 min", m: "35 min" }, { t: "Core", d: "Abdominales y plancha", m: "15 min" }],
  miercoles: [{ t: "Descanso activo", d: "Yoga o estiramientos 25 min", m: "25 min" }],
  jueves:    [{ t: "Cardio", d: "Natación o baile 40 min", m: "40 min" }, { t: "Fuerza", d: "Peso: press, remo, sentadilla", m: "20 min" }],
  viernes:   [{ t: "HIIT", d: "Intervalos 20 min", m: "20 min" }, { t: "Movilidad", d: "Estiramientos", m: "10 min" }],
  sabado:    [{ t: "Deporte libre", d: "Fútbol, ciclismo o caminata larga", m: "60 min" }],
  domingo:   [{ t: "Descanso", d: "Paseo familiar + estiramientos", m: "20 min" }],
};

// ✏️ EDITABLE: Hábitos base que se muestran a todos los perfiles
// (los hábitos personalizados se crean desde la app, en la pestaña Hábitos)
const HABITS = [
  { id: "h1", emoji: "💧", title: "Beber 2L de agua", sub: "Meta diaria" },
  { id: "h2", emoji: "🥬", title: "5 porciones de fruta/verdura", sub: "Nutrición" },
  { id: "h3", emoji: "🚶", title: "Caminar 8,000 pasos", sub: "Movimiento" },
  { id: "h4", emoji: "😴", title: "Dormir 7-8 horas", sub: "Descanso" },
  { id: "h5", emoji: "🍬", title: "Evitar azúcares añadidos", sub: "Control" },
];

// ✏️ EDITABLE: Recetas — añade las que quieras copiando el formato:
// { name, meta ("~kcal · proteina · tiempo"), ing: ["ingredientes"], steps: ["pasos"] }
const RECIPES = [
  { name: "Bowl de pollo y quinoa", meta: "~550 kcal · 40g prot · 15 min", ing: ["150g pechuga de pollo", "80g quinoa cocida", "Verduras variadas", "Aceite de oliva, sal, pimienta"], steps: ["Cocina la quinoa según el paquete.", "Saltea el pollo en cubos 8-10 min.", "Mezcla todo y aliña con oliva."] },
  { name: "Avena proteinada", meta: "~380 kcal · 25g prot · 5 min", ing: ["60g avena", "250ml leche o bebida vegetal", "1 scoop proteína", "Fruta y canela"], steps: ["Calienta la leche.", "Añade la avena y cocina 3 min.", "Incorpora proteína y fruta."] },
  { name: "Salmón con brócoli", meta: "~600 kcal · 45g prot · 20 min", ing: ["180g salmón", "200g brócoli", "Ajo, limón, hierbas"], steps: ["Hornea el salmón 12-15 min a 200°C.", "Cuece el brócoli al vapor 6 min.", "Aliña con limón y hierbas."] },
  { name: "Huevos revueltos proteicos", meta: "~320 kcal · 28g prot · 8 min", ing: ["3 huevos", "50g claras", "Espinacas, tomate", "Queso fresco"], steps: ["Bate huevos y claras.", "Saltea las verduras 3 min.", "Añade los huevos y cocina a fuego lento."] },
  { name: "Ensalada de garbanzos", meta: "~420 kcal · 18g prot · 10 min", ing: ["200g garbanzos cocidos", "Tomate, pepino, cebolla", "Huevo duro", "Vinagreta de oliva"], steps: ["Pica las verduras en cubos.", "Añade garbanzos y huevo.", "Aliña con vinagreta."] },
  { name: "Batido verde", meta: "~250 kcal · 12g prot · 5 min", ing: ["1 plátano", "Puñado de espinacas", "250ml bebida vegetal", "1 scoop proteína", "Semillas de chía"], steps: ["Pon todo en la licuadora.", "Tritura hasta homogeneizar."] },
];

// ✏️ EDITABLE: Alimentos que se añaden con el botón "Generar desde mi plan"
const AUTO_LIST = [
  "Pechuga de pollo", "Arroz integral", "Avena", "Huevos", "Pescado blanco",
  "Verduras variadas", "Frutas (plátano, manzana)", "Yogur griego",
  "Leche o bebida vegetal", "Nueces", "Aceite de oliva", "Quinoa",
];

// ✏️ EDITABLE: Logros — id debe coincidir con una condición en checkAchievements()
const ACHIEVEMENTS = [
  { id: "racha3", emoji: "🔥", name: "En racha", desc: "3 días seguidos completando hábitos" },
  { id: "racha7", emoji: "⚡", name: "Semana perfecta", desc: "7 días de racha" },
  { id: "racha30", emoji: "🏔️", name: "Imparable", desc: "30 días de racha" },
  { id: "perfecto", emoji: "💯", name: "Día perfecto", desc: "Completar todos los hábitos un día" },
  { id: "agua", emoji: "💧", name: "Hidratado", desc: "Llegar a la meta de agua" },
  { id: "peso5", emoji: "⚖️", name: "Registro constante", desc: "5 registros de peso" },
  { id: "peso20", emoji: "📉", name: "Experto en báscula", desc: "20 registros de peso" },
  { id: "comidas7", emoji: "🍽️", name: "Comedor fiel", desc: "7 días registrando comidas" },
  { id: "comidas30", emoji: "🥗", name: "Mes saludable", desc: "30 días registrando comidas" },
  { id: "ayuno", emoji: "⏳", name: "Ayuno completado", desc: "Completar un ayuno de 16 horas" },
  { id: "pasos7", emoji: "👟", name: "Caminante", desc: "7 días con 8,000+ pasos" },
  { id: "medidas", emoji: "📏", name: "Cuerpo medido", desc: "Registrar 3 medidas corporales" },
];

// Meta de agua por defecto (configurable en Ajustes, en ml)
const aguaMeta = () => state.waterGoal || 2000;

// ✏️ EDITABLE: Base de alimentos para autocompletado y código de barras
// Todos los valores son POR 100 g: { n: nombre, k: kcal, p: proteínas g, c: carbs g, f: grasas g }
const FOODS = [
  { n: "Pechuga de pollo cocida", k: 165, p: 31, c: 0, f: 4 },
  { n: "Pechuga de pollo a la plancha", k: 135, p: 26, c: 0, f: 3 },
  { n: "Muslo de pollo sin piel", k: 172, p: 22, c: 0, f: 9 },
  { n: "Pavo cocido", k: 147, p: 30, c: 0, f: 2 },
  { n: "Res magra cocida", k: 250, p: 26, c: 0, f: 15 },
  { n: "Cerdo cocido", k: 242, p: 27, c: 0, f: 14 },
  { n: "Pescado blanco cocido", k: 105, p: 23, c: 0, f: 1 },
  { n: "Salmón", k: 208, p: 20, c: 0, f: 13 },
  { n: "Atún en lata", k: 116, p: 26, c: 0, f: 1 },
  { n: "Gambas cocidas", k: 99, p: 24, c: 0, f: 1 },
  { n: "Huevo entero", k: 143, p: 13, c: 1, f: 10 },
  { n: "Claras de huevo", k: 52, p: 11, c: 0.8, f: 0.2 },
  { n: "Yogur griego natural", k: 59, p: 10, c: 3.6, f: 3.3 },
  { n: "Yogur natural", k: 61, p: 3.5, c: 5, f: 3 },
  { n: "Queso fresco", k: 98, p: 11, c: 3, f: 4 },
  { n: "Queso mozzarella", k: 280, p: 28, c: 3, f: 17 },
  { n: "Queso cheddar", k: 403, p: 25, c: 1, f: 33 },
  { n: "Leche entera", k: 61, p: 3.2, c: 4.8, f: 3.3 },
  { n: "Leche desnatada", k: 34, p: 3.4, c: 5, f: 0.1 },
  { n: "Bebida vegetal de avena", k: 46, p: 1, c: 7, f: 1.5 },
  { n: "Bebida vegetal de soja", k: 33, p: 3, c: 2, f: 1.5 },
  { n: "Proteína en polvo (whey)", k: 380, p: 80, c: 8, f: 6 },
  { n: "Arroz blanco cocido", k: 130, p: 2.7, c: 28, f: 0.3 },
  { n: "Arroz integral cocido", k: 112, p: 2.6, c: 24, f: 0.9 },
  { n: "Pasta cocida", k: 158, p: 6, c: 31, f: 0.9 },
  { n: "Quinoa cocida", k: 120, p: 4.4, c: 21, f: 1.9 },
  { n: "Avena", k: 389, p: 17, c: 66, f: 7 },
  { n: "Pan integral", k: 247, p: 13, c: 41, f: 3.5 },
  { n: "Pan blanco", k: 265, p: 9, c: 49, f: 3.2 },
  { n: "Tortilla de maíz", k: 218, p: 6, c: 45, f: 3 },
  { n: "Patata cocida", k: 87, p: 1.9, c: 20, f: 0.1 },
  { n: "Patatas fritas", k: 312, p: 3.4, c: 41, f: 15 },
  { n: "Verduras variadas", k: 30, p: 2, c: 6, f: 0.3 },
  { n: "Espinacas", k: 23, p: 2.9, c: 3.6, f: 0.4 },
  { n: "Brócoli", k: 34, p: 2.8, c: 7, f: 0.4 },
  { n: "Tomate", k: 18, p: 0.9, c: 3.9, f: 0.2 },
  { n: "Pepino", k: 15, p: 0.7, c: 3.6, f: 0.1 },
  { n: "Lechuga", k: 15, p: 1.4, c: 2.9, f: 0.2 },
  { n: "Aguacate", k: 160, p: 2, c: 9, f: 15 },
  { n: "Manzana", k: 52, p: 0.3, c: 14, f: 0.2 },
  { n: "Plátano", k: 89, p: 1.1, c: 23, f: 0.3 },
  { n: "Naranja", k: 47, p: 0.9, c: 12, f: 0.1 },
  { n: "Fresas", k: 32, p: 0.7, c: 8, f: 0.3 },
  { n: "Arándanos", k: 57, p: 0.7, c: 14, f: 0.3 },
  { n: "Uvas", k: 69, p: 0.7, c: 18, f: 0.2 },
  { n: "Piña", k: 50, p: 0.5, c: 13, f: 0.1 },
  { n: "Mango", k: 60, p: 0.8, c: 15, f: 0.4 },
  { n: "Almendras", k: 579, p: 21, c: 22, f: 50 },
  { n: "Nueces", k: 654, p: 15, c: 14, f: 65 },
  { n: "Cacahuetes", k: 567, p: 26, c: 16, f: 49 },
  { n: "Mantequilla de cacahuete", k: 588, p: 25, c: 20, f: 50 },
  { n: "Aceite de oliva", k: 884, p: 0, c: 0, f: 100 },
  { n: "Miel", k: 304, p: 0.3, c: 82, f: 0 },
  { n: "Chocolate negro 85%", k: 598, p: 8, c: 46, f: 43 },
  { n: "Garbanzos cocidos", k: 164, p: 9, c: 27, f: 2.6 },
  { n: "Lentejas cocidas", k: 116, p: 9, c: 20, f: 0.4 },
  { n: "Judías negras cocidas", k: 132, p: 9, c: 24, f: 0.5 },
  { n: "Tofu", k: 76, p: 8, c: 2, f: 5 },
  { n: "Pizza", k: 266, p: 11, c: 33, f: 10 },
  { n: "Hamburguesa", k: 250, p: 15, c: 25, f: 12 },
  { n: "Tacos/burrito", k: 250, p: 12, c: 30, f: 9 },
  { n: "Sushi", k: 143, p: 5.8, c: 21, f: 2.7 },
  { n: "Café negro", k: 2, p: 0.3, c: 0, f: 0 },
  { n: "Refresco azucarado", k: 42, p: 0, c: 11, f: 0 },
  { n: "Zumo de naranja", k: 45, p: 0.7, c: 10, f: 0.2 },
];

// ✏️ EDITABLE: Progresión de series por tipo de ejercicio y fase del ciclo de 4 semanas
const GYM_PROG = {
  compuesto: ["4×8-10", "4×8-10 · +2.5 kg", "5×5 · +5 kg", "3×8-10 · ligero"],
  aislado: ["3×10-12", "3×12-14 · +1 kg", "4×8-10 · +2 kg", "2×12-15 · ligero"],
  core: ["3×45 s", "3×60 s", "3×75 s", "2×45 s · ligero"],
};
// ✏️ EDITABLE: Nombre de cada fase del ciclo de fuerza (se muestra en Plan/ejercicios)
const WEEK_PHASES = ["Adaptación", "Progresión", "Intensidad", "Descarga"];
// ✏️ EDITABLE: Ejercicios de fuerza — type: "compuesto" | "aislado" | "core"
// alts: alternativas del mismo grupo muscular (se cambian con el botón 🔄)
// Semana actual del ciclo (1-4), anclada a lunes 1-ene-2024
function planWeek() {
  const anchor = new Date(2024, 0, 1);
  const now = new Date();
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  return (Math.floor((monday - anchor) / 6048e5) % 4 + 4) % 4 + 1;
}
const GYM = [
  { id: "sentadilla", name: "Sentadilla", type: "compuesto", alts: ["Zancadas", "Sentadilla búlgara", "Extensión de cuádriceps"] },
  { id: "prensa", name: "Prensa de piernas", type: "compuesto", alts: ["Sentadilla", "Extensión de cuádriceps", "Zancadas"] },
  { id: "banca", name: "Press de banca", type: "compuesto", alts: ["Press con mancuernas", "Flexiones pesadas", "Press en máquina"] },
  { id: "remo", name: "Remo con barra", type: "compuesto", alts: ["Remo con mancuerna", "Remo en polea baja", "Pullover con mancuerna"] },
  { id: "dominadas", name: "Dominadas", type: "compuesto", alts: ["Jalón al pecho", "Fondos en paralelas", "Remo invertido"] },
  { id: "press-esc", name: "Press militar", type: "compuesto", alts: ["Press Arnold", "Elevaciones laterales", "Press en máquina"] },
  { id: "curl", name: "Curl de bíceps", type: "aislado", alts: ["Curl martillo", "Curl en polea", "Curl concentrado"] },
  { id: "triceps", name: "Extensión de tríceps", type: "aislado", alts: ["Fondos en paralelas", "Press francés", "Extensión en polea"] },
  { id: "peso-muerto", name: "Peso muerto", type: "compuesto", alts: ["Peso muerto rumano", "Buenos días", "Hip thrust"] },
  { id: "hip-thrust", name: "Hip thrust", type: "compuesto", alts: ["Puente de glúteo", "Patada de glúteo", "Peso muerto rumano"] },
  { id: "plancha", name: "Plancha", type: "core", alts: ["Plancha lateral", "Abdominales colgado", "Crunch abdominal"] },
  { id: "pantorrilla", name: "Elevación de talones", type: "aislado", alts: ["Elevación sentada", "Saltos al potro", "Gemelos en prensa"] },
];

// ✏️ EDITABLE: Qué ejercicios tocan cada día (tren inferior / superior)
const GYM_SPLIT = {
  lunes: { label: "Tren inferior", ids: ["sentadilla", "prensa", "peso-muerto", "hip-thrust", "pantorrilla", "plancha"] },
  jueves: { label: "Tren superior", ids: ["banca", "remo", "dominadas", "press-esc", "curl", "triceps"] },
};
// ✏️ EDITABLE: Nombres de los dias - deben coincidir con las claves de EXERCISES y GYM_SPLIT
const DAY_NAMES = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
function nextGymDay() {
  for (let i = 1; i <= 7; i++) {
    const d = new Date(Date.now() + i * 864e5);
    const dn = DAY_NAMES[d.getDay()];
    if (GYM_SPLIT[dn]) return dn;
  }
  return "";
}

// ✏️ EDITABLE: mensaje secreto — se desbloquea al completar SECRET_UNLOCK_DAYS días de hábitos
const SECRET_UNLOCK_DAYS = 7;
const SECRET_MSG = "Cada día que completas es una prueba de que puedes. Estoy orgulloso de ti. 💚";

// ✏️ EDITABLE: Dedicatorias que salen en la pantalla de carga (splash).
// Cada vez que abre la app se elige UNA al azar. Para agregar más,
// copia una línea y escribe la tuya entre comillas — pueden llevar emojis.
const DEDICATORIAS = [
  "Para la persona más fuerte que conozco: tú 💚",
  "Cada día es una nueva oportunidad de ser tu mejor versión ✨",
  "No estás sola en esto — yo creo en ti siempre 🤍",
  "Tu esfuerzo de hoy es el resultado de mañana 🌱",
];

// ✏️ EDITABLE: Campos de medidas corporales [clave, etiqueta]
const MEASURE_FIELDS = [
  ["cintura", "Cintura (cm)"],
  ["pecho", "Pecho (cm)"],
  ["brazo", "Brazo (cm)"],
  ["cadera", "Cadera (cm)"],
];

// ===== Estado =====
const KEY = "fitnutri-v2";
const today = new Date().toDateString();

function freshDay() {
  return { date: today, meals: {}, habits: {}, ex: {}, agua: 0, entries: [], steps: 0, gym: {}, cheat: false, caffeine: 0, sugar: 0 };
}

// Rellena campos que puedan faltar en días guardados con formatos antiguos
function normalizeDay(d) {
  if (!d || typeof d !== "object") return freshDay();
  d.meals = d.meals || {}; d.habits = d.habits || {}; d.ex = d.ex || {};
  d.entries = d.entries || []; d.agua = d.agua || 0;
  d.steps = d.steps || 0; d.gym = d.gym || {};
  d.caffeine = d.caffeine || 0; d.sugar = d.sugar || 0;
  return d;
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s) {
      s.days = s.days || {};
      if (s.day) { // migrar formato antiguo: datos compartidos → perfil "default"
        const k = "default|" + (s.day.date || today);
        if (!s.days[k]) s.days[k] = s.day;
        delete s.day;
      }
      return s;
    }
  } catch {}
  return {
    days: {},
    profile: null, macros: {}, weights: {}, measures: {}, gymLog: {},
    lists: {}, customHabits: {},
    theme: "light", unlocked: [],
    racha: 0, lastDoneDate: null, fastsDone: 0,
    waterGoal: 2000, lastKcalAdjust: {},
    stats: { perfectDays: 0, waterDays: 0, mealsDays: 0 },
  };
}

let state = load();
// Migraciones de formato
if (!state.days) state.days = {};
if (Array.isArray(state.weights)) state.weights = { default: state.weights };
if (state.macros && state.macros.kcal) state.macros = { default: state.macros };
if (Array.isArray(state.list)) { state.lists = state.lists || {}; state.lists.default = state.list; delete state.list; }
state.weights = state.weights || {};
state.macros = state.macros || {};
state.measures = state.measures || {};
state.gymLog = state.gymLog || {};
state.lists = state.lists || {};
state.todos = state.todos || {};
state.customHabits = state.customHabits || {};
state.menu = state.menu || {};
state.secret = state.secret || { pass: null, photos: [], playlist: [] };
state.secret.photos = state.secret.photos || [];
state.secret.playlist = state.secret.playlist || [];
state.stats = state.stats || { perfectDays: 0, waterDays: 0, mealsDays: 0 };
state.unlocked = state.unlocked || [];
state.profiles = state.profiles || {};
state.activeProfile = state.activeProfile || null;
state.reminder = state.reminder || { on: false, time: "20:00", lastDate: null };
state.weightReminder = state.weightReminder || { on: false, time: "09:00", lastDate: null };
state.fastingStart = state.fastingStart || null;
state.fastsDone = state.fastsDone || 0;
state.waterGoal = state.waterGoal || 2000;
state.lastKcalAdjust = state.lastKcalAdjust || {};
state.wallpaper = state.wallpaper || null;
Object.keys(state.days).forEach(k => { state.days[k] = normalizeDay(state.days[k]); });

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
const $ = (s) => document.querySelector(s);
const PK = () => state.activeProfile || "default";
const arr = (map, k) => map[k] || (map[k] = []);
const D = () => {
  const k = PK() + "|" + today;
  if (!state.days[k] || state.days[k].date !== today) state.days[k] = freshDay();
  const d = state.days[k];
  d.meals = d.meals || {}; d.habits = d.habits || {}; d.ex = d.ex || {};
  d.entries = d.entries || []; d.agua = d.agua || 0;
  d.steps = d.steps || 0; d.gym = d.gym || {};
  d.caffeine = d.caffeine || 0; d.sugar = d.sugar || 0;
  return d;
};
// Listas por perfil
const weightsOf = () => arr(state.weights, PK());
const macrosOf = () => state.macros[PK()] || null;
const listOf = () => arr(state.lists, PK());
const todosOf = () => arr(state.todos, PK());
const measuresOf = () => arr(state.measures, PK());
const gymLogOf = () => arr(state.gymLog, PK());
const customHabitsOf = () => arr(state.customHabits, PK());
// Hábitos efectivos: base + personalizados del perfil
const allHabits = () => HABITS.concat(customHabitsOf());

// Cuenta el día como "día de comidas" la primera vez que hay actividad
function maybeCountMealsDay() {
  if (!D()._mealsCounted && (Object.keys(D().meals).length || D().entries.length)) {
    D()._mealsCounted = true;
    state.stats.mealsDays++;
    save();
  }
}

// ===== Comidas =====
function renderMeals() {
  $("#meal-list").innerHTML = MEALS.map(m => `
    <div class="item ${D().meals[m.id] ? "done" : ""}">
      <span class="check" data-toggle="meal:${m.id}">${D().meals[m.id] ? "✓" : ""}</span>
      <span class="emoji">${m.emoji}</span>
      <div>
        <div class="item-title">${m.title} <span style="font-weight:400;color:var(--muted)">· ${m.time}</span></div>
        <div class="item-sub">${m.sub}</div>
      </div>
      <div class="item-meta">${m.kcal}</div>
    </div>`).join("");
  $("#cheat-badge").textContent = D().cheat ? "🍕 Modo trampa activo hoy" : "";
}

// ===== Alimentos registrados =====
function renderFoods() {
  const entries = D().entries;
  const tot = entries.reduce((a, e) => ({
    kcal: a.kcal + e.kcal,
    p: a.p + (e.p || 0), c: a.c + (e.c || 0), f: a.f + (e.f || 0),
  }), { kcal: 0, p: 0, c: 0, f: 0 });
  $("#food-totals").innerHTML = entries.length
    ? `<span><strong>${tot.kcal}</strong> kcal</span><span><strong>${tot.p.toFixed(0)}g</strong> prot</span><span><strong>${tot.c.toFixed(0)}g</strong> carbs</span><span><strong>${tot.f.toFixed(0)}g</strong> grasa</span>`
    : "";
  $("#food-list").innerHTML = entries.map((e, i) => `
    <div class="item">
      <div>
        <div class="item-title">${e.name}</div>
        <div class="item-sub">${e.kcal} kcal${e.qty ? ` · ${e.qty} g` : ""}${e.p ? ` · ${e.p}g P` : ""}${e.c ? ` · ${e.c}g C` : ""}${e.f ? ` · ${e.f}g G` : ""}</div>
      </div>
      <div class="item-meta"><button class="ghost-btn" style="width:auto;margin:0;padding:6px 10px" data-del-food="${i}">✕</button></div>
    </div>`).join("");
}

// ===== Ejercicios =====
function renderExercises() {
  const dayNames = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
  const todayName = dayNames[new Date().getDay()];
  $("#dia-semana").textContent = todayName;
  const w = planWeek();
  $("#plan-week").textContent = `${w}/4 · ${WEEK_PHASES[w - 1]}`;
  const factor = [1, 1.15, 1.3, 0.9][w - 1];
  const ex = EXERCISES[todayName] || [];
  $("#exercise-list").innerHTML = ex.map((e, i) => {
    const id = todayName + i;
    const mins = parseInt(e.m);
    const dispM = isNaN(mins) || /descanso/i.test(e.t) ? e.m : `${Math.round(mins * factor)} min`;
    return `<div class="item ${D().ex[id] ? "done" : ""}">
      <span class="check" data-toggle="ex:${id}">${D().ex[id] ? "✓" : ""}</span>
      <div>
        <div class="item-title">${e.t}</div>
        <div class="item-sub">${e.d}</div>
      </div>
      <div class="item-meta">${dispM}</div>
    </div>`;
  }).join("");
}

// ===== Hábitos =====
function renderHabits() {
  const habits = allHabits();
  $("#habit-list").innerHTML = habits.map(h => `
    <div class="item ${D().habits[h.id] ? "done" : ""}">
      <span class="check" data-toggle="habit:${h.id}">${D().habits[h.id] ? "✓" : ""}</span>
      <span class="emoji">${h.emoji}</span>
      <div>
        <div class="item-title">${h.title}${h.custom ? ` <button class="mini-del" data-del-habit="${h.id}" title="Eliminar">✕</button>` : ""}</div>
        <div class="item-sub">${h.sub}</div>
      </div>
    </div>`).join("");

  const allDone = habits.every(h => D().habits[h.id]);
  if (allDone && habits.length && state.lastDoneDate !== today) {
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    state.racha = state.lastDoneDate === yesterday ? state.racha + 1 : 1;
    state.lastDoneDate = today;
    state.stats.perfectDays++;
    save();
  }
  if (D().agua >= aguaMeta() && !D()._waterCounted) {
    D()._waterCounted = true;
    state.stats.waterDays++;
    save();
  }

  $("#racha-box").innerHTML = `<span class="racha-num">🔥 ${state.racha} días de racha</span>
    <div style="font-size:.85rem;color:var(--muted);margin-top:4px">Completa todos los hábitos para mantenerla.</div>`;
}

// ===== Dashboard =====
function renderDashboard() {
  const habits = allHabits();
  const mealsDone = MEALS.filter(m => D().meals[m.id]).length;
  const habitsDone = habits.filter(h => D().habits[h.id]).length;
  const aguaPct = Math.min(100, Math.round((D().agua / aguaMeta()) * 100));
  const kcal = D().entries.reduce((a, e) => a + e.kcal, 0);

  $("#stat-habitos").textContent = `${habitsDone}/${habits.length}`;
  $("#stat-comidas").textContent = `${mealsDone}/${MEALS.length}`;
  $("#stat-agua").textContent = aguaPct + "%";
  $("#stat-kcal").textContent = kcal;
  $("#bar-habitos").style.width = (habitsDone / habits.length * 100) + "%";
  $("#bar-agua").style.width = aguaPct + "%";
  $("#agua-texto").textContent = `${D().agua} ml / ${aguaMeta()} ml`;

  $("#resumen-texto").textContent = habitsDone === habits.length
    ? "¡Excelente! Completaste todos los hábitos de hoy. 🎉"
    : `Te faltan ${habits.length - habitsDone} hábitos por completar hoy.`;

  const macros = macrosOf();
  $("#resumen-kcal").textContent = macros
    ? `Objetivo: ${macros.kcal} kcal/día · Llevas ${kcal} kcal registradas.`
    : "Tip: completa tu Plan en la pestaña Plan para ver tus objetivos de kcal.";

  const unlocked = ACHIEVEMENTS.filter(a => state.unlocked.includes(a.id));
  $("#dash-achievements").innerHTML = unlocked.length
    ? unlocked.map(a => `<div class="badge"><span class="b-emoji">${a.emoji}</span><div><strong>${a.name}</strong><div style="font-size:.75rem;color:var(--muted)">${a.desc}</div></div></div>`).join("")
    : '<p class="hint">Completa hábitos y registros para desbloquear logros 🏅</p>';
}

// ===== Plan =====
function renderPlanForm() {
  if (!state.profile) return;
  const p = state.profile;
  $("#p-sex").value = p.sex;
  $("#p-age").value = p.age;
  $("#p-weight").value = p.weight;
  $("#p-height").value = p.height;
  $("#p-activity").value = p.activity;
  $("#p-goal").value = p.goal;
}

function calcPlan() {
  const p = state.profile;
  const bmr = Math.round(p.sex === "h"
    ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
    : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161);
  const tdee = Math.round(bmr * p.activity);
  const kcal = Math.max(1200, Math.round(tdee + p.goal));
  const imc = p.weight / Math.pow(p.height / 100, 2);
  const imcCat = imc < 18.5 ? "Bajo peso" : imc < 25 ? "Peso normal" : imc < 30 ? "Sobrepeso" : "Obesidad";
  state.macros[PK()] = {
    kcal,
    p: Math.round(kcal * 0.30 / 4),
    c: Math.round(kcal * 0.40 / 4),
    f: Math.round(kcal * 0.30 / 9),
  };
  $("#plan-result").style.display = "block";
  const m = state.macros[PK()];
  $("#macro-cards").innerHTML = `
    <div class="macro-card"><div class="big">${kcal}</div><div class="lbl">kcal/día</div></div>
    <div class="macro-card"><div class="big">${m.p}g</div><div class="lbl">Proteínas</div></div>
    <div class="macro-card"><div class="big">${m.c}g</div><div class="lbl">Carbohidratos</div></div>
    <div class="macro-card"><div class="big">${m.f}g</div><div class="lbl">Grasas</div></div>
    <div class="macro-card"><div class="big">${imc.toFixed(1)}</div><div class="lbl">IMC · ${imcCat}</div></div>
    <div class="macro-card"><div class="big">${bmr}</div><div class="lbl">TMB kcal</div></div>
    <div class="macro-card"><div class="big">${tdee}</div><div class="lbl">TDEE kcal</div></div>`;
  const adj = state.lastKcalAdjust[PK()];
  $("#plan-extra").innerHTML = adj && Date.now() - adj < 9 * 864e5
    ? `<p class="hint">⚖️ Ajuste automático aplicado el ${new Date(adj).toLocaleDateString("es")}: tu objetivo se ajustó según la tendencia de tu peso.</p>`
    : "";
  save();
}

// Ajuste automático semanal de kcal según tendencia de peso
function maybeAdjustKcal() {
  const p = state.profile;
  if (!p) return;
  const ws = weightsOf().slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  if (ws.length < 2) return;
  const lastAdj = state.lastKcalAdjust[PK()] || 0;
  if (Date.now() - lastAdj < 7 * 864e5) return;
  const last = ws[ws.length - 1];
  const lastT = new Date(last.date).getTime();
  // Buscar el registro más reciente con ~7+ días de antigüedad respecto al último
  const prev = ws.filter(w => lastT - new Date(w.date).getTime() >= 7 * 864e5).pop();
  if (!prev) return;
  const diff = last.kg - prev.kg;
  if (Math.abs(diff) < 0.5) return;
  // Si subió de peso → menos kcal; si bajó → más kcal (suavizar el déficit/superávit)
  const delta = diff > 0 ? -100 : 100;
  p.goal = Math.max(-700, Math.min(500, p.goal + delta));
  state.lastKcalAdjust[PK()] = Date.now();
  if (state.activeProfile && state.profiles[state.activeProfile]) {
    state.profiles[state.activeProfile] = { name: state.profiles[state.activeProfile].name, ...p };
  }
  save();
}

// ===== Recetas =====
function renderRecipes() {
  $("#recipe-list").innerHTML = RECIPES.map(r => `
    <div class="recipe">
      <h3>${r.name}</h3>
      <div class="recipe-meta">${r.meta}</div>
      <details>
        <summary>Ver receta</summary>
        <strong>Ingredientes</strong>
        <ul>${r.ing.map(i => `<li>${i}</li>`).join("")}</ul>
        <strong>Preparación</strong>
        <ol>${r.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      </details>
    </div>`).join("");
}

// ===== Lista de compras =====
function renderList() {
  const list = listOf();
  $("#list-items").innerHTML = list.length
    ? list.map((item, i) => `
      <div class="item ${item.done ? "done" : ""}">
        <span class="check" data-check-list="${i}">${item.done ? "✓" : ""}</span>
        <div class="item-title">${item.name}</div>
        <div class="item-meta"><button class="ghost-btn" style="width:auto;margin:0;padding:6px 10px" data-del-list="${i}">✕</button></div>
      </div>`).join("")
    : '<p class="hint">Lista vacía. Añade alimentos o genera desde tu plan.</p>';
}

// ===== Pendientes =====
function renderTodos() {
  const list = todosOf();
  const ordered = list.filter(t => !t.done).concat(list.filter(t => t.done));
  $("#todo-list").innerHTML = ordered.length
    ? ordered.map(t => `
      <div class="item ${t.done ? "done" : ""}">
        <span class="check" data-check-todo="${t.id}" style="cursor:pointer">${t.done ? "✓" : ""}</span>
        <div class="item-title">${esc(t.text)}</div>
        <div class="item-meta"><button class="ghost-btn" style="width:auto;margin:0;padding:6px 10px" data-del-todo="${t.id}">✕</button></div>
      </div>`).join("")
    : '<p class="hint">Sin pendientes. ¡Buen día! 🌟</p>';
}

// ===== Peso + gráfica =====
function renderWeights() {
  const box = $("#weight-chart");
  const ws = weightsOf().slice(-30);
  if (!ws.length) {
    box.innerHTML = '<p class="hint">⚖️ Registra tu peso para ver la gráfica.</p>';
    return;
  }
  const vals = ws.map(w => w.kg);
  const min = Math.min(...vals) - 1, max = Math.max(...vals) + 1;
  const W = 600, H = 200, P = 30;
  const pts = ws.map((w, i) => {
    const x = ws.length === 1 ? W / 2 : P + (i / (ws.length - 1)) * (W - 2 * P);
    const y = H - P - ((w.kg - min) / (max - min)) * (H - 2 * P);
    return [x, y];
  });
  const line = pts.map(p => p.join(",")).join(" ");
  const circles = pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="var(--green)" />`).join("");
  const step = Math.ceil(ws.length / 6);
  const labels = pts.map((p, i) => (i % step === 0 || i === ws.length - 1)
    ? `<text x="${p[0]}" y="${H - 8}" font-size="10" fill="var(--muted)" text-anchor="middle">${ws[i].date.slice(4, 10)}</text>` : "").join("");
  box.innerHTML = `
    <div class="chart-box"><svg viewBox="0 0 ${W} ${H}">
      <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="var(--border)" />
      <polyline points="${line}" fill="none" stroke="var(--green)" stroke-width="3" />
      ${circles}${labels}
    </svg></div>
    <p class="hint">${ws.length} registros · último: <strong>${ws[ws.length - 1].kg} kg</strong></p>
    ${weightTrendText()}`;
}

// Comparación mensual: promedio últimos 30 días vs 30 días anteriores
function weightTrendText() {
  const ws = weightsOf().slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  if (ws.length < 2) return "";
  const now = Date.now();
  const recent = ws.filter(w => now - new Date(w.date).getTime() <= 30 * 864e5);
  const prev = ws.filter(w => {
    const t = now - new Date(w.date).getTime();
    return t > 30 * 864e5 && t <= 60 * 864e5;
  });
  const avg = a => a.reduce((s, w) => s + w.kg, 0) / a.length;
  if (!recent.length || !prev.length) return "";
  const diff = avg(recent) - avg(prev);
  const arrow = diff < -0.2 ? "📉" : diff > 0.2 ? "📈" : "➡️";
  return `<p class="hint">${arrow} Últimos 30 días: <strong>${diff > 0 ? "+" : ""}${diff.toFixed(1)} kg</strong> vs el mes anterior.</p>`;
}

// ===== Logros =====
function checkAchievements() {
  const stepDays = Object.keys(state.days).filter(k => {
    const d = state.days[k];
    return d.steps >= 8000;
  }).length;
  const conds = {
    racha3: state.racha >= 3,
    racha7: state.racha >= 7,
    racha30: state.racha >= 30,
    perfecto: state.stats.perfectDays >= 1,
    agua: state.stats.waterDays >= 1,
    peso5: weightsOf().length >= 5,
    peso20: weightsOf().length >= 20,
    comidas7: state.stats.mealsDays >= 7,
    comidas30: state.stats.mealsDays >= 30,
    ayuno: state.fastsDone >= 1,
    pasos7: stepDays >= 7,
    medidas: measuresOf().length >= 3,
  };
  let changed = false;
  ACHIEVEMENTS.forEach(a => {
    if (conds[a.id] && !state.unlocked.includes(a.id)) {
      state.unlocked.push(a.id); changed = true;
    }
  });
  if (changed) save();
}

function renderAchievements() {
  checkAchievements();
  $("#achievements").innerHTML = ACHIEVEMENTS.map(a => {
    const got = state.unlocked.includes(a.id);
    return `<div class="badge ${got ? "" : "locked"}"><span class="b-emoji">${a.emoji}</span><div><strong>${a.name}</strong><div style="font-size:.75rem;color:var(--muted)">${got ? "Desbloqueado ✓" : a.desc}</div></div></div>`;
  }).join("");
}

// ===== Temporizador =====
let timerInt = null;
const timer = { running: false, phase: "work", left: 40, round: 1 };

function timerTick() {
  const disp = $("#timer-display");
  const work = +$("#t-work").value || 40;
  const rest = +$("#t-rest").value || 15;
  const rounds = +$("#t-rounds").value || 8;

  timer.left--;
  if (timer.left <= 0) {
    if (timer.phase === "work") {
      if (timer.round >= rounds) { stopTimer(); disp.textContent = "¡Fin! 🎉"; return; }
      timer.phase = "rest"; timer.left = rest;
    } else {
      timer.round++;
      timer.phase = "work"; timer.left = work;
    }
  }
  disp.textContent = timer.left;
  disp.classList.toggle("rest", timer.phase === "rest");
}
function startTimer() {
  if (timer.running) return;
  timer.running = true;
  timer.phase = "work";
  timer.left = +$("#t-work").value || 40;
  timer.round = 1;
  $("#timer-display").classList.remove("rest");
  timerInt = setInterval(timerTick, 1000);
}
function stopTimer() { timer.running = false; clearInterval(timerInt); }
function resetTimer() {
  stopTimer();
  timer.phase = "work";
  timer.left = +$("#t-work").value || 40;
  timer.round = 1;
  const disp = $("#timer-display");
  disp.textContent = timer.left;
  disp.classList.remove("rest");
}

// ===== Gimnasio (fuerza) =====
function gymPR(exId) {
  const kgs = gymLogOf().filter(l => l.ex === exId).map(l => l.kg).filter(k => k > 0);
  return kgs.length ? Math.max(...kgs) : 0;
}
function renderGym() {
  const w = planWeek();
  const tn = DAY_NAMES[new Date().getDay()];
  const split = GYM_SPLIT[tn];
  $("#gym-week").innerHTML = split
    ? `📅 Semana <strong>${w}/4</strong> · ${WEEK_PHASES[w - 1]} — Hoy: <strong>${split.label}</strong>`
    : `📅 Semana <strong>${w}/4</strong> · ${WEEK_PHASES[w - 1]} — hoy descansas de fuerza (próxima: ${nextGymDay()})`;
  const list = split ? GYM.filter(g => split.ids.includes(g.id)) : [];
  $("#gym-list").innerHTML = list.length ? list.map(g => {
    const st = D().gym[g.id] || {};
    const pr = gymPR(g.id);
    const alts = [g.name, ...(g.alts || [])];
    const idx = Math.min(st.alt || 0, alts.length - 1);
    const dispName = alts[idx];
    const prog = (GYM_PROG[g.type] || GYM_PROG.aislado)[w - 1];
    return `<div class="item ${st.done ? "done" : ""}">
      <span class="check" data-toggle="gym:${g.id}">${st.done ? "✓" : ""}</span>
      <div>
        <div class="item-title">${dispName}${idx ? ' <span class="alt-tag">🔄</span>' : ""}</div>
        <div class="item-sub">${prog}</div>
      </div>
      <div class="item-meta gym-meta">
        ${pr ? `<span class="pr-badge">PR ${pr} kg</span>` : ""}
        <input type="number" class="gym-kg" data-gym="${g.id}" placeholder="kg" min="0" step="0.5" value="${st.kg || ""}" />
        <button class="mini-btn" data-swap-gym="${g.id}" title="Cambiar por alternativa">🔄</button>
      </div>
    </div>`;
  }).join("") : `<p class="hint">💤 Hoy no toca fuerza. Descansa o estira — la próxima sesión es el <strong>${nextGymDay()}</strong>.</p>`;
}

// ===== Calendario semanal de ejercicios =====
function renderWeekStrip() {
  const names = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const dayNames = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const todayIdx = new Date().getDay();
  let html = "";
  for (let i = 0; i < 7; i++) {
    const idx = (todayIdx + i) % 7;
    const dn = dayNames[idx];
    const first = (EXERCISES[dn] || [])[0];
    html += `<div class="week-day ${i === 0 ? "today" : ""}">
      <div class="week-name">${i === 0 ? "Hoy" : names[idx]}</div>
      <div class="week-ex">${first ? first.t : "—"}</div>
    </div>`;
  }
  $("#week-strip").innerHTML = html;
}

// ===== Pasos =====
function renderSteps() {
  $("#steps-today").textContent = D().steps.toLocaleString("es") + " pasos";
  // Barras últimos 7 días
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    const k = PK() + "|" + d.toDateString();
    days.push({ label: d.toLocaleDateString("es", { weekday: "short" }), steps: (state.days[k] || {}).steps || 0 });
  }
  const max = Math.max(1000, ...days.map(d => d.steps));
  $("#steps-chart").innerHTML = `<div class="bars">` + days.map(d => `
    <div class="bar-col">
      <div class="bar" style="height:${Math.round(d.steps / max * 90)}px" title="${d.steps} pasos"></div>
      <div class="bar-label">${d.label}</div>
    </div>`).join("") + `</div>`;
}

// ===== Calorías últimos 7 días =====
function dayKcalFor(dateStr) {
  const k = PK() + "|" + dateStr;
  const d = state.days[k];
  return d ? d.entries.reduce((a, e) => a + e.kcal, 0) : 0;
}
function renderKcalChart() {
  const box = $("#kcal-chart");
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    days.push({ label: d.toLocaleDateString("es", { weekday: "short" }), kcal: dayKcalFor(d.toDateString()), goal: macrosOf() ? macrosOf().kcal : null });
  }
  const max = Math.max(500, ...days.map(d => Math.max(d.kcal, d.goal || 0)));
  box.innerHTML = `<div class="bars kcal-bars">` + days.map(d => {
    const h = Math.round(d.kcal / max * 90);
    const gh = d.goal ? Math.round(d.goal / max * 90) : 0;
    return `<div class="bar-col">
      <div class="bar-wrap">
        ${d.goal ? `<div class="bar-goal" style="height:${gh}px" title="Meta ${d.goal}"></div>` : ""}
        <div class="bar kcal" style="height:${h}px" title="${d.kcal} kcal"></div>
      </div>
      <div class="bar-label">${d.label}</div>
    </div>`;
  }).join("") + `</div>
  <p class="hint">${days.reduce((a, d) => a + d.kcal, 0)} kcal en 7 días${macrosOf() ? ` · media ${(days.reduce((a, d) => a + d.kcal, 0) / 7).toFixed(0)} vs meta ${macrosOf().kcal}` : ""}</p>`;
}

// ===== Macros promedio 7 días =====
function renderMacrosChart() {
  const box = $("#macros-chart");
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    const k = PK() + "|" + d.toDateString();
    const day = state.days[k];
    const t = day ? day.entries.reduce((a, e) => ({ p: a.p + (e.p || 0), c: a.c + (e.c || 0), f: a.f + (e.f || 0) }), { p: 0, c: 0, f: 0 }) : { p: 0, c: 0, f: 0 };
    days.push(t);
  }
  const avg = k => (days.reduce((a, d) => a + d[k], 0) / 7).toFixed(0);
  box.innerHTML = `<div class="macro-mini">
    <span>🥩 Prot <strong>${avg("p")}g</strong>/día</span>
    <span>🍞 Carbs <strong>${avg("c")}g</strong>/día</span>
    <span>🥑 Grasas <strong>${avg("f")}g</strong>/día</span>
  </div>`;
}

// ===== Heatmap de hábitos =====
function renderHeatmap() {
  const box = $("#habit-heatmap");
  const habits = allHabits();
  const cells = [];
  const todayDate = new Date();
  // Últimas 12 semanas (84 días), columnas = semanas
  for (let w = 11; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(todayDate.getTime() - (w * 7 + (6 - d)) * 864e5);
      // ajustar al lunes de esa semana
      const dow = (date.getDay() + 6) % 7;
      const cellDate = new Date(date.getTime() - dow * 864e5 + d * 864e5);
      const key = PK() + "|" + cellDate.toDateString();
      const day = state.days[key];
      let lvl = 0;
      if (day && habits.length) {
        const done = habits.filter(h => day.habits[h.id]).length;
        lvl = Math.round(done / habits.length * 3);
      }
      const isToday = cellDate.toDateString() === today;
      cells.push(`<div class="hm-cell lvl${lvl} ${isToday ? "hm-today" : ""}" title="${cellDate.toLocaleDateString("es")}: ${lvl * 33}%"></div>`);
    }
  }
  box.innerHTML = `<div class="heatmap">${cells.join("")}</div>
    <p class="hint">Constancia últimos 12 semanas · más oscuro = más hábitos completados</p>`;
}

// ===== Medidas corporales =====
function renderMeasures() {
  const ms = measuresOf();
  if (!ms.length) {
    $("#measures-list").innerHTML = '<p class="hint">📏 Aún no has registrado medidas. Usa el formulario de arriba.</p>';
    return;
  }
  const last = ms[ms.length - 1];
  const parts = MEASURE_FIELDS.filter(([k]) => last[k] != null).map(([k, label]) => `${label.replace(/ \(cm\)/, "")}: <strong>${last[k]} cm</strong>`);
  $("#measures-list").innerHTML = `
    <p class="hint">Última medición (${new Date(last.date).toLocaleDateString("es")}): ${parts.join(" · ") || "—"}</p>
    <p class="hint">${ms.length} registro(s) en total</p>`;
}

// ===== Menú semanal =====
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function genMenu() {
  const pool = shuffle(RECIPES);
  const menu = [];
  for (let i = 0; i < 7; i++) menu.push(pool[i % pool.length]);
  state.menu = state.menu || {};
  state.menu[PK()] = menu.map(r => r.name);
  save(); renderMenu();
}
function renderMenu() {
  const box = $("#menu-result");
  const names = (state.menu || {})[PK()];
  if (!names || !names.length) {
    box.innerHTML = '<p class="hint">Genera un menú semanal con el botón ✨.</p>';
    return;
  }
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  box.innerHTML = days.map((d, i) => {
    const r = RECIPES.find(x => x.name === names[i]);
    return `<div class="menu-day"><strong>${d}</strong> — ${names[i]}${r ? ` <span class="hint">${r.meta}</span>` : ""}</div>`;
  }).join("");
}

// ===== Gráficas de pastel =====
function donutCard(pct, color, label, sub) {
  return `<div class="donut-card">
    <div class="donut" style="background:conic-gradient(${color} ${Math.min(100, pct)}%, var(--border) 0)"><span>${Math.round(pct)}%</span></div>
    <div class="donut-label">${label}<div class="hint" style="margin:2px 0 0">${sub}</div></div>
  </div>`;
}
function donutMulti(segs, centerText, centerSub) {
  const tot = segs.reduce((a, s) => a + s.v, 0);
  let acc = 0;
  const stops = [];
  segs.forEach(s => {
    if (!s.v || !tot) return;
    const end = acc + (s.v / tot) * 100;
    stops.push(`${s.color} ${acc}% ${end}%`);
    acc = end;
  });
  const bg = stops.length ? `conic-gradient(${stops.join(", ")})` : "var(--border)";
  return `<div class="donut" style="background:${bg}"><span class="donut-center"><strong>${centerText}</strong><small>${centerSub}</small></span></div>`;
}
function renderPieCharts() {
  const habits = allHabits();
  const habitsPct = habits.length ? habits.filter(h => D().habits[h.id]).length / habits.length * 100 : 0;
  const mealsPct = MEALS.filter(m => D().meals[m.id]).length / MEALS.length * 100;
  const aguaPct = Math.min(100, D().agua / aguaMeta() * 100);
  const progPct = Math.round((habitsPct + mealsPct + aguaPct) / 3);

  const kcal = D().entries.reduce((a, e) => a + e.kcal, 0);
  const goal = macrosOf() ? macrosOf().kcal : 0;
  const nutPct = goal ? Math.min(100, kcal / goal * 100) : 0;

  const t = D().entries.reduce((a, e) => ({
    p: a.p + (e.p || 0), c: a.c + (e.c || 0), f: a.f + (e.f || 0),
  }), { p: 0, c: 0, f: 0 });
  const macroTot = t.p + t.c + t.f;

  $("#pie-charts").innerHTML = `
    <div class="donut-row">
      ${donutCard(progPct, "var(--green)", "Progreso de hoy", `hábitos ${Math.round(habitsPct)}% · comidas ${Math.round(mealsPct)}% · agua ${Math.round(aguaPct)}%`)}
      ${donutCard(nutPct, "#0ea5e9", "Nutrición", goal ? `${kcal} de ${goal} kcal` : "sin meta — completa tu Plan")}
      <div class="donut-card">
        ${donutMulti([
          { v: t.p, color: "#16a34a" },
          { v: t.c, color: "#f59e0b" },
          { v: t.f, color: "#8b5cf6" },
        ], macroTot ? `${macroTot}g` : "—", "macros hoy")}
        <div class="donut-label">Macros de hoy
          <div class="hint" style="margin:2px 0 0">🥩 ${t.p.toFixed(0)}g · 🍞 ${t.c.toFixed(0)}g · 🥑 ${t.f.toFixed(0)}g</div>
        </div>
      </div>
    </div>`;
}

// ===== Render global =====
function renderAll() {
  renderMeals(); renderFoods(); renderExercises(); renderHabits(); renderGym(); renderWeekStrip();
  renderDashboard(); renderRecipes(); renderList(); renderMenu(); renderTodos();
  renderWeights(); renderSteps(); renderKcalChart(); renderMacrosChart(); renderHeatmap(); renderMeasures(); renderPieCharts(); renderWeekSummary();
  renderAchievements();
}

// ===== Tema =====
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("#dark-toggle").checked = state.theme === "dark";
  if (state.wallpaper) {
    document.documentElement.dataset.wallpaper = state.wallpaper;
  } else {
    delete document.documentElement.dataset.wallpaper;
  }
  document.querySelectorAll(".wp-btn").forEach(b =>
    b.classList.toggle("wp-active", b.dataset.wp === state.wallpaper));
  if (typeof applyAppWallpaper === "function") applyAppWallpaper();
}

// ===== Eventos =====
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-toggle]");
  if (t) {
    const [grp, id] = t.dataset.toggle.split(":");
    if (grp === "gym") {
      const cur = D().gym[id] || {};
      if (cur.done) {
        delete D().gym[id];
      } else {
        const kgInput = document.querySelector(`[data-gym="${id}"]`);
        const kg = kgInput ? +kgInput.value || 0 : 0;
        D().gym[id] = { done: true, kg, alt: cur.alt || 0 };
        if (kg > 0) gymLogOf().push({ date: today, ex: id, kg });
      }
      maybeCountMealsDay();
      save(); renderGym(); renderAll(); return;
    }
    const obj = grp === "meal" ? D().meals : grp === "habit" ? D().habits : D().ex;
    if (obj[id]) delete obj[id]; else { obj[id] = true; if (navigator.vibrate) navigator.vibrate(30); }
    maybeCountMealsDay();
    maybeCelebrate();
    save(); renderAll(); return;
  }
  const cl = e.target.closest("[data-check-list]");
  if (cl) {
    const it = listOf()[+cl.dataset.checkList];
    it.done = !it.done; save(); renderList(); return;
  }
  const dl = e.target.closest("[data-del-list]");
  if (dl) { listOf().splice(+dl.dataset.delList, 1); save(); renderList(); return; }
  const ct = e.target.closest("[data-check-todo]");
  if (ct) {
    const todo = todosOf().find(x => x.id === ct.dataset.checkTodo);
    if (todo) { todo.done = !todo.done; save(); renderTodos(); }
    return;
  }
  const dtd = e.target.closest("[data-del-todo]");
  if (dtd) {
    const i = todosOf().findIndex(x => x.id === dtd.dataset.delTodo);
    if (i >= 0) { todosOf().splice(i, 1); save(); renderTodos(); }
    return;
  }
  const df = e.target.closest("[data-del-food]");
  if (df) {
    D().entries.splice(+df.dataset.delFood, 1);
    save(); renderFoods(); renderDashboard(); return;
  }
  const sw = e.target.closest("[data-swap-gym]");
  if (sw) {
    const id = sw.dataset.swapGym;
    const g = GYM.find(x => x.id === id);
    if (g) {
      const cur = D().gym[id] || {};
      const total = 1 + (g.alts || []).length;
      D().gym[id] = { ...cur, alt: ((cur.alt || 0) + 1) % total };
      save(); renderGym();
    }
    return;
  }
  const dh = e.target.closest("[data-del-habit]");
  if (dh) {
    const i = customHabitsOf().findIndex(h => h.id === dh.dataset.delHabit);
    if (i >= 0) { customHabitsOf().splice(i, 1); save(); renderHabits(); renderDashboard(); renderHeatmap(); }
    return;
  }
  const dm = e.target.closest("[data-del-measure]");
  if (dm) {
    measuresOf().splice(+dm.dataset.delMeasure, 1);
    save(); renderMeasures(); renderAchievements(); return;
  }
});

// Indicador deslizante del tab activo
function moveTabInk() {
  const ink = $("#tab-ink");
  const active = document.querySelector(".tab.active");
  if (!ink || !active) return;
  ink.style.left = active.offsetLeft + "px";
  ink.style.top = active.offsetTop + "px";
  ink.style.width = active.offsetWidth + "px";
  ink.style.height = active.offsetHeight + "px";
}
window.addEventListener("resize", moveTabInk);
window.addEventListener("load", moveTabInk);

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    moveTabInk();
    $("#" + tab.dataset.tab).classList.add("active");
    if (tab.dataset.tab === "secreto") {
      // Pedir contraseña cada vez que se entra a la sección
      $("#secret-content").style.display = "none";
      $("#secret-lock").style.display = "block";
      $("#secret-pass").value = "";
      $("#secret-lock-msg").textContent = "";
    }
  });
});

// Agua
$("#agua-250").addEventListener("click", () => { D().agua = Math.min(aguaMeta(), D().agua + 250); save(); renderAll(); });
$("#agua-500").addEventListener("click", () => { D().agua = Math.min(aguaMeta(), D().agua + 500); save(); renderAll(); });
$("#agua-reset").addEventListener("click", () => { D().agua = 0; save(); renderAll(); });

// Alimentos: autocompletado desde la base local
const normTxt = (s) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

$("#f-name").addEventListener("change", () => {
  const q = normTxt($("#f-name").value);
  if (!q) return;
  const f = FOODS.find(x => normTxt(x.n) === q) || FOODS.find(x => normTxt(x.n).includes(q));
  if (f) {
    $("#f-kcal").value = f.k; $("#f-prot").value = f.p;
    $("#f-carb").value = f.c; $("#f-fat").value = f.f;
    $("#f-qty").value = 100;
    $("#food-hint").textContent = `💡 ${f.n}: valores por 100 g. Ajusta la cantidad en gramos y se escalan solos.`;
  }
});
$("#food-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const qty = +$("#f-qty").value || 0;
  const scale = qty > 0 ? qty / 100 : 1;
  D().entries.push({
    name: $("#f-name").value.trim(),
    qty: qty || null,
    kcal: Math.round((+$("#f-kcal").value || 0) * scale),
    p: +((+$("#f-prot").value || 0) * scale).toFixed(1),
    c: +((+$("#f-carb").value || 0) * scale).toFixed(1),
    f: +((+$("#f-fat").value || 0) * scale).toFixed(1),
  });
  e.target.reset(); $("#food-hint").textContent = "";
  maybeCountMealsDay(); save(); renderFoods(); renderDashboard();
});

// Escáner de código de barras (Open Food Facts, gratis, sin API key)
$("#barcode-btn").addEventListener("click", async () => {
  if (!("BarcodeDetector" in window)) {
    alert("Tu navegador no soporta el lector de códigos. Usa Chrome en Android/PC.");
    return;
  }
  try {
    const detector = new BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] });
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const video = document.createElement("video");
    video.srcObject = stream; video.muted = true; video.playsInline = true;
    video.style.cssText = "position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:9999;background:#000";
    document.body.appendChild(video);
    await video.play();
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#000a;color:#fff;padding:10px 18px;border-radius:10px;z-index:10000;font-family:sans-serif";
    overlay.textContent = "Apunta al código de barras… (toca para cancelar)";
    document.body.appendChild(overlay);
    const cancel = () => { stream.getTracks().forEach(t => t.stop()); video.remove(); overlay.remove(); document.removeEventListener("click", cancel); };
    document.addEventListener("click", cancel);
    let code = null;
    for (let i = 0; i < 300 && !code; i++) {
      const codes = await detector.detect(video);
      if (codes.length) code = codes[0].rawValue;
      else await new Promise(r => setTimeout(r, 100));
    }
    cancel();
    if (!code) { alert("No se detectó ningún código."); return; }
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,nutriments`);
    const data = await res.json();
    if (data.status !== 1) { alert("Producto no encontrado en Open Food Facts."); return; }
    const n = data.product.nutriments || {};
    $("#f-name").value = data.product.product_name || `Producto ${code}`;
    $("#f-kcal").value = Math.round(n["energy-kcal_100g"] || n["energy-kcal"] || 0);
    $("#f-prot").value = +(n.proteins_100g || 0).toFixed(1);
    $("#f-carb").value = +(n.carbohydrates_100g || 0).toFixed(1);
    $("#f-fat").value = +(n.fat_100g || 0).toFixed(1);
    $("#f-qty").value = 100;
    $("#food-hint").textContent = "📷 Valores por 100 g desde Open Food Facts. Ajusta la cantidad si comes otra porción.";
  } catch (err) {
    alert("Error accediendo a la cámara: " + err.message);
  }
});

// Plan
$("#plan-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.profile = {
    sex: $("#p-sex").value,
    age: +$("#p-age").value,
    weight: +$("#p-weight").value,
    height: +$("#p-height").value,
    activity: +$("#p-activity").value,
    goal: +$("#p-goal").value,
  };
  if (state.activeProfile && state.profiles[state.activeProfile]) {
    state.profiles[state.activeProfile] = { name: state.profiles[state.activeProfile].name, ...state.profile };
  }
  save(); calcPlan(); renderDashboard();
});

// Lista
$("#list-form").addEventListener("submit", (e) => {
  e.preventDefault();
  listOf().push({ name: $("#l-item").value.trim(), done: false });
  e.target.reset(); save(); renderList();
});
$("#list-autogen").addEventListener("click", () => {
  AUTO_LIST.forEach(name => {
    if (!listOf().some(i => i.name.toLowerCase() === name.toLowerCase()))
      listOf().push({ name, done: false });
  });
  save(); renderList();
});
$("#list-clear").addEventListener("click", () => {
  if (confirm("¿Vaciar toda la lista?")) { state.lists[PK()] = []; save(); renderList(); }
});

// Pendientes
$("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $("#todo-input").value.trim();
  if (!text) return;
  todosOf().push({ id: "t" + Date.now() + Math.random().toString(36).slice(2, 6), text, done: false });
  e.target.reset(); save(); renderTodos();
});
$("#todo-clear").addEventListener("click", () => {
  state.todos[PK()] = todosOf().filter(t => !t.done);
  save(); renderTodos();
});

// Peso
$("#weight-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const kg = +$("#w-kg").value;
  const ws = weightsOf();
  const last = ws[ws.length - 1];
  if (last && last.date === today) last.kg = kg;
  else ws.push({ date: today, kg });
  e.target.reset(); save(); renderWeights(); renderAchievements();
  maybeAdjustKcal();
  if (state.profile) calcPlan();
});

// Timer
$("#timer-start").addEventListener("click", startTimer);
$("#timer-reset").addEventListener("click", resetTimer);
["#t-work", "#t-rest", "#t-rounds"].forEach(s => $(s).addEventListener("change", resetTimer));

// Ajustes
$("#dark-toggle").addEventListener("change", (e) => {
  state.theme = e.target.checked ? "dark" : "light";
  save(); applyTheme();
});
document.querySelectorAll(".wp-btn").forEach(b => {
  b.addEventListener("click", () => {
    state.wallpaper = b.dataset.wp === state.wallpaper ? null : b.dataset.wp;
    save(); applyTheme();
  });
});
$("#export-btn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fitnutri-datos.json";
  a.click();
});
$("#reset-btn").addEventListener("click", () => {
  if (confirm("¿Borrar TODOS los datos? Esta acción no se puede deshacer.")) {
    localStorage.removeItem(KEY);
    location.reload();
  }
});

// ===== Ayuno intermitente =====
// ✏️ EDITABLE: Duracion del ayuno y de la ventana de alimentacion (en horas)
const FAST_H = 16, EAT_H = 8;
function fmtDur(ms) {
  const m = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m} min`;
}
function renderFasting() {
  const el = $("#fasting-status");
  if (!state.fastingStart) {
    el.textContent = "Ayuno no iniciado";
    return;
  }
  const elapsed = Date.now() - state.fastingStart;
  const fastMs = FAST_H * 36e5, eatMs = EAT_H * 36e5;
  if (elapsed < fastMs) {
    el.textContent = `🍽️ Ayuno en curso — termina en ${fmtDur(fastMs - elapsed)}`;
  } else if (elapsed < fastMs + eatMs) {
    el.textContent = `✅ Ventana de alimentación — quedan ${fmtDur(fastMs + eatMs - elapsed)}`;
  } else {
    el.textContent = "⏰ Ventana terminada — inicia un nuevo ayuno";
  }
}
$("#fast-start").addEventListener("click", () => {
  if (state.fastingStart) return;
  state.fastingStart = Date.now();
  save(); renderFasting();
});
$("#fast-stop").addEventListener("click", () => {
  if (state.fastingStart && Date.now() - state.fastingStart >= FAST_H * 36e5) {
    state.fastsDone++;
    checkAchievements();
  }
  state.fastingStart = null;
  save(); renderFasting(); renderAchievements();
});
setInterval(renderFasting, 30000);

// ===== Perfiles =====
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function profileFields() {
  return {
    sex: $("#p-sex").value,
    age: +$("#p-age").value,
    weight: +$("#p-weight").value,
    height: +$("#p-height").value,
    activity: +$("#p-activity").value,
    goal: +$("#p-goal").value,
  };
}
function renderProfiles() {
  const sel = $("#profile-select");
  const ids = Object.keys(state.profiles);
  sel.innerHTML = '<option value="">— Sin perfil —</option>' +
    ids.map((id) => `<option value="${id}">${esc(state.profiles[id].name)}</option>`).join("");
  sel.value = state.activeProfile || "";
}
$("#profile-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#p-name").value.trim();
  if (!name) return;
  const id = "p" + Date.now();
  state.profiles[id] = { name, ...profileFields() };
  state.activeProfile = id;
  const f = { ...state.profiles[id] };
  delete f.name;
  state.profile = f;
  $("#p-name").value = "";
  save(); renderProfiles(); renderPlanForm(); calcPlan(); renderDashboard();
});
$("#profile-select").addEventListener("change", (e) => {
  const id = e.target.value;
  state.activeProfile = id || null;
  if (id) {
    const f = { ...state.profiles[id] };
    delete f.name;
    state.profile = f;
  } else {
    state.profile = null;
    delete state.macros[PK()];
    $("#plan-result").style.display = "none";
  }
  save(); renderPlanForm();
  if (state.profile && macrosOf()) calcPlan();
  renderDashboard();
});
$("#profile-del").addEventListener("click", () => {
  const id = state.activeProfile;
  if (!id || !state.profiles[id]) return;
  if (!confirm(`¿Eliminar el perfil "${state.profiles[id].name}"?`)) return;
  delete state.profiles[id];
  const rest = Object.keys(state.profiles);
  state.activeProfile = rest[0] || null;
  if (state.activeProfile) {
    const f = { ...state.profiles[state.activeProfile] };
    delete f.name;
    state.profile = f;
  } else {
    state.profile = null;
    delete state.macros[PK()];
    $("#plan-result").style.display = "none";
  }
  save(); renderProfiles(); renderPlanForm();
  if (state.profile && macrosOf()) calcPlan();
  renderDashboard();
});

// ===== Recordatorios =====
function remindStatusText(r, extra) {
  if (!r.on) return "Desactivado";
  if (!("Notification" in window)) return "Tu navegador no soporta notificaciones.";
  if (Notification.permission === "denied") return "Notificaciones bloqueadas en el navegador.";
  if (Notification.permission === "default") return "Se pedirá permiso de notificación al activar.";
  return `Activado — te avisaré a las ${r.time}${extra ? " " + extra : ""}.`;
}
async function bindReminder(toggleSel, timeSel, statusSel, key) {
  const r = state[key];
  $(toggleSel).checked = !!r.on;
  $(timeSel).value = r.time || "20:00";
  $(statusSel).textContent = remindStatusText(r);
  $(toggleSel).addEventListener("change", async (e) => {
    r.on = e.target.checked;
    if (r.on && "Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    save(); $(statusSel).textContent = remindStatusText(r);
  });
  $(timeSel).addEventListener("change", (e) => {
    r.time = e.target.value || "20:00";
    save(); $(statusSel).textContent = remindStatusText(r);
  });
}
bindReminder("#remind-toggle", "#remind-time", "#remind-status", "reminder");
bindReminder("#weight-remind-toggle", "#weight-remind-time", "#weight-remind-status", "weightReminder");
setInterval(() => {
  const now = new Date();
  const notify = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };
  const isDue = (r) => {
    const [h, m] = (r.time || "20:00").split(":").map(Number);
    return now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m);
  };
  // Recordatorio de hábitos
  const r = state.reminder;
  if (r && r.on && r.lastDate !== today && isDue(r)) {
    const habits = allHabits();
    const done = habits.filter((x) => D().habits[x.id]).length;
    if (done < habits.length) {
      r.lastDate = today; save();
      notify("FitNutri", "¡Es hora de registrar tus hábitos y comidas del día!");
    }
  }
  // Recordatorio de peso (semanal: lunes)
  const wr = state.weightReminder;
  if (wr && wr.on && wr.lastDate !== today && now.getDay() === 1 && isDue(wr)) {
    wr.lastDate = today; save();
    notify("FitNutri", "⚖️ Lunes: ¡es buen día para pesarte y registrar tu peso!");
  }
}, 30000);

// ===== Compartir progreso =====
$("#share-btn").addEventListener("click", async () => {
  const habits = allHabits();
  const habitsDone = habits.filter((h) => D().habits[h.id]).length;
  const kcal = D().entries.reduce((a, e) => a + e.kcal, 0);
  const ws = weightsOf();
  const lastW = ws[ws.length - 1];
  const macros = macrosOf();
  const text = `🥗 Mi progreso en FitNutri\n🔥 ${state.racha} días de racha\n✅ Hábitos hoy: ${habitsDone}/${habits.length}\n🍽️ Kcal registradas: ${kcal}${macros ? ` (meta ${macros.kcal})` : ""}\n⚖️ Último peso: ${lastW ? lastW.kg + " kg" : "—"}`;
  if (navigator.share) {
    try { await navigator.share({ title: "Mi progreso FitNutri", text }); } catch {}
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    alert("Progreso copiado al portapapeles");
  }
});

// ===== Hábitos personalizados =====
$("#habit-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = $("#h-title").value.trim();
  if (!title) return;
  const emoji = $("#h-emoji").value.trim() || "✅";
  const id = "c" + Date.now();
  customHabitsOf().push({ id, emoji, title, sub: "Personalizado", custom: true });
  $("#h-title").value = ""; $("#h-emoji").value = "";
  save(); renderHabits(); renderDashboard(); renderHeatmap();
});

// ===== Pasos =====
function addSteps(n) {
  D().steps += n;
  save(); renderSteps(); renderDashboard();
}
$("#steps-500").addEventListener("click", () => addSteps(500));
$("#steps-1000").addEventListener("click", () => addSteps(1000));
$("#steps-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const n = +$("#steps-input").value || 0;
  if (n > 0) { addSteps(n); e.target.reset(); }
});

// ===== Medidas corporales =====
$("#measures-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const m = { date: today };
  let any = false;
  MEASURE_FIELDS.forEach(([k, label]) => {
    const v = +$("#m-" + k).value;
    if (v > 0) { m[k] = v; any = true; }
  });
  if (!any) return;
  measuresOf().push(m);
  e.target.reset(); save(); renderMeasures(); renderAchievements();
});

// ===== Menú semanal =====
$("#menu-gen").addEventListener("click", genMenu);
$("#menu-list").addEventListener("click", () => {
  const names = (state.menu || {})[PK()];
  if (!names) return;
  const ings = [];
  names.forEach(n => {
    const r = RECIPES.find(x => x.name === n);
    if (r) r.ing.forEach(i => { if (!ings.includes(i)) ings.push(i); });
  });
  ings.forEach(i => {
    if (!listOf().some(x => x.name.toLowerCase() === i.toLowerCase()))
      listOf().push({ name: i, done: false });
  });
  save(); renderList(); alert(`✅ ${ings.length} ingredientes añadidos a tu lista de compras`);
});

// ===== Timer de descanso (entre series) =====
let restInt = null;
$("#rest-start").addEventListener("click", () => {
  const secs = +$("#rest-secs").value || 60;
  clearInterval(restInt);
  let left = secs;
  $("#rest-display").textContent = left;
  restInt = setInterval(() => {
    left--;
    if (left <= 0) {
      clearInterval(restInt);
      $("#rest-display").textContent = "¡Descansa! 💪";
      try { new (window.AudioContext || window.webkitAudioContext)().resume(); } catch {}
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("FitNutri", { body: "Descanso terminado — ¡a la siguiente serie!" });
      }
      setTimeout(() => { $("#rest-display").textContent = secs; }, 4000);
      return;
    }
    $("#rest-display").textContent = left;
  }, 1000);
});
$("#rest-reset").addEventListener("click", () => {
  clearInterval(restInt);
  $("#rest-display").textContent = +$("#rest-secs").value || 60;
});

// Peso de ejercicios de fuerza (se guarda sin marcar)
document.addEventListener("change", (e) => {
  const inp = e.target.closest(".gym-kg");
  if (!inp) return;
  const id = inp.dataset.gym;
  const kg = +inp.value || 0;
  if (D().gym[id]) D().gym[id].kg = kg;
  if (kg > 0) {
    const logs = gymLogOf();
    const existing = logs.find(l => l.ex === id && l.date === today);
    if (existing) existing.kg = kg;
    else logs.push({ date: today, ex: id, kg });
  }
  save(); renderGym(); renderAchievements();
});

// Día de trampa + cafeína/azúcar
$("#cheat-toggle").addEventListener("click", () => {
  D().cheat = !D().cheat;
  save(); renderMeals();
});
$("#caf-btn").addEventListener("click", () => { D().caffeine++; save(); renderCafSugar(); });
$("#sugar-btn").addEventListener("click", () => { D().sugar++; save(); renderCafSugar(); });
$("#caf-reset").addEventListener("click", () => { D().caffeine = 0; D().sugar = 0; save(); renderCafSugar(); });
function renderCafSugar() {
  $("#caf-text").textContent = `☕ ${D().caffeine} · 🍬 ${D().sugar}`;
}

// Exportar CSV
$("#csv-btn").addEventListener("click", () => {
  const ws = weightsOf();
  const rows = [["fecha", "peso_kg"]];
  ws.forEach(w => rows.push([w.date, w.kg]));
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fitnutri-peso.csv";
  a.click();
});

// Meta de agua configurable
$("#water-goal").addEventListener("change", (e) => {
  const v = +e.target.value;
  if (v >= 250 && v <= 10000) {
    state.waterGoal = v;
    save(); renderDashboard(); renderHabits();
  }
});

// ===== Confeti al completar el entrenamiento =====
function celebrate() {
  const c = document.createElement("canvas");
  c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:20000";
  document.body.appendChild(c);
  const ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const colors = ["#16a34a", "#f59e0b", "#0ea5e9", "#ec4899", "#8b5cf6", "#fde047"];
  const parts = Array.from({ length: 160 }, () => ({
    x: innerWidth / 2 + (Math.random() - .5) * 220,
    y: innerHeight * 0.35,
    vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, g: .35,
    s: Math.random() * 8 + 4, c: colors[Math.random() * colors.length | 0],
    r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
  }));
  let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height); t++;
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
      ctx.restore();
    });
    if (t < 160) requestAnimationFrame(loop); else c.remove();
  })();
}
// Si todos los ejercicios de hoy están marcados → celebrar una vez al día
function maybeCelebrate() {
  const dn = DAY_NAMES[new Date().getDay()];
  const ex = EXERCISES[dn] || [];
  if (ex.length && ex.every((_, i) => D().ex[dn + i]) && !D()._celebrated) {
    D()._celebrated = true;
    save(); celebrate();
  }
}

// ===== Sección secreta =====
function renderSecret() {
  renderPhotos(); renderMusic(); renderHistory(); renderSecretMsg();
}

// ===== Modo historia: línea de tiempo semanal =====
function renderHistory() {
  const box = $("#history-timeline");
  const prefix = PK() + "|";
  const entries = Object.keys(state.days)
    .filter(k => k.startsWith(prefix))
    .map(k => ({ date: new Date(k.slice(prefix.length)), day: state.days[k] }))
    .filter(e => !isNaN(e.date));
  if (!entries.length) {
    box.innerHTML = '<p class="hint">📜 Aún no hay historial — completa tu primer día de hábitos y aparecerá aquí.</p>';
    return;
  }
  entries.sort((a, b) => a.date - b.date);
  const weeks = {};
  entries.forEach(e => {
    const d = new Date(e.date);
    const dow = (d.getDay() + 6) % 7;
    const mon = new Date(d); mon.setDate(d.getDate() - dow); mon.setHours(0, 0, 0, 0);
    const key = mon.toDateString();
    (weeks[key] = weeks[key] || []).push(e.day);
  });
  const wkeys = Object.keys(weeks).sort((a, b) => new Date(a) - new Date(b));
  const ws = weightsOf().slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const habits = allHabits();
  const goalW = state.profile ? state.profile.weight : null;
  box.innerHTML = wkeys.map((k, i) => {
    const days = weeks[k];
    const habitsPct = Math.round(days.reduce((a, d) => a + habits.filter(h => d.habits[h.id]).length / habits.length, 0) / days.length * 100);
    const avgKcal = Math.round(days.reduce((a, d) => a + d.entries.reduce((x, e) => x + e.kcal, 0), 0) / days.length);
    const endD = new Date(k); endD.setDate(endD.getDate() + 6);
    const wAtEnd = ws.filter(x => new Date(x.date) <= endD).pop();
    const isNow = i === wkeys.length - 1;
    return `<div class="tl-item ${isNow ? "tl-now" : ""}">
      <div class="tl-dot"></div>
      <div class="tl-content">
        <strong>Semana ${i + 1}</strong>
        <span class="hint">${new Date(k).toLocaleDateString("es", { day: "numeric", month: "short" })} → ${endD.toLocaleDateString("es", { day: "numeric", month: "short" })}</span>
        ${isNow ? ' <span class="pr-badge">AHORA</span>' : ""}
        <div class="item-sub">${habitsPct}% hábitos · ~${avgKcal} kcal/día${wAtEnd ? ` · ⚖️ ${wAtEnd.kg} kg` : ""}</div>
      </div>
    </div>`;
  }).join("") + `<div class="tl-item tl-goal">
    <div class="tl-dot"></div>
    <div class="tl-content"><strong>🏁 Meta</strong>
    <div class="item-sub">${goalW ? `Peso objetivo de tu plan: ${goalW} kg` : "Sigue completando días para ver tu progreso"}</div>
    </div></div>`;
}

// ===== Mensaje secreto desbloqueable =====
function renderSecretMsg() {
  const done = state.stats.perfectDays || 0;
  const box = $("#secret-msg-box");
  if (done >= SECRET_UNLOCK_DAYS) {
    box.innerHTML = `<div class="secret-reveal">💌 ${SECRET_MSG}</div>
      <p class="hint">Desbloqueado · ${done} días completados 🏆</p>`;
  } else {
    const pct = Math.round(done / SECRET_UNLOCK_DAYS * 100);
    box.innerHTML = `<p class="hint">🔒 Hay un mensaje escondido que se desbloquea al completar <strong>${SECRET_UNLOCK_DAYS} días</strong> de hábitos.</p>
      <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
      <p class="hint">Progreso: ${done}/${SECRET_UNLOCK_DAYS} días · ${pct}%</p>`;
  }
}

function showSecret() {
  $("#secret-lock").style.display = "none";
  $("#secret-content").style.display = "block";
  renderSecret();
}
$("#secret-unlock").addEventListener("click", () => {
  const v = $("#secret-pass").value;
  if (!v) return;
  if (!state.secret.pass) {
    // Primera vez: esto se convierte en la contraseña
    state.secret.pass = v;
    save();
  } else if (v !== state.secret.pass) {
    $("#secret-lock-msg").textContent = "Contraseña incorrecta 🔒";
    return;
  }
  showSecret();
});
$("#secret-pass").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#secret-unlock").click(); });

// Fotos antes/después (se comprimen a ~900px JPEG para no llenar localStorage)
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 900;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      resolve(cv.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
$("#photo-add").addEventListener("click", () => $("#photo-input").click());
$("#photo-input").addEventListener("change", async (e) => {
  for (const f of e.target.files) {
    try {
      const src = await fileToDataURL(f);
      state.secret.photos.push({ id: "ph" + Date.now() + Math.random().toString(36).slice(2, 6), src, tag: "despues", date: today });
      save();
    } catch { alert("No se pudo leer " + f.name); }
  }
  e.target.value = "";
  renderPhotos();
});
function renderPhotos() {
  const grid = $("#photos-grid");
  const photos = state.secret.photos;
  if (!photos.length) {
    grid.innerHTML = '<p class="hint">Aún no hay fotos. Sube la primera 💪</p>';
    return;
  }
  const card = (p) => `
    <div class="photo-card">
      <img src="${p.src}" alt="progreso" loading="lazy" />
      <div class="photo-meta">
        <span class="hint">${new Date(p.date).toLocaleDateString("es")}</span>
        <div class="photo-btns">
          <button class="mini-btn ${p.tag === "antes" ? "tag-active" : ""}" data-photo-tag="${p.id}:antes">Antes</button>
          <button class="mini-btn ${p.tag === "despues" ? "tag-active" : ""}" data-photo-tag="${p.id}:despues">Después</button>
          <button class="mini-btn" data-photo-del="${p.id}">✕</button>
        </div>
      </div>
    </div>`;
  const antes = photos.filter(p => p.tag === "antes");
  const despues = photos.filter(p => p.tag !== "antes");
  grid.innerHTML = `
    ${despues.length ? `<h4 class="photo-group">🏆 Después (${despues.length})</h4><div class="photos-row">${despues.map(card).join("")}</div>` : ""}
    ${antes.length ? `<h4 class="photo-group">🌱 Antes (${antes.length})</h4><div class="photos-row">${antes.map(card).join("")}</div>` : ""}`;
}
document.addEventListener("click", (e) => {
  const tg = e.target.closest("[data-photo-tag]");
  if (tg) {
    const [id, tag] = tg.dataset.photoTag.split(":");
    const p = state.secret.photos.find(x => x.id === id);
    if (p) { p.tag = tag; save(); renderPhotos(); }
    return;
  }
  const pd = e.target.closest("[data-photo-del]");
  if (pd) {
    if (confirm("¿Eliminar esta foto?")) {
      state.secret.photos = state.secret.photos.filter(x => x.id !== pd.dataset.photoDel);
      save(); renderPhotos();
    }
    return;
  }
});

// ===== Reproductor de música local (IndexedDB) =====
function idbOpen() {
  return new Promise((res, rej) => {
    const r = indexedDB.open("fitnutri-music", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("songs", { keyPath: "name" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
function idbAll() {
  return idbOpen().then(db => new Promise((res, rej) => {
    const g = db.transaction("songs").objectStore("songs").getAll();
    g.onsuccess = () => res(g.result || []);
    g.onerror = () => rej(g.error);
  }));
}
function idbPut(song) {
  return idbOpen().then(db => new Promise((res, rej) => {
    const t = db.transaction("songs", "readwrite");
    t.objectStore("songs").put(song);
    t.oncomplete = res; t.onerror = () => rej(t.error);
  }));
}
function idbDel(name) {
  return idbOpen().then(db => new Promise((res, rej) => {
    const t = db.transaction("songs", "readwrite");
    t.objectStore("songs").delete(name);
    t.oncomplete = res; t.onerror = () => rej(t.error);
  }));
}

const audio = new Audio();
let musicList = [], musicIdx = -1, musicURL = null;
const fmtSize = (b) => b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.round(b / 1024) + " KB";

async function renderMusic() {
  musicList = await idbAll().catch(() => []);
  const box = $("#music-list");
  if (!musicList.length) {
    box.innerHTML = '<p class="hint">🎵 No hay música todavía. Toca el botón de arriba e incluye los archivos de audio.</p>';
    return;
  }
  box.innerHTML = musicList.map((s, i) => `
    <div class="item ${i === musicIdx ? "done" : ""}">
      <span class="check" data-play-song="${i}" style="cursor:pointer">${i === musicIdx ? "🎵" : "▶"}</span>
      <div style="flex:1">
        <div class="item-title">${s.name.replace(/\.[^.]+$/, "")}</div>
        <div class="item-sub">${fmtSize(s.size)} · ${s.added || ""}</div>
      </div>
      <div class="item-meta"><button class="ghost-btn" style="width:auto;margin:0;padding:6px 10px" data-del-song="${i}">✕</button></div>
    </div>`).join("");
}
async function playSong(i) {
  if (i < 0 || i >= musicList.length) return;
  const s = musicList[i];
  const full = await idbAll().then(all => all.find(x => x.name === s.name));
  if (!full) return;
  if (musicURL) URL.revokeObjectURL(musicURL);
  musicURL = URL.createObjectURL(full.blob);
  audio.src = musicURL;
  musicIdx = i;
  $("#player-bar").style.display = "block";
  $("#np-title").textContent = s.name.replace(/\.[^.]+$/, "");
  $("#np-size").textContent = fmtSize(s.size);
  $("#np-play").textContent = "⏸";
  audio.play().catch(() => {});
  renderMusic();
}
function pauseSong() {
  audio.pause();
  $("#np-play").textContent = "▶";
}
audio.addEventListener("ended", () => { if (musicIdx < musicList.length - 1) playSong(musicIdx + 1); else { musicIdx = -1; renderMusic(); } });
audio.addEventListener("timeupdate", () => {
  if (audio.duration) $("#np-seek").value = Math.round(audio.currentTime / audio.duration * 1000);
});
audio.addEventListener("play", () => { $("#np-play").textContent = "⏸"; });
audio.addEventListener("pause", () => { $("#np-play").textContent = "▶"; });
$("#np-play").addEventListener("click", () => audio.paused ? audio.play() : audio.pause());
$("#np-prev").addEventListener("click", () => playSong((musicIdx - 1 + musicList.length) % musicList.length));
$("#np-next").addEventListener("click", () => playSong((musicIdx + 1) % musicList.length));
$("#np-seek").addEventListener("input", (e) => { if (audio.duration) audio.currentTime = (+e.target.value / 1000) * audio.duration; });
$("#music-add").addEventListener("click", () => $("#music-input").click());
$("#music-input").addEventListener("change", async (e) => {
  for (const f of e.target.files) {
    if (!f.type.startsWith("audio/")) continue;
    await idbPut({ name: f.name, blob: f, size: f.size, added: new Date().toLocaleDateString("es") });
  }
  e.target.value = "";
  renderMusic();
});
document.addEventListener("click", (e) => {
  const ps = e.target.closest("[data-play-song]");
  if (ps) { playSong(+ps.dataset.playSong); return; }
  const ds = e.target.closest("[data-del-song]");
  if (ds) {
    const i = +ds.dataset.delSong;
    if (musicList[i]) idbDel(musicList[i].name).then(renderMusic);
    if (i === musicIdx) { audio.pause(); musicIdx = -1; $("#player-bar").style.display = "none"; }
  }
});

state.onboarded = state.onboarded || false;

// ===== Splash screen =====
// Duración mínima en pantalla para que se pueda leer la dedicatoria.
// ✏️ EDITABLE: Cuanto dura la pantalla de carga (en milisegundos)
const SPLASH_MS = 3800;
if (DEDICATORIAS.length) {
  $("#splash-quote").textContent = DEDICATORIAS[Math.floor(Math.random() * DEDICATORIAS.length)];
}
// Foto aleatoria del splash desde la carpeta /fondos (desenfocada vía CSS #splash-bg)
// serve.ps1 genera fondos/list.json con las imágenes de esa carpeta
let splashPhotos = null;
function showSplashPhoto() {
  if (!splashPhotos || !splashPhotos.length) return;
  const bg = $("#splash-bg");
  const sf = splashPhotos[Math.floor(Math.random() * splashPhotos.length)];
  bg.style.backgroundImage = `url("fondos/${encodeURIComponent(sf)}")`;
  bg.classList.add("on");
}
fetch("fondos/list.json").then(r => r.ok ? r.json() : []).then(list => {
  splashPhotos = (list || []).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));
  showSplashPhoto();
}).catch(() => {});

// Fondos de pantalla aleatorios de la app desde /wallpapers (una por sesión)
let appWallpapers = null, appWallpaperIdx = -1;
function applyAppWallpaper() {
  const b = document.body;
  b.style.backgroundImage = "";
  b.style.backgroundAttachment = "";
  b.style.backgroundSize = "";
  b.style.backgroundBlendMode = "";
  b.style.animation = "";
  // Solo con tema legible sobre foto: fondo de color o modo oscuro
  const darkish = state.theme === "dark" || !!state.wallpaper;
  if (!darkish || !appWallpapers || !appWallpapers.length) return;
  if (appWallpaperIdx < 0) appWallpaperIdx = Math.floor(Math.random() * appWallpapers.length);
  b.style.backgroundImage = `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url("wallpapers/${encodeURIComponent(appWallpapers[appWallpaperIdx])}")`;
  b.style.backgroundAttachment = "fixed";
  b.style.backgroundSize = "cover";
  b.style.backgroundBlendMode = "normal";
  b.style.animation = "none";
}
fetch("wallpapers/list.json").then(r => r.ok ? r.json() : []).then(list => {
  appWallpapers = (list || []).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));
  applyAppWallpaper();
}).catch(() => {});
setTimeout(() => $("#splash").classList.add("hide"), SPLASH_MS);

// ===== Onboarding (primera vez) =====
// ✏️ EDITABLE: Pantallas de bienvenida que salen la primera vez que se abre la app
const ONBOARD_SLIDES = [
  { emoji: "🎯", title: "Bienvenida a FitNutri", text: "Tu compañero diario para comer mejor, moverme más y crear hábitos que sí se quedan." },
  { emoji: "✅", title: "Marca tu día", text: "Cada mañana verás tus comidas, ejercicios y hábitos. Márcalos al completarlos — es tan fácil como un toque." },
  { emoji: "📈", title: "Mira tu progreso", text: "Peso, calorías, rachas y logros se registran solos. Y hay una sección secreta 💌 solo para ti." },
];
let obIdx = 0;
function renderOnboard() {
  const s = ONBOARD_SLIDES[obIdx];
  $("#ob-emoji").textContent = s.emoji;
  $("#ob-title").textContent = s.title;
  $("#ob-text").textContent = s.text;
  $("#ob-dots").innerHTML = ONBOARD_SLIDES.map((_, i) => `<span class="${i === obIdx ? "on" : ""}"></span>`).join("");
  $("#ob-next").textContent = obIdx === ONBOARD_SLIDES.length - 1 ? "¡Empezar! 🎉" : "Siguiente →";
}
function closeOnboard() {
  state.onboarded = true;
  save();
  $("#onboard").style.display = "none";
}
$("#ob-next").addEventListener("click", () => {
  if (obIdx < ONBOARD_SLIDES.length - 1) { obIdx++; renderOnboard(); }
  else closeOnboard();
});
$("#ob-skip").addEventListener("click", closeOnboard);
if (!state.onboarded) {
  setTimeout(() => { renderOnboard(); $("#onboard").style.display = "flex"; }, 1400);
}

// ===== Resumen semanal =====
function renderWeekSummary() {
  const box = $("#week-summary");
  const habits = allHabits();
  let perfect = 0, totalKcal = 0, daysWithData = 0, weightsInWeek = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.now() - i * 864e5);
    const k = PK() + "|" + d.toDateString();
    const day = state.days[k];
    if (!day) continue;
    daysWithData++;
    if (habits.length && habits.every(h => day.habits[h.id])) perfect++;
    totalKcal += day.entries.reduce((a, e) => a + e.kcal, 0);
  }
  const ws = weightsOf();
  const cutoff = Date.now() - 7 * 864e5;
  const recent = ws.filter(w => new Date(w.date).getTime() >= cutoff);
  let wDelta = "";
  if (recent.length >= 1 && ws.length >= 2) {
    const first = ws[0], last = ws[ws.length - 1];
    if (new Date(first.date).getTime() >= cutoff - 864e5 || recent.length) {
      wDelta = ` · ⚖️ ${last.kg} kg`;
    }
  }
  const goal = macrosOf() ? macrosOf().kcal : null;
  box.innerHTML = `
    <div class="week-stat"><span class="big">${perfect}/7</span><span class="lbl">días perfectos</span></div>
    <div class="week-stat"><span class="big">${totalKcal.toLocaleString("es")}</span><span class="lbl">kcal en 7 días</span></div>
    <div class="week-stat"><span class="big">${goal ? Math.round(totalKcal / 7) : "—"}</span><span class="lbl">kcal/día media${goal ? ` (meta ${goal})` : ""}</span></div>
    <div class="week-stat"><span class="big">${state.racha}🔥</span><span class="lbl">racha actual${wDelta}</span></div>`;
}

// ===== Init =====
$("#food-options").innerHTML = FOODS.map(f => `<option value="${f.n}"></option>`).join("");
applyTheme();
renderPlanForm();
renderProfiles();
renderFasting();
renderCafSugar();
$("#water-goal").value = state.waterGoal;
if (state.profile && macrosOf()) calcPlan();
maybeAdjustKcal();
if (state.profile && macrosOf()) calcPlan();
renderAll();
resetTimer();
checkAchievements();
renderAchievements();
renderDashboard();
