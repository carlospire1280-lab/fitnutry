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
  lunes:     [{ t: "Glúteos + Cuádriceps + Core", d: "Marcha o trote suave", m: "2 minutos." }, { t: "Círculos de cadera", d: "10 repeticiones por lado", m: "2 minutos." }, { t: "Círculos de tobillo:", d: "10 repeticiones por lado.", m: "5 minutos." }, { t: "Sentadillas sin peso", d: "2 series × 10 repeticiones", m: "5 minutos." }, { t: "Puente de glúteos", d: "2 series × 12 repeticiones", m: "5 minutos." }, { t: "Caminata lateral con banda", d: "2 series × 10 pasos por lado", m: "5 minutos." }, { h: "Bloque de fuerza" }, { t: "Sentadilla", d: "3 × 8–12 repeticiones (descanso: 90 s). Cuando 12 repeticiones sean fáciles con técnica perfecta, añade dificultad.", m: "5 minutos." }, { t: "Sentadilla búlgara", d: "3 × 8–10 repeticiones por pierna (descanso: 90 s).", m: "5 minutos." }, { t: "Hip thrust / puente de glúteos: ", d: "3 × 12–15 repeticiones (descanso: 75 s). Lleva la última serie casi al fallo técnico.", m: "5 minutos." }, { t: "Caminata lateral con banda: ", d: "3 × 15–20 pasos por lado (descanso: 45 s). Lleva la última serie al fallo técnico.", m: "5 minutos." }, { t: "Elevaciones de pantorrilla", d: "• 3 × 15–20 repeticiones (descanso: 45 s).", m: "5 minutos." },{ h: "Bloque de core" }, { t: "Dead bug:", d: "3 × 8–12 repeticiones por lado.", m: "2 minutos." }, { t: "Plancha", d: "3 × 20–40 segundos (manteniendo la postura firme sin arquear la espalda).", m: "2 minutos." }, ],
  martes:    [{h: "Espalda" }, { t: "Remo con banda", d: "3 × 10–15 repeticiones (descanso: 75 s).", m: "—" }, { t: "Remo invertido", d: "3 × 6–12 repeticiones (solo con superficie estable; si no, remo con banda 4 × 10–15).", m: "—" }, {h: "Brazos y hombros" }, { t: "Flexiones", d: "3 × 6–12 repeticiones (inclinadas si hace falta, 1–2 en reserva).", m: "—" }, { t: "Elevaciones laterales", d: "3 × 12–20 repeticiones con banda o mancuernas (última serie cerca del fallo).", m: "—" }, { t: "Curl de bíceps", d: "3 × 10–15 repeticiones.", m: "—" }, { t: "Extensión de tríceps con banda", d: "3 × 10–15 repeticiones.", m: "—" }, { t: "Pájaros / reverse fly", d: "3 × 12–20 repeticiones.", m: "—" }, {h: "Bloque final" }, { t: "Movilidad", d: "10 min de movilidad de hombros y estiramiento suave de espalda/pecho. Descanso 45–60 s entre accesorios.", m: "10 min" }],
  miercoles: [{h: "Fuerza — Glúteos y femorales" }, { t: "Peso muerto rumano", d: "3 × 10–12 repeticiones con mochila, mancuernas o banda (descanso: 90 s).", m: "—" }, { t: "Hip thrust", d: "3 × 10–15 repeticiones (descanso: 75–90 s).", m: "—" }, { t: "Zancada hacia atrás", d: "3 × 10 repeticiones por pierna (descanso: 75 s).", m: "—" }, { t: "Curl femoral con banda", d: "3 × 12–15 repeticiones (descanso: 60 s).", m: "—" }, { t: "Abducción de cadera con banda", d: "3 × 15–25 repeticiones (última serie al fallo técnico).", m: "—" }, {h: "Cardio" }, { t: "Cardio moderado", d: "15–20 min a ritmo que permita hablar entrecortadamente: caminar rápido, bailar, bicicleta, trote suave o cuerda.", m: "15–20 min" }],
  jueves:    [{h: "Tren superior" }, { t: "Remo con banda (espalda)", d: "3 × 12–15 repeticiones.", m: "—" }, { t: "Pullover con banda", d: "3 × 10–15 repeticiones.", m: "—" }, { t: "Flexiones (pecho)", d: "3 × 6–12 repeticiones.", m: "—" }, { t: "Elevaciones laterales (hombros)", d: "3 × 15–20 repeticiones.", m: "—" }, { t: "Press de hombro", d: "2–3 × 8–12 repeticiones con mancuernas o banda.", m: "—" }, { t: "Curl de bíceps", d: "3 × 10–15 repeticiones.", m: "—" }, { t: "Tríceps con banda", d: "3 × 10–15 repeticiones.", m: "—" }, {h: "Core" }, { t: "Elevaciones de rodillas", d: "3 × 8–15 repeticiones.", m: "—" }, { t: "Plancha lateral", d: "3 × 20–40 segundos por lado.", m: "—" }, { t: "Bird dog", d: "2 × 10 repeticiones por lado.", m: "—" }],
  viernes:   [{h: "Piernas y glúteos" }, { t: "Sentadilla", d: "3 × 10–12 repeticiones.", m: "—" }, { t: "Sentadilla búlgara", d: "3 × 8–12 repeticiones por pierna.", m: "—" }, { t: "Peso muerto rumano", d: "3 × 10–12 repeticiones.", m: "—" }, { t: "Hip thrust", d: "3 × 12–15 repeticiones.", m: "—" }, { t: "Abducción con banda", d: "3 × 20 repeticiones.", m: "—" }, { t: "Elevación de pantorrillas", d: "3 × 15–20 repeticiones.", m: "—" }, {h: "Potencia" }, { t: "Jump squats", d: "2 × 5–8 repeticiones explosivas y limpias; detente cuando baje la potencia.", m: "—" }],
  sabado:    [{h: "Circuito — 3 rondas" }, { t: "Sentadilla", d: "12 repeticiones.", m: "—" }, { t: "Flexiones", d: "8–12 repeticiones.", m: "—" }, { t: "Remo con banda", d: "12 repeticiones.", m: "—" }, { t: "Zancada atrás", d: "10 repeticiones por pierna.", m: "—" }, { t: "Puente de glúteo", d: "15 repeticiones.", m: "—" }, { t: "Dead bug", d: "10 repeticiones por lado.", m: "—" }, { t: "Descansos", d: "20–30 s entre ejercicios · 2 min al terminar cada ronda.", m: "—" }, {h: "Movilidad y flexibilidad" }, { t: "Estiramiento", d: "25–30 min: isquiotibiales, caderas, aductores, glúteos, tobillos, hombros y espalda. Practica aperturas de pierna progresivas sin forzar.", m: "25–30 min" }],
  domingo:   [{ t: "Descanso", d: "Descanso completo: sin entrenamiento ni compensar el día. Camina tranquilo y recupera — la recuperación construye músculo.", m: "—" }],
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
  // ===== Tanda 1 =====
  { name: "Tortitas de avena y claras", meta: "~380 kcal · 30g prot · 10 min", ing: ["60g avena", "150ml claras de huevo", "1 plátano", "Canela", "100g yogur griego"], steps: ["Tritura avena, claras, plátano y canela hasta masa homogénea.", "Cocina porciones 1–2 min por lado en sartén antiadherente.", "Sirve con yogur encima."] },
  { name: "Huevos revueltos con aguacate", meta: "~420 kcal · 30g prot · 10 min", ing: ["2 huevos", "100ml claras", "2 rebanadas pan integral", "½ aguacate", "Tomate y especias"], steps: ["Cuece huevos y claras a fuego medio removiendo.", "Tuesta el pan y monta con aguacate, tomate y huevos."] },
  { name: "Bowl de yogur, avena y fruta", meta: "~320 kcal · 25g prot · 5 min", ing: ["250g yogur griego", "50g avena", "Fruta de temporada", "15g frutos secos", "Canela"], steps: ["Pon el yogur en un bol y añade la avena.", "Distribuye la fruta, frutos secos y canela."] },
  { name: "Tostadas con requesón y plátano", meta: "~350 kcal · 25g prot · 5 min", ing: ["2 rebanadas pan integral", "150g requesón", "1 plátano pequeño", "Canela"], steps: ["Tuesta el pan.", "Reparte el requesón, añade plátano en rodajas y canela."] },
  { name: "Batido de avena y frutos rojos", meta: "~380 kcal · 38g prot · 5 min", ing: ["250ml leche", "40g avena", "100g frutos rojos", "30g proteína en polvo", "1 plátano pequeño"], steps: ["Licúa todo hasta textura homogénea.", "Añade más leche si lo quieres más líquido."] },
  { name: "Arroz integral con pollo", meta: "~600 kcal · 42g prot · 25 min", ing: ["80g arroz integral", "150g pechuga de pollo", "150–200g verduras", "Aceite de oliva", "Especias"], steps: ["Cuece el arroz según el envase.", "Saltea el pollo en dados con las verduras.", "Mezcla con el arroz y condimenta."] },
  { name: "Pasta integral con atún", meta: "~550 kcal · 38g prot · 20 min", ing: ["90g pasta integral", "1 lata grande de atún", "150g tomate triturado", "Cebolla", "Aceite de oliva"], steps: ["Cuece la pasta.", "Sofríe la cebolla, añade el tomate y cocina unos minutos.", "Añade el atún escurrido y mezcla con la pasta."] },
  { name: "Lentejas estofadas con arroz", meta: "~450 kcal · 22g prot · 30 min", ing: ["200g lentejas cocidas", "60g arroz", "Zanahoria, cebolla, pimiento, tomate", "Aceite de oliva"], steps: ["Sofríe las verduras troceadas.", "Añade lentejas y un poco de agua o caldo; cocina unos minutos.", "Sirve con el arroz cocido."] },
  { name: "Bowl de quinoa, garbanzos y pollo", meta: "~580 kcal · 42g prot · 25 min", ing: ["70g quinoa", "100g garbanzos cocidos", "120g pechuga de pollo", "Tomate, pepino, zanahoria", "Aceite de oliva"], steps: ["Cuece la quinoa y deja templar.", "Cocina el pollo a la plancha y córtalo en tiras.", "Mezcla todo en un bol con aceite y especias."] },
  { name: "Salmón al horno con patata", meta: "~620 kcal · 35g prot · 30 min", ing: ["150g salmón", "250g patata", "150g brócoli", "Limón", "Aceite de oliva"], steps: ["Hornea la patata hasta que empiece a estar tierna.", "Añade salmón y brócoli; hornea hasta que el pescado esté hecho.", "Sirve con limón y especias. Si el salmón está caro, cambia por merluza o tilapia."] },
  // ===== Tanda 1 (cenas y snacks) =====
  { name: "Wrap de pavo y verduras", meta: "~480 kcal · 38g prot · 15 min", ing: ["2 tortillas integrales", "150g pechuga de pavo", "Lechuga, tomate, zanahoria", "50g aguacate", "Yogur natural para salsa"], steps: ["Calienta las tortillas.", "Cocina el pavo a la plancha y córtalo en tiras.", "Mezcla el yogur con especias para la salsa.", "Rellena las tortillas con todo."] },
  { name: "Tortilla de claras con espinacas", meta: "~320 kcal · 30g prot · 12 min", ing: ["1 huevo", "150ml claras", "100g espinacas", "60g queso fresco"], steps: ["Saltea las espinacas unos minutos.", "Añade huevo y claras batidas; cocina hasta cuajar.", "Incorpora el queso fresco antes de doblar."] },
  { name: "Merluza al horno con verduras", meta: "~500 kcal · 38g prot · 30 min", ing: ["180g merluza", "Calabacín, pimiento, cebolla", "200g patata", "Aceite de oliva"], steps: ["Hornea primero las verduras y la patata.", "Añade la merluza y continúa hasta que esté hecha."] },
  { name: "Ensalada de pollo, huevo y legumbres", meta: "~480 kcal · 38g prot · 15 min", ing: ["100g pollo", "1 huevo", "100g garbanzos cocidos", "Tomate, lechuga, pepino", "Aceite de oliva"], steps: ["Cocina el pollo a la plancha y el huevo hasta cuajar.", "Corta ambos y mezcla con garbanzos y verduras.", "Aliña al gusto."] },
  { name: "Revuelto de tofu con verduras", meta: "~380 kcal · 27g prot · 15 min", ing: ["200g tofu firme", "Pimiento, cebolla, calabacín", "Cúrcuma y pimienta", "Aceite de oliva"], steps: ["Desmenuza el tofu con un tenedor.", "Saltea las verduras hasta que estén tiernas.", "Incorpora tofu y especias; cocina mezclando."] },
  { name: "Crema de verduras con pollo", meta: "~480 kcal · 38g prot · 25 min", ing: ["150g pechuga de pollo", "200g calabacín", "100g patata", "Zanahoria, cebolla", "Aceite de oliva"], steps: ["Cuece las verduras y tritúralas hasta crema.", "Cocina el pollo a la plancha y sírvelo con la crema."] },
  { name: "Yogur griego con frutos secos y miel", meta: "~280 kcal · 22g prot · 5 min", ing: ["250g yogur griego", "20g frutos secos", "10–15g miel"], steps: ["Sirve el yogur en un bol.", "Añade frutos secos troceados y la miel."] },
  { name: "Tortitas de arroz con queso y pavo", meta: "~320 kcal · 28g prot · 5 min", ing: ["4 tortitas de arroz", "100g queso fresco", "80g pechuga de pavo"], steps: ["Reparte el queso fresco sobre las tortitas.", "Coloca el pavo encima."] },
  { name: "Fruta con crema de cacahuete", meta: "~220 kcal · 9g prot · 3 min", ing: ["1 manzana o 1 plátano", "1–2 cucharadas de crema de cacahuete natural"], steps: ["Corta la fruta.", "Acompaña con la crema de cacahuete."] },
  { name: "Huevo duro con fruta", meta: "~180 kcal · 13g prot · 12 min", ing: ["2 huevos", "1 pieza de fruta"], steps: ["Cuece los huevos 10–12 minutos.", "Enfría, pela y sirve con la fruta. Se pueden preparar con antelación."] },
  // ===== Tanda 2 =====
  { name: "Bowl de pasta con atún y guisantes", meta: "~520 kcal · 48g prot · 15 min · ~3$", ing: ["2 latas de atún escurrido", "300g pasta cocida", "75g guisantes congelados", "Aceite de oliva", "Zumo de limón"], steps: ["Cuece la pasta y añade los guisantes los últimos 2 minutos.", "Escurre y mezcla con aceite, atún y limón.", "Sazona al gusto. Rinde 2 raciones."] },
  { name: "Salteado de muslos de pollo", meta: "~560 kcal · 45g prot · 20 min · ~4$", ing: ["225g muslos de pollo en cubos", "300g verduras congeladas", "2 cucharadas salsa de soja", "150g arroz cocido", "Aceite"], steps: ["Cocina el pollo en el aceite hasta que esté hecho.", "Añade verduras y salsa de soja; saltea todo.", "Sirve sobre el arroz."] },
  { name: "Lentejas guisadas con verduras", meta: "~400 kcal · 17g prot · 40 min", ing: ["Lentejas secas", "Zanahoria, patata, cebolla, pimiento", "Espinacas", "Pimentón", "Caldo o agua"], steps: ["Sofríe cebolla, pimiento y zanahoria.", "Añade lentejas, pimentón, patata y caldo.", "Cuece 35–40 min hasta que estén tiernas. Rinde varias raciones."] },
  { name: "Garbanzos salteados con espinacas", meta: "~380 kcal · 15g prot · 15 min", ing: ["Garbanzos cocidos escurridos", "Espinacas", "Ajo", "Pimentón", "Aceite de oliva"], steps: ["Saltea el ajo laminado, añade garbanzos y pimentón.", "Incorpora las espinacas hasta que reduzcan."] },
  { name: "Muslos de pollo al horno con patatas", meta: "~600 kcal · 38g prot · 40 min", ing: ["Muslos de pollo económicos", "Patatas en cubos", "Guisantes congelados", "Aceite", "Sal, pimienta y especias"], steps: ["Coloca todo en una bandeja y condimenta.", "Hornea a 200°C hasta que el pollo esté dorado y las patatas tiernas."] },
  { name: "Pasta al horno con atún", meta: "~540 kcal · 38g prot · 25 min", ing: ["Pasta cocida", "Atún escurrido", "Maíz dulce", "Tomate triturado", "Queso rallado"], steps: ["Mezcla la pasta con atún, maíz y tomate.", "Pon en fuente, cubre con queso y gratina hasta fundir."] },
  { name: "Ensalada de garbanzos, atún y tomate", meta: "~420 kcal · 32g prot · 10 min", ing: ["Garbanzos cocidos", "1 lata de atún", "Tomate en cubos", "Cebolla", "Aceite de oliva y limón"], steps: ["Mezcla todo en un bol.", "Aliña justo antes de comer."] },
  { name: "Ensalada de atún, huevo y garbanzos", meta: "~460 kcal · 32g prot · 15 min · <5$", ing: ["1 lata de atún", "2 huevos cocidos", "Lechuga, tomate", "½ aguacate", "½ taza garbanzos", "Aderezo: yogur + limón"], steps: ["Cuece los huevos 9–10 minutos, enfría y corta.", "Pon la lechuga de base y añade el resto.", "Mezcla yogur con limón y aliña al final."] },
  { name: "Tinga de atún rápida", meta: "~400 kcal · 35g prot · 15 min", ing: ["Atún en lata", "Tomates", "Cebolla, ajo", "Chipotle al gusto", "Aceite"], steps: ["Licúa tomate, cebolla, ajo y chipotle.", "Cuece la salsa hasta que espese.", "Añade el atún y cocina 5 minutos más. Sirve con arroz o tostadas."] },
  { name: "Hamburguesas de atún y papa", meta: "~380 kcal · 11g prot c/u · 20 min", ing: ["2 latas de atún", "2 papas hervidas", "2 huevos", "Cebollita de verdeo", "Pan rallado o avena", "Sal y pimienta"], steps: ["Mezcla todo hasta obtener masa moldeable.", "Forma hamburguesas y fríe 4–5 min por lado u hornea a 200°C 10–12 min. Rinde 6."] },
  { name: "Pollo a la mostaza al horno", meta: "~580 kcal · 45g prot · 45 min · 4 porciones", ing: ["1 kg de pollo (muslo o pechuga)", "4 papas medianas", "3 cucharadas de mostaza", "2 cucharadas de aceite", "Sal y pimienta"], steps: ["Mezcla mostaza con aceite y cubre el pollo.", "Corta las papas y coloca todo en una fuente.", "Hornea a 200°C durante 45 minutos."] },
  { name: "Curry de lentejas", meta: "~450 kcal · 18g prot · 35 min", ing: ["Lentejas", "Cebolla, ajo, tomate", "Curry en polvo", "Leche de coco o evaporada", "Arroz para acompañar"], steps: ["Sofríe cebolla y ajo, añade curry y tomate.", "Incorpora las lentejas y cubre con agua o caldo.", "Cuece hasta que estén tiernas. Sirve con arroz."] },
  { name: "Pasta integral con lenteja roja", meta: "~520 kcal · 25g prot · 25 min", ing: ["Pasta integral", "Lenteja roja", "Salsa de tomate", "Cebolla, ajo", "Aceite de oliva"], steps: ["Sofríe cebolla y ajo, añade la salsa de tomate.", "Incorpora la lenteja roja y cocina hasta que espese.", "Mezcla con la pasta cocida."] },
  { name: "Revuelto de huevos con arroz", meta: "~480 kcal · 25g prot · 12 min", ing: ["2–3 huevos", "Arroz integral cocido", "Salsa de soja", "Verduras"], steps: ["Saltea las verduras, añade arroz y soja.", "Incorpora los huevos batidos y remueve hasta cuajar."] },
  { name: "Guiso de garbanzos con bacalao", meta: "~480 kcal · 35g prot · 40 min", ing: ["Garbanzos cocidos", "Espinacas", "Bacalao desalado o costilla económica", "Cebolla, ajo, pimentón", "Aceite"], steps: ["Sofríe cebolla y ajo, añade pimentón y garbanzos.", "Incorpora espinacas y el bacalao o carne.", "Deja cocinar hasta integrar. Rinde mucho."] },
  { name: "Tortilla de dos huevos con espinaca", meta: "~250 kcal · 15g prot · 10 min · <1€", ing: ["2 huevos", "Espinacas frescas o congeladas", "Sal", "Aceite"], steps: ["Saltea las espinacas.", "Añade los huevos batidos y cuaja la tortilla."] },
  { name: "Bol de arroz con pollo desmenuzado", meta: "~560 kcal · 40g prot · 15 min", ing: ["Arroz cocido", "Pollo desmenuzado (muslo)", "Verduras salteadas", "Especias"], steps: ["Mezcla el arroz con el pollo y las verduras.", "Ideal para meal prep: prepara el pollo en cantidad y congela porciones."] },
  { name: "Ensalada templada de garbanzos", meta: "~420 kcal · 20g prot · 15 min", ing: ["Garbanzos cocidos", "Cebolla, tomate, pimiento", "2 huevos cocidos", "Aceite de oliva y vinagre"], steps: ["Saltea ligeramente las verduras y mezcla con garbanzos.", "Añade el huevo cocido en trozos y aliña."] },
  { name: "Salteado de arroz con arvejas y huevo", meta: "~480 kcal · 22g prot · 12 min", ing: ["Arroz cocido", "Arvejas congeladas", "2 huevos", "Cebolla", "Salsa de soja"], steps: ["Saltea cebolla y arvejas, añade arroz y soja.", "Incorpora los huevos y remueve hasta cuajar."] },
  { name: "Batch cooking de muslos especiados", meta: "~base para varias comidas", ing: ["Muslos o contramuslos sin piel", "Pimentón, ajo en polvo, comino, orégano", "Aceite"], steps: ["Mezcla las especias con el aceite y cubre el pollo.", "Ásalo al horno o cocínalo en sartén en grandes cantidades.", "Guarda en tuppers y combínalo con arroz, patata o ensalada."] },
  // ===== Tanda 3 (41–60) =====
  { name: "Rollos de apio con atún", meta: "~280 kcal · 32g prot · 10 min", ing: ["4 tallos de apio", "1 lata de atún", "2 cucharadas cebollín", "1 zanahoria rallada", "1 cucharada yogur (opcional)"], steps: ["Corta los apios en trozos de 5 cm.", "Mezcla el atún con cebollín, zanahoria y yogur.", "Rellena los tallos y guarda en frío."] },
  { name: "\"Snickers\" de dátiles con proteína", meta: "~postre fit", ing: ["1½ tazas leche de avena", "2 cucharadas maicena", "¼ taza cacao", "½ taza pasta de dátiles", "Mantequilla de maní y cacahuates"], steps: ["Cuece la mezcla de la cubierta a fuego lento hasta que espese.", "Abre los dátiles, rellena con mantequilla de maní y cacahuates.", "Cubre con chocolate y congela 30 min."] },
  { name: "Barritas de proteína de 3 ingredientes", meta: "~8-9g prot c/u", ing: ["1 taza soja texturizada", "½ taza mantequilla de cacahuete", "2-3 cucharadas cacao", "¼ taza leche vegetal"], steps: ["Tritura la soja hasta casi harina.", "Mezcla con cacao y mantequilla hasta masa densa.", "Compacta en molde, refrigera 1 hora y corta."] },
  { name: "Batido de crema de cacahuete y plátano", meta: "~380 kcal · 18g prot · 5 min", ing: ["1 plátano maduro", "2 cucharadas crema de cacahuete", "200ml leche", "1 cucharada chía o lino"], steps: ["Licúa todo hasta homogeneizar.", "Añade hielo si lo quieres frío."] },
  { name: "Batido de yogur y frutos rojos", meta: "~220 kcal · 16g prot · 5 min", ing: ["150g yogur griego", "100g frutos rojos congelados", "100ml agua o leche", "1 cucharada miel o dátil"], steps: ["Bate todo hasta que no queden trozos."] },
  { name: "Tortilla dulce de plátano y huevo", meta: "~180 kcal · 8g prot · 10 min", ing: ["1 huevo", "1 plátano maduro", "Opcional: avena, edulcorante o chips"], steps: ["Pisa el plátano e incorpora el huevo.", "Cocina como tortilla vuelta y vuelta."] },
  { name: "Sándwich proteico de huevo", meta: "~400 kcal · 19g prot · 12 min", ing: ["2 rebanadas pan integral", "2 huevos", "Yogur o mayonesa ligera", "Espinacas, tomate", "Opcional: aguacate o pavo"], steps: ["Cocina los huevos al gusto.", "Tuesta el pan y monta con rellenos.", "Cierra y corta por la mitad."] },
  { name: "Tostadas proteicas de avena y queso", meta: "~13-15g prot · rinde 4 · horno", ing: ["100g avena", "2 huevos", "80g queso rallado", "1 cucharadita polvo de hornear", "Sal y especias"], steps: ["Precalienta a 180°C.", "Mezcla todo hasta masa homogénea.", "Forma tostadas y hornea 12–15 min hasta dorar."] },
  { name: "Corteza proteica de chocolate y cacahuete", meta: "~10g prot c/u", ing: ["½ taza harina de almendra", "½ taza proteína vainilla", "¼ taza mantequilla de maní", "8-10 cucharaditas leche de almendras", "¼ taza jarabe de arce", "3 cucharadas chocolate negro"], steps: ["Mezcla mantequilla, leche y sirope.", "Añade almendra y proteína hasta masa.", "Extiende en molde, cubre con chocolate y congela 10 min."] },
  { name: "Muffins de huevo y verduras", meta: "~9g prot c/u · rinde varios", ing: ["4 huevos", "½ taza espinacas picadas", "½ taza pimiento o calabacín", "Sal y pimienta", "Opcional: queso rallado"], steps: ["Precalienta a 180°C.", "Bate los huevos con las verduras.", "Reparte en molde de muffins y hornea 15–20 min."] },
  { name: "Licuado de avena y café", meta: "~9g prot · 5 min", ing: ["1 taza leche", "½ taza avena", "1 cucharada café soluble", "Endulzante", "Canela"], steps: ["Licúa todo hasta integrar la avena.", "Sirve frío o con hielo."] },
  { name: "Barritas crujientes de proteína", meta: "~14g prot c/u · sin horno", ing: ["1 taza chips de chocolate negro", "2 cucharaditas aceite de coco", "2 tazas bocaditos de proteína de soja", "¼ taza mantequilla de cacahuete"], steps: ["Derrite el chocolate con el aceite.", "Mezcla con bocaditos y mantequilla.", "Extiende en molde y refrigera hasta solidificar."] },
  { name: "Batido de chocolate y plátano", meta: "~12g prot · 5 min", ing: ["1 plátano", "200ml leche o yogur", "1 cucharada cacao puro", "Opcional: proteína o leche en polvo"], steps: ["Bate todo hasta crema homogénea."] },
  { name: "Yogur griego con avena y canela", meta: "~22g prot · 5 min", ing: ["250g yogur griego", "40g avena", "Canela"], steps: ["Mezcla el yogur con la avena.", "Espolvorea canela. Deja reposar para que la avena se ablande."] },
  { name: "Batido de avena, cacao y plátano", meta: "~13g prot · alto en kcal · 5 min", ing: ["1 plátano", "40g avena", "1 cucharada cacao puro", "250ml leche", "Hielo"], steps: ["Licúa todo hasta textura cremosa.", "Añade más leche si queda espeso."] },
  { name: "Muffins proteicos de plátano y avena", meta: "~7g prot c/u · batch cooking", ing: ["2 plátanos maduros", "2 huevos", "1 taza avena", "1 cucharadita polvo de hornear", "Opcional: proteína o miel"], steps: ["Machaca los plátanos y mezcla con los huevos.", "Añade avena e impulsor.", "Hornea en molde de muffins a 180°C, 15–20 min."] },
  { name: "Licuado de leche en polvo, avena y plátano", meta: "~16g prot · sin suplementos · 5 min", ing: ["2 cucharadas leche en polvo", "3 cucharadas avena", "1 plátano", "250ml agua o leche"], steps: ["Bate todo hasta integrar. La leche en polvo sube la proteína barato."] },
  { name: "Revuelto de claras con espinaca y champiñones", meta: "~27g prot · bajo en carbos · 10 min", ing: ["150ml claras (o 3 claras)", "1 huevo entero", "100g espinacas", "½ taza champiñones", "Sal, pimienta, aceite"], steps: ["Saltea champiñones y espinacas.", "Añade claras y huevo batidos; remueve hasta cuajar."] },
  // ===== Tanda 4 (61–80) =====
  { name: "Chili de lentejas y pavo", meta: "~52g prot · ~3.5$ · rinde 4", ing: ["225g carne picada de pavo", "200g lentejas secas", "1 lata tomate troceado", "2 cucharadas chile en polvo", "1 litro agua o caldo"], steps: ["Dora el pavo.", "Añade lentejas, tomate, agua y especias.", "Cuece a fuego lento 25–30 min hasta que estén tiernas."] },
  { name: "Burrito de huevo y frijoles", meta: "~32g prot · ~2$ · 10 min", ing: ["3 huevos revueltos", "90g frijoles negros", "1 tortilla grande", "2 cucharadas salsa", "30g queso"], steps: ["Revuelve los huevos y calienta los frijoles.", "Coloca todo en capas en la tortilla y enróllala.", "Opcional: dora el exterior en plancha."] },
  { name: "Ternera con arroz", meta: "~40g prot · ~4.5$ · 20 min", ing: ["170g carne picada de ternera", "150g arroz cocido", "150g verduras congeladas", "Salsa de soja", "Ajo y cebolla en polvo"], steps: ["Dora la carne y escurre la grasa si hace falta.", "Añade verduras y condimentos.", "Sirve sobre el arroz."] },
  { name: "Avena proteica de la noche anterior", meta: "~30g prot · ~1.5$ · prep nocturna", ing: ["50g copos de avena", "240ml leche", "120g yogur griego", "Opcional: proteína en polvo", "Fruta"], steps: ["Mezcla avena, leche, yogur y proteína en un tarro.", "Refrigera toda la noche y añade fruta por la mañana."] },
  { name: "Aguacate relleno de atún", meta: "~35g prot · ~4$ · 10 min", ing: ["2 latas de atún", "1 aguacate maduro", "2 cucharadas yogur griego", "Zumo de limón", "Sal, pimienta, eneldo"], steps: ["Mezcla el atún con yogur, limón y condimentos.", "Rellena las mitades de aguacate."] },
  { name: "Tortitas proteicas de requesón", meta: "~38g prot · ~2.5$ · rinde 4", ing: ["225g requesón", "2 huevos", "50g copos de avena", "½ cucharadita canela", "Sirope opcional"], steps: ["Tritura todo menos el sirope.", "Cocina como tortitas a fuego medio. Salen unas 4."] },
  { name: "Hamburguesas de lentejas y carne", meta: "~proteína mixta · económico", ing: ["250g carne picada magra", "1 taza lentejas cocidas", "1 cebolla", "Ajo, condimentos", "Pan rallado o avena"], steps: ["Procesa las lentejas con la cebolla y mezcla con la carne.", "Forma hamburguesas y cocina al horno o plancha."] },
  { name: "Tacos de garbanzos y huevo", meta: "~25g prot · rápido", ing: ["2 tortillas integrales", "1 taza garbanzos cocidos", "2 huevos", "Tomate, cebolla", "Queso untable o palta"], steps: ["Saltea los garbanzos con especias hasta dorar.", "Haz huevos revueltos aparte.", "Calienta las tortillas y rellena."] },
  { name: "Omelette de huevos con queso y espinaca", meta: "~28g prot · 10 min", ing: ["3 huevos", "Espinaca", "50g queso", "Sal, pimienta", "Aceite de oliva"], steps: ["Bate los huevos.", "Agrega espinaca salteada y queso en cubos.", "Cuece en sartén hasta dorar por ambos lados."] },
  { name: "Huevos revueltos con tomate y avena", meta: "~15g prot · desayuno rápido", ing: ["2 huevos", "1 tomate pequeño", "1 cucharada avena", "Cebolla picada", "Sal y orégano"], steps: ["Bate los huevos con tomate, avena y cebolla.", "Cuece en sartén removiendo hasta cuajar."] },
  { name: "Tortilla de huevo con papa rallada", meta: "~15g prot · económica", ing: ["2 huevos", "½ papa rallada", "1 cucharadita aceite", "Sal", "Cúrcuma"], steps: ["Mezcla huevos batidos con la papa y cúrcuma.", "Cuece como tortilla vuelta y vuelta."] },
  { name: "Bowl de huevo cocido con aguacate y atún", meta: "~30g prot · cena rápida", ing: ["2 huevos cocidos", "½ aguacate", "2 cucharadas atún", "Limón", "Sal y pimienta"], steps: ["Cuece los huevos 9–10 min, enfría y corta.", "Mezcla con aguacate y atún; aliña con limón."] },
  { name: "Pan de pollo y queso en licuadora", meta: "~40g prot · sin harinas · horno", ing: ["500g pechuga de pollo cruda", "3 huevos", "100g queso crema o rallado", "1 cucharadita polvo de hornear", "Sal, orégano, provenzal"], steps: ["Licúa el pollo con huevos y queso hasta pasta.", "Añade polvo y condimentos.", "Hornea a temperatura media 30–35 min hasta que salga limpio al pinchar."] },
  { name: "Nuggets caseros de pollo", meta: "~proteína · rinde varias comidas", ing: ["1.2kg supremas de pollo", "3 cucharadas yogur", "500g cereales triturados", "Pimienta, ajo en polvo, sal"], steps: ["Procesa el pollo en pasta y condimenta.", "Incorpora el yogur y forma nuggets.", "Pasa por cereales y cocina en freidora 20 min a 170°C u horno 30 min a 180°C."] },
  { name: "Pollo a la mostaza al horno con papas", meta: "~45g prot · 4 porciones · 45 min", ing: ["1 kg pollo (muslo o pechuga)", "4 papas medianas", "3 cucharadas mostaza", "2 cucharadas aceite", "Sal y pimienta"], steps: ["Mezcla mostaza con aceite y cubre el pollo.", "Corta las papas y coloca todo en fuente.", "Hornea a 200°C durante 45 minutos."] },
  { name: "Pollo a la parrilla con quinoa y vegetales", meta: "~40g prot · 25 min", ing: ["250g pechuga de pollo", "1 taza quinoa cocida", "Brócoli, 2 zanahorias", "Aceite de oliva", "Ajo, limón, curry, sal, pimienta"], steps: ["Cocina el pollo en tiras con aceite y especias.", "Añade la quinoa y mezcla.", "Cuece el brócoli y las zanahorias aparte; emplata con limón."] },
  { name: "Tinga de atún rápida", meta: "~35g prot · 15 min", ing: ["Atún en lata", "Tomates", "Cebolla, ajo", "Chipotle", "Aceite"], steps: ["Licúa tomate, cebolla, ajo y chipotle.", "Cuece la salsa hasta que espese.", "Añade el atún y cocina 5 min más. Sirve con arroz o tostadas."] },
  { name: "Ensalada de atún, huevo y vegetales", meta: "~30g prot · <5$ · 15 min", ing: ["1 lata atún", "2 huevos cocidos", "Lechuga, tomate", "½ aguacate", "Garbanzos opcional", "Aderezo: yogur + limón"], steps: ["Cuece los huevos, enfría y corta en cubos.", "Pon la lechuga de base y añade el resto.", "Aliña con la mezcla de yogur y limón."] },
  { name: "Alubias con arroz veganas", meta: "~27g prot · 4 raciones", ing: ["500g alubias", "Arroz", "2 hojas de laurel", "Aceite de oliva", "4 dientes de ajo", "Pimentón ahumado", "Perejil, hierbabuena, sal"], steps: ["Remoja las alubias la noche anterior.", "Cuécelas con laurel hasta tiernas.", "Haz sofrito de ajo y pimentón; mezcla con alubias y arroz."] },
  { name: "Estofado de lentejas", meta: "~21g prot · 4 raciones · se conserva 4 días", ing: ["300g lentejas secas", "Aceite de oliva", "Cebolla, zanahoria, pimiento rojo", "Ajo", "Tomate triturado y puré", "Pimentón, comino, laurel", "900ml agua o caldo", "Vinagre, sal, perejil"], steps: ["Sofríe las verduras.", "Añade ajo, especias, tomate, lentejas, laurel y agua.", "Cuece 25–30 min hasta que estén tiernas."] },
  // ===== Tanda 5 (81–100) =====
  { name: "Batido para ganar masa", meta: "~870 kcal · 52g prot · ~1.6$", ing: ["200ml leche entera", "1 plátano", "40g crema de cacahuate", "50g avena", "30g proteína o leche en polvo"], steps: ["Licúa todo hasta homogeneizar.", "Añade más leche si queda espeso."] },
  { name: "Panecillos proteicos en sartén", meta: "~5 min · ~1.8€/ración", ing: ["4 huevos", "100g harina de avena", "50g copos de avena", "Nueces picadas", "Aceite"], steps: ["Mezcla los huevos con la harina de avena.", "Pon un molde en sartén con aceite, añade nueces y copos.", "Vierte la mezcla, cocina 1 min, voltea y cocina 1 min más."] },
  { name: "Paneer Bhurji (requesón con vegetales)", meta: "~desayuno/cena vegetariana", ing: ["200g requesón desmenuzado", "½ cebolla, 1 tomate, ½ pimiento", "Jengibre y ajo", "Cúrcuma, comino, cilantro"], steps: ["Sofríe cebolla, jengibre y ajo.", "Añade tomate y pimiento hasta ablandar.", "Incorpora el requesón y las especias; cocina removiendo."] },
  { name: "Chana Masala con avena", meta: "~plato único económico", ing: ["1 taza garbanzos cocidos", "½ taza avena", "1 tomate triturado", "Cebolla, ajo, jengibre", "Garam masala, cúrcuma, comino", "Caldo o agua"], steps: ["Sofríe cebolla con ajo y jengibre.", "Añade tomate y especias.", "Incorpora garbanzos y avena con un poco de caldo; cuece 10–15 min."] },
  { name: "Empanadas proteicas de soja", meta: "~proteína vegetal · rinde varias", ing: ["1 taza soja texturizada", "2 tazas agua caliente", "Cebolla, morrón, ajo", "Puré de tomate", "Pimentón, comino, sal", "12 tapas de empanada"], steps: ["Hidrata la soja 10–15 min, escúrrela y presiónala.", "Prepara sofrito con cebolla, morrón y ajo.", "Añade soja, puré y especias; cocina 10 min.", "Rellena las tapas y hornea o fríe."] },
  { name: "Licuado de avena, maní y dátiles", meta: "~post-entreno · sin suplementos", ing: ["1 taza leche", "3 cucharadas avena", "1 cucharada mantequilla de maní", "2 dátiles", "1 cucharadita chía"], steps: ["Licúa todo hasta cremoso.", "Añade hielo al gusto."] },
  { name: "Barritas de proteína sin horno", meta: "~8 barritas", ing: ["1 taza avena", "½ taza mantequilla de maní", "¼ taza proteína o leche en polvo", "2 cucharadas miel", "2 cucharadas chips de chocolate"], steps: ["Mezcla todo hasta masa compacta.", "Extiende en molde y refrigera 1 hora.", "Corta en 8 barritas."] },
  { name: "Lentejas con pollo", meta: "~550 kcal · 45g prot · 30 min", ing: ["1 taza lentejas cocidas", "150g pollo (muslo)", "Zanahoria, cebolla, pimiento", "Especias", "Aceite"], steps: ["Cocina el pollo con las verduras.", "Añade lentejas y un poco de agua o caldo.", "Cuece hasta integrar todo."] },
  { name: "Gachas proteicas clásicas", meta: "~32g prot · 58g carbos · 5 min", ing: ["50g avena", "250ml leche", "1 cacito proteína vainilla", "1 plátano", "Canela"], steps: ["Cocina la avena con la leche 2–3 min.", "Añade la proteína y mezcla.", "Decora con plátano y canela."] },
  { name: "Gachas con claras de huevo", meta: "~35g prot · 4g grasa · económica", ing: ["50g avena", "200ml agua", "100ml claras de huevo", "1 manzana", "Canela"], steps: ["Cuece la avena en el agua 3–4 min.", "Añade las claras y remueve 1–2 min más.", "Mezcla con la manzana y canela."] },
  { name: "Pan proteico en sartén", meta: "~4 min · desayuno pre-entreno", ing: ["1 huevo", "3 cucharadas avena", "1 cucharada yogur griego", "½ cucharadita polvo de hornear", "Sal, aceite"], steps: ["Bate huevo con avena, yogur, sal y polvo.", "Vierte en sartén engrasada, tapa y cocina 2 min.", "Voltea y cocina 2 min más."] },
  { name: "Batido de plátano y cacao", meta: "~post-entreno · sin azúcar", ing: ["200ml leche", "½ plátano", "1 cucharada cacao puro", "Proteína o leche en polvo"], steps: ["Bate todo hasta homogeneizar."] },
  { name: "Batido de frutos rojos y avena", meta: "~saciante · económico", ing: ["200ml leche", "Frutos rojos", "2 cucharadas avena", "Proteína o yogur griego"], steps: ["Licúa todo hasta textura suave."] },
  { name: "Batido de café proteico", meta: "~mañanas / pre-entreno", ing: ["Café frío", "200ml leche", "1 cacito proteína", "Hielo"], steps: ["Bate café con leche, proteína y hielo hasta espumar."] },
  { name: "Batido verde proteico", meta: "~micronutrientes · 5 min", ing: ["200ml bebida vegetal", "1 cacito proteína", "½ plátano", "Espinacas", "½ manzana"], steps: ["Licúa todo hasta que no queden trozos de espinaca."] },
  { name: "Sándwich proteico de huevo y jamón", meta: "~desayuno completo", ing: ["2 rebanadas pan integral", "1 huevo", "2-3 fetas jamón magro", "1 zanahoria rallada", "½ chile (opcional)", "Sal, pimienta"], steps: ["Cocina el huevo revuelto o tortilla baja.", "Tuesta el pan y monta con todo.", "Cierra el sándwich."] },
  { name: "Panes proteicos sin harinas", meta: "~sin refinados · horno", ing: ["5 huevos", "2 tazas leche en polvo", "1 cucharada polvo de hornear", "Sal"], steps: ["Bate los huevos con la leche en polvo, polvo y sal.", "Reparte en molde de panecillos.", "Hornea a 180°C hasta dorados y firmes."] },
  { name: "Crepes proteicas con yogur", meta: "~desayuno/merienda · se guardan", ing: ["45g harina", "75g claras de huevo", "40ml leche", "200g yogur griego", "20g proteína cacao"], steps: ["Mezcla harina, claras y leche en masa líquida.", "Cuece crepes finas en sartén.", "Rellena con yogur y proteína."] },
  { name: "Hot cakes de plátano y avena", meta: "~dulce sin harinas · económico", ing: ["2 plátanos maduros", "2 huevos", "1 scoop proteína o leche en polvo", "½ taza avena molida", "Polvo de hornear, canela"], steps: ["Tritura plátanos con huevos.", "Añade proteína, avena, polvo y canela.", "Cuece porciones hasta que salgan burbujas y voltea."] },
  { name: "Arroz frito con huevo y verdura", meta: "~aprovechamiento · 12 min", ing: ["Arroz cocido del día anterior", "2 huevos", "Guisantes congelados", "Verduras al gusto", "Salsa de soja", "Aceite"], steps: ["Saltea las verduras con aceite.", "Añade arroz y salsa de soja.", "Incorpora los huevos batidos y remueve hasta cuajar."] },
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

// ===== Logros por hitos (se desbloquean acumulando) =====
function achievementStats() {
  const s = { days: 0, perfect: 0, water: 0, meals: 0, ex: 0, steps: 0, round: 0, entries: 0, kcal: 0 };
  const habits = allHabits();
  Object.keys(state.days).forEach(k => {
    if (!k.startsWith(PK() + "|")) return;
    const d = state.days[k];
    const has = (d.habits && Object.keys(d.habits).length) || (d.entries && d.entries.length) || d.agua || d.steps ||
      (d.meals && Object.keys(d.meals).length) || (d.ex && Object.keys(d.ex).length);
    if (!has) return;
    s.days++;
    s.entries += (d.entries || []).length;
    s.kcal += (d.entries || []).reduce((a, e) => a + (e.kcal || 0), 0);
    const perf = habits.length > 0 && habits.every(h => d.habits[h.id]);
    const mealsOk = MEALS.every(m => d.meals[m.id]);
    const wat = d.agua >= aguaMeta();
    if (perf) s.perfect++;
    if (wat) s.water++;
    if (mealsOk) s.meals++;
    if (d.ex && Object.values(d.ex).some(Boolean)) s.ex++;
    if ((d.steps || 0) >= 8000) s.steps++;
    if (perf && wat && mealsOk) s.round++;
  });
  s.racha = state.racha || 0;
  s.fasts = state.fastsDone || 0;
  s.weights = weightsOf().length;
  s.measures = measuresOf().length;
  return s;
}

// [metrica, emoji, etiqueta, hitos]
const MILESTONE_SPECS = [
  ["perfect", "🌟", "días perfectos", [1, 2, 3, 5, 7, 10, 14, 21, 30, 45, 60, 90, 100, 120, 180, 365]],
  ["racha", "🔥", "días de racha", [1, 2, 5, 10, 14, 21, 45, 60, 90, 100, 120, 180, 200, 365]],
  ["water", "💧", "días con meta de agua", [3, 7, 14, 30, 60, 100, 180, 365]],
  ["meals", "🍽️", "días registrando las 4 comidas", [3, 7, 14, 30, 60, 100, 180]],
  ["ex", "🏋️", "días con ejercicio", [1, 3, 7, 14, 30, 60, 100, 180]],
  ["steps", "👟", "días con 8,000+ pasos", [1, 3, 14, 30, 60, 100, 180, 365]],
  ["fasts", "⏳", "ayunos completados", [3, 7, 14, 30, 60, 100]],
  ["weights", "⚖️", "registros de peso", [1, 3, 10, 30, 50, 100]],
  ["measures", "📏", "medidas corporales", [1, 5, 10, 20, 50]],
  ["days", "📅", "días usando FitNutri", [7, 14, 30, 60, 100, 180, 365]],
  ["entries", "📝", "alimentos registrados", [1, 5, 10, 25, 50, 100, 250, 500, 1000]],
  ["kcal", "🔥", "kcal registradas (total)", [5000, 20000, 50000, 100000, 250000]],
  ["round", "💎", "días redondos (todo completo)", [1, 7, 30, 100]],
];
const GENERATED_ACHIEVEMENTS = [];
MILESTONE_SPECS.forEach(([key, emoji, label, nums]) => {
  nums.forEach(n => GENERATED_ACHIEVEMENTS.push({
    id: `g-${key}-${n}`,
    emoji,
    name: `${label} ×${n}`,
    desc: `Acumular ${n} ${label}`,
    test: s => s[key] >= n,
  }));
});
const ALL_ACHIEVEMENTS = ACHIEVEMENTS.concat(GENERATED_ACHIEVEMENTS);
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

// ✏️ EDITABLE: mensajes secretos — se desbloquean al completar SECRET_UNLOCK_DAYS
// días de hábitos. Cada semana se muestra UNO distinto al azar.
const SECRET_UNLOCK_DAYS = 7;
const SECRET_MSGS = [
  "Cada día que te levantas a cuidarte me enamora un poco más. Estoy orgulloso de ti. 💚",
  "No sabes lo que significa verte esforzarte por ti misma. Te admiro más de lo que imaginas. ✨",
  "Cuando dices 'hoy no puedo', yo sé que sí puedes — y eso me enamora de ti. 💛",
  "Tu constancia no pasa desapercibida. Cada gota de sudor es una prueba de tu amor propio. 🌱",
  "Me enamora la versión de ti que no se rinde, aunque el día esté difícil. 🤍",
  "Llevar tu cuerpo hasta aquí no es fácil, y aun así lo haces. Eso es lo más sexy que existe. 💚",
  "Si me preguntaran qué me enamora de ti, diría: tu disciplina silenciosa. 🔥",
  "Cada hábito que cumples es una carta de amor que te escribes a ti misma. Yo solo la leo. 💌",
  "Eres la persona que siempre quise animar sin saberlo. Y ahora puedo hacerlo desde aquí. ✨",
  "Tu progreso no es solo físico — es la prueba de que te eliges a ti primero. Y eso me enamora. 🌸",
  "Hay días que creo que nadie te ve esforzándote, pero yo sí. Y me enamora verte así. 💛",
  "No estás haciendo esto por nadie más que por ti — y aun así me tienes enamorado/a de veras. 💚",
  "Cada vez que eliges cuidarte sobre lo fácil, te vuelves más hermosa por dentro y por fuera. 🌟",
  "Eres mi persona favorita porque nunca deja de sorprenderme con su constancia. 🤍",
  "Si el amor tuviera forma, sería tu rutina diaria: constante, bella y llena de amor propio. 💚",
  "Me enamora que cuides de ti con la misma ternura con la que yo querría cuidarte. 💛",
  "Tu fuerza no está en no caer — está en volver a levantarte. Y eso me enamora profundamente. ✨",
  "Hay algo profundamente atractivo en quien se trabaja a sí misma cada día. Y ese alguien eres tú. 🔥",
  "Cada recordatorio que cumples me recuerda por qué te quiero: porque eliges tu bienestar. 💚",
  "Eres la demostración viviente de que el amor propio se entrena. Y verte entrenarlo me enamora. 🌹",
];
// Devuelve el mensaje de la semana actual (cambia cada lunes, estable dentro de la semana)
function secretMsg() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now - jan1) / (7 * 864e5));
  return SECRET_MSGS[week % SECRET_MSGS.length];
}

// ✏️ EDITABLE: Dedicatorias que salen en la pantalla de carga (splash).
// Cada vez que abre la app se elige UNA al azar. Para agregar más,
// copia una línea y escribe la tuya entre comillas — pueden llevar emojis.
const DEDICATORIAS = [
  "Para la persona más fuerte que conozco: tú 💚",
  "Cada día es una nueva oportunidad de ser tu mejor versión ✨",
  "No estás sola en esto — yo creo en ti siempre 🤍",
  "Tu esfuerzo de hoy es el resultado de mañana 🌱",
  "Un paso a la vez, pero sin detenerte.",
  "No estás empezando de cero, estás empezando con experiencia.",
  "Estoy aquí para recordarte de lo que eres capaz.",
  "Hoy es un buen día para cuidar de ti.",
  "Tu bienestar es tu mejor inversión.",
  "Confía en el proceso, incluso en los días lentos.",
  "Cada pequeño esfuerzo cuenta más de lo que imaginas.",
  "Hazlo por la persona en la que te estás convirtiendo.",
  "No busques la perfección, busca la constancia.",
  "Respira, enfócate y sigue adelante.",
  "Los pequeños hábitos construyen grandes resultados.",
  "La disciplina es elegir lo que más quieres sobre lo que quieres ahora.",
  "Un día a la vez, un hábito a la vez.",
  "La constancia vence al talento cuando el talento no se esfuerza.",
  "Tu futuro yo te agradecerá lo que hagas hoy.",
  "No se trata de tener tiempo, se trata de hacer tiempo.",
  "Lo que haces hoy puede mejorar todos tus mañanas.",
  "Cuidar tu cuerpo es una forma de respeto propio.",
  "La motivación te inicia, el hábito te mantiene.",
  "Haz de tu salud una prioridad, no una opción.",
  "Un mal día no arruina todo tu progreso.",
  "Descansa si lo necesitas, pero no renuncies.",
  "Incluso el progreso más lento sigue siendo progreso.",
  "Sé paciente contigo; las mejores cosas toman tiempo.",
  "Hoy haz lo que puedas con lo que tienes.",
  "Caerse está permitido, levantarse es obligatorio.",
  "No te compares con nadie más que con quien eras ayer.",
  "Está bien ir despacio mientras no te detengas.",
  "Cada día es una nueva oportunidad para volver a intentarlo.",
  "Celebra cada pequeña victoria del camino.",
  "Menos excusas, más acción.",
  "Tu cuerpo puede con todo, es a tu mente a quien debes convencer.",
  "Empieza donde estás, usa lo que tienes.",
  "El mejor momento para empezar es ahora.",
  "Sigue brillando, lo estás haciendo increíble.",
  "Enamórate de cuidar de ti.",
  "Pequeños cambios, grandes diferencias.",
  "Hoy vas a superar tus propios límites.",
  "Tu salud es tu verdadera riqueza.",
  "¡Tú puedes con esto y con mucho más!",
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
// "today" se refresca solo: si la app queda abierta pasada la medianoche,
// D() y el intervalo mantienen la fecha actual sin recargar
let today = new Date().toDateString();
setInterval(() => { today = new Date().toDateString(); }, 30000);

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
      // Migrar de perfiles múltiples a perfil único
      if (s.profiles && s.activeProfile && s.profiles[s.activeProfile]) {
        s.profile = s.profiles[s.activeProfile];
        delete s.profiles;
        delete s.activeProfile;
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
state.reminder = state.reminder || { on: false, time: "20:00", lastDate: null };
state.weightReminder = state.weightReminder || { on: false, time: "09:00", lastDate: null };
state.fastingStart = state.fastingStart || null;
state.fastsDone = state.fastsDone || 0;
state.waterGoal = state.waterGoal || 2000;
state.lastKcalAdjust = state.lastKcalAdjust || {};
state.wallpaper = state.wallpaper || null;
state.profileName = state.profileName || "";
state.google = state.google || null;
Object.keys(state.days).forEach(k => { state.days[k] = normalizeDay(state.days[k]); });

let saveWarned = false;
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    if (!saveWarned) {
      saveWarned = true;
      alert("⚠️ No se pudieron guardar los datos (almacenamiento lleno). Exporta tus datos desde Ajustes > Datos.");
    }
  }
}
const $ = (s) => document.querySelector(s);
const PK = () => "default"; // Perfil único
const arr = (map, k) => map[k] || (map[k] = []);
const D = () => {
  today = new Date().toDateString();
  const k = PK() + "|" + today;
  if (!state.days[k] || state.days[k].date !== today) { state.days[k] = freshDay(); playSfx("cambio"); }
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
        <div class="item-title">${esc(e.name)}</div>
        <div class="item-sub">${e.kcal} kcal${e.qty ? ` · ${e.qty} g` : ""}${e.p ? ` · ${e.p}g P` : ""}${e.c ? ` · ${e.c}g C` : ""}${e.f ? ` · ${e.f}g G` : ""}</div>
      </div>
      <div class="item-meta"><button class="ghost-btn" style="width:auto;margin:0;padding:6px 10px" data-del-food="${i}">✕</button></div>
    </div>`).join("");
}

// ===== Ejercicios =====
let exViewDay = null; // día que se está viendo (null = hoy)
function renderExercises() {
  const dayNames = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
  const todayName = dayNames[new Date().getDay()];
  const viewName = exViewDay || todayName;
  const isToday = viewName === todayName;
  $("#dia-semana").textContent = isToday ? todayName : `${viewName} · solo lectura`;
  const w = planWeek();
  $("#plan-week").textContent = `${w}/4 · ${WEEK_PHASES[w - 1]}`;
  const factor = [1, 1.15, 1.3, 0.9][w - 1];
  const ex = EXERCISES[viewName] || [];
  $("#exercise-list").innerHTML = ex.map((e, i) => {
    if (e.h) return `<h2 class="ex-block">${e.h}</h2>`;
    const id = viewName + i;
    const mins = parseInt(e.m);
    const dispM = isNaN(mins) || /descanso/i.test(e.t) ? e.m : `${Math.round(mins * factor)} min`;
    return `<div class="item ${isToday && D().ex[id] ? "done" : ""}">
      ${isToday ? `<span class="check" data-toggle="ex:${id}">${D().ex[id] ? "✓" : ""}</span>` : `<span class="check" style="visibility:hidden"></span>`}
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
      <span class="emoji">${esc(h.emoji)}</span>
      <div>
        <div class="item-title">${esc(h.title)}${h.custom ? ` <button class="mini-del" data-del-habit="${h.id}" title="Eliminar">✕</button>` : ""}</div>
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
// Un perfil solo sirve para calcular plan si tiene edad, peso y altura válidos
const planReady = (p) => !!(p && p.age > 0 && p.weight > 0 && p.height > 0);
function renderPlanForm() {
  if (!state.profile) return;
  const p = state.profile;
  $("#p-sex").value = p.sex ?? "";
  $("#p-age").value = p.age ?? "";
  $("#p-weight").value = p.weight ?? "";
  $("#p-height").value = p.height ?? "";
  $("#p-activity").value = p.activity ?? "";
  $("#p-goal").value = p.goal ?? "";
}

function calcPlan() {
  const p = state.profile;
  if (!planReady(p)) return;
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
  if (!planReady(p)) return;
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
        <div class="item-title">${esc(item.name)}</div>
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
  const st = achievementStats();
  GENERATED_ACHIEVEMENTS.forEach(g => { if (g.test(st)) conds[g.id] = true; });
  let changed = false;
  ALL_ACHIEVEMENTS.forEach(a => {
    if (conds[a.id] && !state.unlocked.includes(a.id)) {
      state.unlocked.push(a.id); changed = true;
      playSfx("logro");
    }
  });
  if (changed) save();
}

function renderAchievements() {
  checkAchievements();
  $("#achievements").innerHTML = ALL_ACHIEVEMENTS.map(a => {
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
// Registra el kg de hoy para un ejercicio sin duplicar entradas del mismo día
function logGymKg(id, kg) {
  const logs = gymLogOf();
  const prevMax = Math.max(0, ...logs.filter(l => l.ex === id).map(l => l.kg));
  const ex = logs.find(l => l.ex === id && l.date === today);
  if (ex) ex.kg = kg; else logs.push({ date: today, ex: id, kg });
  if (kg > prevMax && prevMax > 0) playSfx("record");
}
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
  const selName = exViewDay || dayNames[todayIdx];
  for (let i = 0; i < 7; i++) {
    const idx = (todayIdx + i) % 7;
    const dn = dayNames[idx];
    const first = (EXERCISES[dn] || []).find(x => x.t);
    html += `<div class="week-day ${i === 0 && !exViewDay ? "today" : ""} ${dn === selName ? "sel" : ""}" data-exday="${dn}">
      <div class="week-name">${i === 0 && !exViewDay ? "Hoy" : names[idx]}</div>
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
    const nm = names[i];
    const r = nm && RECIPES.find(x => x.name === nm);
    return `<div class="menu-day"><strong>${d}</strong> — ${nm || "—"}${r ? ` <span class="hint">${r.meta}</span>` : ""}</div>`;
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

  const habitsDone = habits.filter(h => D().habits[h.id]).length;
  const mealsDone = MEALS.filter(m => D().meals[m.id]).length;
  const dn = DAY_NAMES[new Date().getDay()];
  const exToday = EXERCISES[dn] || [];
  const exReal = exToday.filter(e => !e.h);
  const exDone = exToday.filter((e, i) => !e.h && D().ex[dn + i]).length;
  const exPct = exReal.length ? exDone / exReal.length * 100 : 0;
  const todos = todosOf();
  const todoDone = todos.filter(x => x.done).length;
  const todoPct = todos.length ? todoDone / todos.length * 100 : 0;

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
    </div>
    <div class="donut-row" style="margin-top:16px">
      ${donutCard(habitsPct, "#22c55e", "Hábitos hoy", `${habitsDone}/${habits.length} hechos`)}
      ${donutCard(mealsPct, "#f59e0b", "Comidas", `${mealsDone}/${MEALS.length} registradas`)}
      ${donutCard(exPct, "#8b5cf6", "Ejercicios hoy", exReal.length ? `${exDone}/${exReal.length}` : "día de descanso")}
      ${donutCard(todoPct, "#0ea5e9", "Pendientes", todos.length ? `${todoDone}/${todos.length} listos` : "sin pendientes")}
    </div>`;
}

// ===== Resumen semanal y mensual =====
function periodStats(daysBack) {
  const habits = allHabits();
  const now = new Date();
  const s = { days: 0, perfect: 0, kcal: 0, water: 0, steps: 0 };
  for (let i = 0; i < daysBack; i++) {
    const d = new Date(now.getTime() - i * 864e5);
    const day = state.days[PK() + "|" + d.toDateString()];
    if (!day) continue;
    const hasData = Object.keys(day.habits).length || day.entries.length || day.agua || (day.meals && Object.keys(day.meals).length) || day.steps;
    if (!hasData) continue;
    s.days++;
    if (habits.length && habits.every(h => day.habits[h.id])) s.perfect++;
    s.kcal += day.entries.reduce((a, e) => a + e.kcal, 0);
    if (day.agua >= aguaMeta()) s.water++;
    s.steps += day.steps || 0;
  }
  return s;
}
function renderPeriodStats() {
  const box = $("#period-stats");
  if (!box) return;
  const w = periodStats(7);
  const m = periodStats(30);
  const cell = (big, lbl) => `<div class="week-stat"><span class="big">${big}</span><span class="lbl">${lbl}</span></div>`;
  box.innerHTML =
    cell(`${w.perfect}/7`, "días perfectos · semana") +
    cell(w.kcal.toLocaleString("es"), "kcal · semana") +
    cell(w.water, "días agua OK · semana") +
    cell(`${m.perfect}`, "días perfectos · mes") +
    cell(m.kcal.toLocaleString("es"), "kcal · mes") +
    cell(m.water, "días agua OK · mes") +
    cell(m.steps.toLocaleString("es"), "pasos · mes") +
    cell(`${state.racha}🔥`, "racha actual");
}

// ===== Logros de hoy (se reinician cada día) =====
const DAILY_ACHIEVEMENTS = [
  { id: "d-agua", emoji: "💧", name: "Hidratación completa", desc: "Llegar a la meta de agua hoy", test: () => D().agua >= aguaMeta() },
  { id: "d-habitos", emoji: "✅", name: "Todos los hábitos", desc: "Completar todos los hábitos hoy", test: () => { const h = allHabits(); return h.length > 0 && h.every(x => D().habits[x.id]); } },
  { id: "d-comidas", emoji: "🍽️", name: "Las 4 comidas", desc: "Registrar todas las comidas hoy", test: () => MEALS.every(m => D().meals[m.id]) },
  { id: "d-ejercicios", emoji: "🏋️", name: "Ejercicios hechos", desc: "Completar la rutina de hoy", test: () => { const dn = DAY_NAMES[new Date().getDay()]; const idxs = []; (EXERCISES[dn] || []).forEach((e, i) => { if (!e.h) idxs.push(i); }); return idxs.length > 0 && idxs.every(i => D().ex[dn + i]); } },
  { id: "d-pasos", emoji: "👟", name: "8,000 pasos", desc: "Llegar a 8,000 pasos hoy", test: () => (D().steps || 0) >= 8000 },
  { id: "d-peso", emoji: "⚖️", name: "Peso registrado", desc: "Registrar tu peso hoy", test: () => weightsOf().some(w => w.date === today) },
  { id: "d-agua-mitad", emoji: "\u{1F95B}", name: "Medio litro de agua", desc: "Tomar la mitad de tu meta de agua", test: () => D().agua >= aguaMeta() / 2 },
  { id: "d-agua-1l", emoji: "\u{1FAD7}", name: "Un litro de agua", desc: "Tomar 1,000 ml de agua hoy", test: () => D().agua >= 1000 },
  { id: "d-entradas3", emoji: "\u{1F34E}", name: "3 alimentos", desc: "Registrar 3 alimentos hoy", test: () => (D().entries || []).length >= 3 },
  { id: "d-pendientes", emoji: "\u{1F4CB}", name: "Pendientes limpios", desc: "Completar todos los pendientes de hoy", test: () => { const t = todosOf(); return t.length > 0 && t.every(x => x.done); } },
  { id: "d-gym", emoji: "\u{1F4AA}", name: "Gym completo", desc: "Completar todos los ejercicios de gym hoy", test: () => { const g = Object.values(D().gym || {}); return g.length > 0 && g.every(Boolean); } },
  { id: "d-sin-trampa", emoji: "\u{1F96C}", name: "Sin modo trampa", desc: "No activar modo trampa hoy", test: () => !D().cheat },
];
function renderDailyAchievements() {
  const box = $("#daily-achievements");
  if (!box) return;
  box.innerHTML = DAILY_ACHIEVEMENTS.map(a => {
    let got = false;
    try { got = !!a.test(); } catch {}
    return `<div class="badge ${got ? "" : "locked"}"><span class="b-emoji">${a.emoji}</span><div><strong>${a.name}</strong><div style="font-size:.75rem;color:var(--muted)">${got ? "¡Hoy sí! ✓" : a.desc}</div></div></div>`;
  }).join("");
}

// ===== Render global =====
function renderAll() {
  renderMeals(); renderFoods(); renderExercises(); renderHabits(); renderGym(); renderWeekStrip();
  renderDashboard(); renderRecipes(); renderList(); renderMenu(); renderTodos();
  renderWeights(); renderSteps(); renderKcalChart(); renderMacrosChart(); renderHeatmap(); renderMeasures(); renderPieCharts(); renderWeekSummary();
  renderPeriodStats(); renderDailyAchievements();
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
        if (kg > 0) logGymKg(id, kg);
        playSfx("marcar");
      }
      maybeCountMealsDay();
      save(); renderGym(); renderAll(); return;
    }
    const obj = grp === "meal" ? D().meals : grp === "habit" ? D().habits : D().ex;
    if (obj[id]) delete obj[id]; else { obj[id] = true; playSfx("marcar"); if (navigator.vibrate) navigator.vibrate(30); }
    maybeCountMealsDay();
    maybeCelebrate();
    save(); renderAll(); return;
  }
  const wd = e.target.closest("[data-exday]");
  if (wd) {
    const dn = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"][new Date().getDay()];
    exViewDay = wd.dataset.exday === dn ? null : wd.dataset.exday;
    renderExercises(); renderWeekStrip();
    return;
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
    // Primera visita a esta pestaña → mostrar su introducción
    setTimeout(() => showTabIntro(tab.dataset.tab), 400);
  });
});

// Agua
$("#agua-250").addEventListener("click", () => { D().agua = Math.min(aguaMeta(), D().agua + 250); playSfx("agua"); save(); renderAll(); });
$("#agua-500").addEventListener("click", () => { D().agua = Math.min(aguaMeta(), D().agua + 500); playSfx("agua"); save(); renderAll(); });
$("#agua-reset").addEventListener("click", () => { playSfx("agua"); });
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
    age: +$("#p-age").value || null,
    weight: +$("#p-weight").value || null,
    height: +$("#p-height").value || null,
    activity: +$("#p-activity").value || null,
    goal: +$("#p-goal").value || null,
  };
  save(); if (planReady(state.profile)) calcPlan(); renderDashboard();
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
  if (planReady(state.profile)) calcPlan();
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
  playSfx("borrar");
  if (confirm("¿Borrar TODOS los datos? Esta acción no se puede deshacer.")) {
    localStorage.removeItem(KEY);
    location.reload();
  }
});
// Reiniciar las introducciones de cada pestaña
$("#tours-reset").addEventListener("click", () => {
  state.tours = {};
  state.onboarded = false;
  save();
  alert("Listo. La próxima vez que abras la app verás las introducciones otra vez.");
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

// ===== Utilidades =====
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
let restInt = null, restAC = null;
function restBeep() {
  if (playSfx("pitido")) return;
  try {
    restAC = restAC || new (window.AudioContext || window.webkitAudioContext)();
    if (restAC.state === "suspended") restAC.resume();
    const o = restAC.createOscillator(), g = restAC.createGain();
    o.type = "sine"; o.frequency.value = 880;
    g.gain.setValueAtTime(0.2, restAC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, restAC.currentTime + 0.4);
    o.connect(g); g.connect(restAC.destination);
    o.start(); o.stop(restAC.currentTime + 0.4);
  } catch {}
}
function restTick() {
  if (playSfx("tic")) return;
  try {
    restAC = restAC || new (window.AudioContext || window.webkitAudioContext)();
    if (restAC.state === "suspended") restAC.resume();
    const o = restAC.createOscillator(), g = restAC.createGain();
    o.type = "square"; o.frequency.value = 1200;
    g.gain.setValueAtTime(0.05, restAC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, restAC.currentTime + 0.06);
    o.connect(g); g.connect(restAC.destination);
    o.start(); o.stop(restAC.currentTime + 0.06);
  } catch {}
}
$("#rest-start").addEventListener("click", () => {
  const secs = +$("#rest-secs").value || 60;
  clearInterval(restInt);
  try { restAC = restAC || new (window.AudioContext || window.webkitAudioContext)(); restAC.resume(); } catch {}
  let left = secs;
  $("#rest-display").textContent = left;
  restInt = setInterval(() => {
    left--;
    if (left <= 0) {
      clearInterval(restInt);
      $("#rest-display").textContent = "¡Descansa! 💪";
      restBeep();
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("FitNutri", { body: "Descanso terminado — ¡a la siguiente serie!" });
      }
      setTimeout(() => { $("#rest-display").textContent = secs; }, 4000);
      return;
    }
    restTick();
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
  if (kg > 0) logGymKg(id, kg);
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
  if (ex.length && ex.every((e, i) => e.h || D().ex[dn + i]) && !D()._celebrated) {
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
    box.innerHTML = `<div class="secret-reveal">💌 ${secretMsg()}</div>
      <p class="hint">Desbloqueado · ${done} días completados 🏆 · mensaje nuevo cada semana ✨</p>`;
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
        <div class="item-title">${esc(s.name.replace(/\.[^.]+$/, ""))}</div>
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
// Siguiente canción: en aleatorio salta a una al azar; si no, sigue el orden
let musicShuffle = false;
function pickNext(autoEnd) {
  if (!musicList.length) return;
  if (musicShuffle) {
    let i = Math.floor(Math.random() * musicList.length);
    if (musicList.length > 1) while (i === musicIdx) i = Math.floor(Math.random() * musicList.length);
    playSong(i);
    return;
  }
  if (autoEnd) {
    if (musicIdx < musicList.length - 1) playSong(musicIdx + 1);
    else { musicIdx = -1; renderMusic(); }
  } else {
    playSong((musicIdx + 1) % musicList.length);
  }
}
audio.addEventListener("ended", () => pickNext(true));
audio.addEventListener("timeupdate", () => {
  if (audio.duration) $("#np-seek").value = Math.round(audio.currentTime / audio.duration * 1000);
});
audio.addEventListener("play", () => { $("#np-play").textContent = "⏸"; });
audio.addEventListener("pause", () => { $("#np-play").textContent = "▶"; });
$("#np-play").addEventListener("click", () => audio.paused ? audio.play() : audio.pause());
$("#np-prev").addEventListener("click", () => playSong(musicIdx <= 0 ? musicList.length - 1 : musicIdx - 1));
$("#np-next").addEventListener("click", () => pickNext(false));
$("#np-shuffle").addEventListener("click", () => {
  musicShuffle = !musicShuffle;
  $("#np-shuffle").classList.toggle("tag-active", musicShuffle);
});
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
state.tours = state.tours || {};

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
// Cada slide: { emoji, title, text } — opcional "img": "carpeta/archivo.gif" para usar imagen/GIF en vez del emoji
const ONBOARD_SLIDES = [
  { emoji: "🎯", img: "gif%20para%20app.gif", title: "Bienvenida a FitNutri", text: "Tu compañero diario para comer mejor, moverme más y crear hábitos que sí se quedan." },
  { emoji: "✅", title: "Marca tu día", text: "Cada mañana verás tus comidas, ejercicios y hábitos. Márcalos al completarlos — es tan fácil como un toque." },
  { emoji: "📈", title: "Mira tu progreso", text: "Peso, calorías, rachas y logros se registran solos. Y hay una sección secreta 💌 solo para ti." },
];

// ✏️ EDITABLE: Introducción que sale la primera vez que se abre cada pestaña.
// La clave debe coincidir con data-tab del botón en index.html.
// Se muestra una sola vez por pestaña (se guarda en state.tours).
const TAB_INTROS = {
  dashboard: [{ emoji: "🏠", img: "anime-run-anime-run-fall.gif", title: "Tu día de un vistazo", text: "Aquí está tu resumen: hábitos, comidas, agua y kcal del día, más tu racha 🔥 y últimos logros. Es tu panel principal." }],
  comidas: [{ emoji: "🍽️", img: "comida.gif", title: "Combustible del día", text: "Marca tus comidas planificadas, registra lo que comes con kcal y macros, controla tu agua y apunta cafeína/azúcar. El botón 📷 escanea códigos de barras." }],
  ejercicios: [{ emoji: "🏋️", img: "pesas.gif", title: "Muévete y progresa", text: "Rutina según el día de la semana, fuerza con progresión por semanas y tus récords PR 🏆, timers de intervalos y descanso, y tu ayuno 16:8 si lo practicas." }],
  habitos: [{ emoji: "✅", img: "lagartijas.gif", title: "Pequeños hábitos, grandes cambios", text: "Márcalos cada día para mantener tu racha 🔥. Puedes crear los tuyos y ver tu constancia en el mapa de calor de 12 semanas." }],
  plan: [{ emoji: "🎯", img: "deal-with-it-trailblazer.gif", title: "Tu plan a medida", text: "Con tus datos (sexo, edad, peso, altura, actividad y objetivo) calculamos tus calorías y macros diarios. Si tu peso cambia, el objetivo se ajusta solo cada semana." }],
  recetas: [{ emoji: "📖", img: "granny-dancing-game.gif", title: "Come rico y sano", text: "Recetas rápidas y altas en proteína. Puedes generar un menú semanal completo y mandar sus ingredientes a tu lista de compras con un toque." }],
  lista: [{ emoji: "🛒", img: "baile.gif", title: "De compras sin olvidos", text: "Anota lo que necesitas y marca lo que ya compraste. El botón ✨ en Recetas puede llenar la lista sola desde tu menú semanal." }],
  pendientes: [{ emoji: "📋", img: "brincos.gif", title: "No se te olvida nada", text: "Anota tus tareas y márcalas al completarlas. Las hechas se van al final de la lista para que no estorben." }],
  progreso: [{ emoji: "📈", img: "pesas2.gif", title: "Mide tu avance", text: "Peso, medidas, pasos, calorías y macros en gráficas. Comparte tu progreso, expórtalo a CSV y desbloquea logros 🏅." }],
  ajustes: [{ emoji: "⚙️", img: "on-miyao-wandance.gif", title: "Personaliza tu app", text: "Perfiles separados para cada quien, recordatorios, meta de agua, modo oscuro y fondos de pantalla. También puedes exportar o borrar tus datos." }],
  secreto: [{ emoji: "💌", img: "naruto.gif", title: "Solo para ti", text: "Fotos de tu progreso, tu música guardada sin internet, tu historia semana a semana y un mensaje que se desbloquea con 7 días de hábitos." }],
};

let obIdx = 0, obSlides = ONBOARD_SLIDES, obTab = null;
function renderOnboard() {
  const s = obSlides[obIdx];
  const ob = $("#ob-emoji");
  if (s.img) {
    ob.innerHTML = `<img class="ob-gif" src="${s.img}" alt="" />`;
  } else {
    ob.textContent = s.emoji;
  }
  $("#ob-title").textContent = s.title;
  $("#ob-text").textContent = s.text;
  $("#ob-dots").innerHTML = obSlides.map((_, i) => `<span class="${i === obIdx ? "on" : ""}"></span>`).join("");
  $("#ob-next").textContent = obTab ? "¡Entendido! ✓" : (obIdx === obSlides.length - 1 ? "¡Empezar! 🎉" : "Siguiente →");
}
// Muestra la introducción de una pestaña la primera vez que se abre
function showTabIntro(tab) {
  const slides = TAB_INTROS[tab];
  if (!slides || state.tours[tab]) return;
  obSlides = slides; obIdx = 0; obTab = tab;
  renderOnboard();
  $("#onboard").style.display = "flex";
}
function closeOnboard() {
  if (obTab) {
    state.tours[obTab] = true;
    obTab = null; obSlides = ONBOARD_SLIDES; obIdx = 0;
  } else {
    state.onboarded = true;
  }
  save();
  $("#onboard").style.display = "none";
}
$("#ob-next").addEventListener("click", () => {
  if (obIdx < obSlides.length - 1) { obIdx++; renderOnboard(); }
  else closeOnboard();
});
$("#ob-skip").addEventListener("click", closeOnboard);
if (!state.onboarded) {
  setTimeout(() => { obSlides = ONBOARD_SLIDES; obIdx = 0; obTab = null; renderOnboard(); $("#onboard").style.display = "flex"; }, 1400);
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
  const wDelta = recent.length ? ` · ⚖️ ${ws[ws.length - 1].kg} kg` : "";
  const goal = macrosOf() ? macrosOf().kcal : null;
  box.innerHTML = `
    <div class="week-stat"><span class="big">${perfect}/7</span><span class="lbl">días perfectos</span></div>
    <div class="week-stat"><span class="big">${totalKcal.toLocaleString("es")}</span><span class="lbl">kcal en 7 días</span></div>
    <div class="week-stat"><span class="big">${goal ? Math.round(totalKcal / 7) : "—"}</span><span class="lbl">kcal/día media${goal ? ` (meta ${goal})` : ""}</span></div>
    <div class="week-stat"><span class="big">${state.racha}🔥</span><span class="lbl">racha actual${wDelta}</span></div>`;
}

// ===== Google / Drive (opcional) =====
const GOOGLE_CLIENT_ID = "594506576378-64arglri3749clsq98u0d94braiepvl6.apps.googleusercontent.com";
const GOOGLE_SCOPES = "openid email profile https://www.googleapis.com/auth/drive.file";
const DRIVE_FOLDER = "FitNutri";
let gClient = null, gToken = null, gTokenExp = 0, gPending = null, gPendingReject = null, gScriptLoading = null;

function setDriveStatus(t) { const el = $("#drive-status"); if (el) el.textContent = t || ""; }

function renderGoogleStatus() {
  const el = $("#google-status");
  if (!el) return;
  const connected = !!(state.google && state.google.email);
  el.textContent = connected
    ? `🔗 Conectado como ${state.google.name || ""} (${state.google.email}). Los datos solo se suben si tú lo pides.`
    : "Sin conectar. Conecta tu cuenta solo si quieres guardar una copia de tus datos en Google Drive (opcional).";
  ["#drive-backup", "#drive-restore"].forEach((s) => { const b = $(s); if (b) b.disabled = !connected; });
}

function ensureGoogle() {
  if (gClient) return Promise.resolve(true);
  if (gScriptLoading) return gScriptLoading;
  gScriptLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.onload = () => {
      gClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        callback: onGoogleToken,
      });
      resolve(true);
    };
    s.onerror = () => reject(new Error("No se pudo cargar Google"));
    document.head.appendChild(s);
  });
  return gScriptLoading;
}

function onGoogleToken(resp) {
  if (resp.error) {
    const rj = gPendingReject; gPending = gPendingReject = null;
    if (rj) rj(new Error(resp.error_description || resp.error));
    else setDriveStatus("Error de Google: " + (resp.error_description || resp.error));
    return;
  }
  gToken = resp.access_token;
  gTokenExp = Date.now() + (resp.expires_in || 3600) * 1000;
  fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: "Bearer " + gToken } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("userinfo " + r.status))))
    .then((u) => {
      state.google = { name: u.name || "", email: u.email || "" };
      save(); renderGoogleStatus();
      setDriveStatus("Conectado como " + (u.email || ""));
    })
    .catch(() => setDriveStatus("Conectado."))
    .finally(() => { const fn = gPending; gPending = gPendingReject = null; if (fn) fn(); });
}

function googleToken() {
  return new Promise((resolve, reject) => {
    ensureGoogle().then(() => {
      if (gToken && Date.now() < gTokenExp - 60000) return resolve();
      gPending = resolve; gPendingReject = reject;
      gClient.requestAccessToken({ prompt: "" });
      setTimeout(() => {
        if (gPending === resolve) { gPending = gPendingReject = null; reject(new Error("cancelado")); }
      }, 120000);
    }).catch(reject);
  });
}

async function driveApi(path, opts = {}) {
  const r = await fetch("https://www.googleapis.com/drive/v3/" + path, {
    ...opts,
    headers: { Authorization: "Bearer " + gToken, ...(opts.headers || {}) },
  });
  if (!r.ok) throw new Error("Drive respondió " + r.status);
  return r.status === 204 ? null : r.json();
}

async function ensureDriveFolder() {
  const q = encodeURIComponent(`name='${DRIVE_FOLDER}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const found = await driveApi(`files?q=${q}&fields=files(id)&pageSize=1`);
  if (found.files && found.files.length) return found.files[0].id;
  const created = await driveApi("files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: DRIVE_FOLDER, mimeType: "application/vnd.google-apps.folder" }),
  });
  return created.id;
}

async function driveUploadJson(folderId, name, obj) {
  const q = encodeURIComponent(`name='${name}' and '${folderId}' in parents and trashed=false`);
  const found = await driveApi(`files?q=${q}&fields=files(id)&pageSize=1`);
  const fd = new FormData();
  fd.append("metadata", new Blob([JSON.stringify(found.files.length ? { name } : { name, parents: [folderId] })], { type: "application/json" }));
  fd.append("file", new Blob([JSON.stringify(obj)], { type: "application/json" }));
  const url = found.files.length
    ? `https://www.googleapis.com/upload/drive/v3/files/${found.files[0].id}?uploadType=multipart`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
  const r = await fetch(url, { method: found.files.length ? "PATCH" : "POST", headers: { Authorization: "Bearer " + gToken }, body: fd });
  if (!r.ok) throw new Error("No se pudo subir (" + r.status + ")");
}

async function backupToDrive() {
  setDriveStatus("Respaldando…");
  try {
    await googleToken();
    const folderId = await ensureDriveFolder();
    const data = { ...state };
    delete data.google;
    await driveUploadJson(folderId, "fitnutri-backup.json", { app: "fitnutri", savedAt: new Date().toISOString(), data });
    setDriveStatus(`✅ Respaldo guardado en Drive › ${DRIVE_FOLDER}`);
  } catch (e) {
    setDriveStatus("Error al respaldar: " + e.message);
  }
}

async function restoreFromDrive() {
  setDriveStatus("Buscando respaldo…");
  try {
    await googleToken();
    const folderId = await ensureDriveFolder();
    const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
    const list = await driveApi(`files?q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=10`);
    const f = (list.files || []).find((x) => x.name === "fitnutri-backup.json");
    if (!f) { setDriveStatus("No hay respaldo en Drive todavía."); return; }
    const r = await fetch(`https://www.googleapis.com/drive/v3/files/${f.id}?alt=media`, { headers: { Authorization: "Bearer " + gToken } });
    if (!r.ok) throw new Error("No se pudo descargar (" + r.status + ")");
    const payload = await r.json();
    if (!payload.data) throw new Error("El respaldo está vacío");
    if (!confirm("¿Restaurar el respaldo de Drive?\nSe reemplazarán los datos actuales del dispositivo.")) { setDriveStatus(""); return; }
    const google = state.google;
    state = payload.data;
    state.google = google;
    save();
    setDriveStatus("✅ Restaurado. Recargando…");
    setTimeout(() => location.reload(), 800);
  } catch (e) {
    setDriveStatus("Error al restaurar: " + e.message);
  }
}

$("#google-connect").addEventListener("click", () => {
  setDriveStatus("Conectando…");
  ensureGoogle().then(() => {
    gPending = () => {};
    gClient.requestAccessToken({ prompt: "consent" });
    setTimeout(() => { if (gPending) { gPending = null; setDriveStatus("Conexión cancelada."); } }, 120000);
  }).catch((e) => setDriveStatus(e.message));
});
$("#drive-backup").addEventListener("click", backupToDrive);
$("#drive-restore").addEventListener("click", restoreFromDrive);
$("#profile-name").addEventListener("change", (e) => {
  state.profileName = e.target.value.trim();
  save();
  const dn = $("#dashboard-name");
  if (dn) dn.textContent = state.profileName ? `Hola, ${state.profileName} 👋` : "";
});

// ===== Efectos de sonido (carpeta /sonidos) =====
// Archivos .mp3/.m4a/.wav/.ogg; suena el que CONTENGA la palabra clave
// (ej. "marcar", "agua", "logro", "record", "tic", "borrar").
// Si hay varios que coinciden se elige uno al azar. Devuelve true si sonó.
let sfxFiles = null;
fetch("sonidos/list.json").then(r => r.ok ? r.json() : []).then(list => {
  sfxFiles = (list || []).filter(f => /\.(mp3|m4a|wav|ogg)$/i.test(f));
}).catch(() => { sfxFiles = []; });
function playSfx(word) {
  if (!state.sfx || !sfxFiles || !sfxFiles.length) return false;
  const opts = sfxFiles.filter(f => f.toLowerCase().includes(word));
  if (!opts.length) return false;
  try {
    const a = new Audio("sonidos/" + opts[Math.floor(Math.random() * opts.length)]);
    a.volume = 0.6;
    a.play().catch(() => {});
    return true;
  } catch { return false; }
}

// ===== Música de fondo (pista al azar de /musica, en loop) =====
// Se reproduce solo al abrir la app (tras el primer toque, requisito
// de los navegadores) y se pausa cuando ella pone su música en 💌.
// ✏️ EDITABLE: agrega archivos .mp3/.m4a/.wav/.ogg a la carpeta musica/
const bgAudio = new Audio();
bgAudio.loop = true;
bgAudio.volume = 0.22;
fetch("musica/list.json").then(r => r.ok ? r.json() : []).then(list => {
  const files = (list || []).filter(f => /\.(mp3|m4a|wav|ogg)$/i.test(f));
  if (files.length) bgAudio.src = "musica/" + files[Math.floor(Math.random() * files.length)];
}).catch(() => {});
function startAmbient() {
  if (!state.ambient || !bgAudio.src) return;
  bgAudio.play().catch(() => {});
}
function stopAmbient() {
  bgAudio.pause();
}
// Se calla cuando suena la música de ella y vuelve cuando para
audio.addEventListener("play", () => { if (state.ambient) bgAudio.pause(); });
audio.addEventListener("pause", () => { if (state.ambient && !audio.paused) return; if (state.ambient) startAmbient(); });
audio.addEventListener("ended", () => { if (state.ambient) startAmbient(); });
state.ambient = true; // música de fondo siempre activa
state.sfx = true; // efectos siempre activos
// Los navegadores exigen un toque antes de sonar: arranca al primer toque si estaba activado
document.addEventListener("pointerdown", function once() {
  document.removeEventListener("pointerdown", once);
  if (state.ambient && audio.paused) startAmbient();
}, { once: true });

// ===== Init =====
$("#food-options").innerHTML = FOODS.map(f => `<option value="${f.n}"></option>`).join("");
applyTheme();
renderPlanForm();
renderFasting();
renderCafSugar();
$("#water-goal").value = state.waterGoal;
$("#profile-name").value = state.profileName || "";
$("#dashboard-name").textContent = state.profileName ? `Hola, ${state.profileName} 👋` : "";
renderGoogleStatus();
if (planReady(state.profile)) {
  maybeAdjustKcal();
  if (macrosOf()) calcPlan();
}
renderAll();
resetTimer();
checkAchievements();
renderAchievements();
renderDashboard();
