// ── Idioma ─────────────────────────────────────────────────────────────────
const IDIOMAS_SOPORTADOS = ['es', 'cat', 'en']

function detectarIdioma() {
  const candidatos = [
    ...(navigator.languages || []),
    navigator.language,
    navigator.userLanguage,
    navigator.browserLanguage,
    navigator.systemLanguage
  ].filter(Boolean)

  for (const l of candidatos) {
    const corto = String(l).toLowerCase().split('-')[0]
    const norm = corto === 'ca' ? 'cat' : corto
    if (IDIOMAS_SOPORTADOS.includes(norm)) return norm
  }
  return 'es'
}

function idiomaActivo() {
  return localStorage.getItem('idioma_preferido') || detectarIdioma()
}

function renderLangSwitcher(container, activo, onChange) {
  if (!container) return
  container.innerHTML = IDIOMAS_SOPORTADOS.map(l =>
    `<button class="lang-btn ${l === activo ? 'active' : ''}" data-lang="${l}" type="button">${l.toUpperCase()}</button>`
  ).join('')
  container.querySelectorAll('.lang-btn').forEach(b => {
    b.onclick = () => {
      const nuevo = b.dataset.lang
      localStorage.setItem('idioma_preferido', nuevo)
      onChange(nuevo)
    }
  })
}

// Título principal dinámico
const palabras = [
  'Bienvenido',   // Español
  'Benvinguts',   // Catalan
  'Welcome',      // Inglés
  'Benvenuto',    // Italiano
  'Willkommen',   // Alemán
  'Bienvenue'     // Francés
]

// Pregunta
const locales_nombres = {
  es: {
    focacceria: "Focacceria",
    bolleria: "Café de Especialidad, Bollería y Brunch",
    todo: "Focacceria & Café de Especialidad, Bollería y Brunch"
  },
  cat: {
    focacceria: "Focacceria",
    bolleria: "Cafè D'especialitat, Fleca i Brunch",
    todo: "Focacceria & Cafè D'especialitat, Fleca i Brunch"
  },
  en: {
    focacceria: "Focacceria",
    bolleria: "Specialty Coffee, Bakery & Brunch",
    todo: "Focacceria & Specialty Coffee, Bakery & Brunch"
  }
}

let palabraIndex = 0
let letraIndex = 0
const velocidad = 150 // velocidad de tipeo
const pausaEntrePalabras = 1500

const typingElement = document.getElementById('typing')

// Home
function tipear() {
  if (sessionStorage.getItem('idioma')) {
    return
  }

  if (letraIndex < palabras[palabraIndex].length) {
    typingElement.textContent += palabras[palabraIndex].charAt(letraIndex)
    letraIndex++
    setTimeout(tipear, velocidad)
  } else {
    // Pausa y luego borrar para la siguiente palabra
    setTimeout(() => {
      borrar()
    }, pausaEntrePalabras)
  }
}

function borrar() {
  if (sessionStorage.getItem('idioma')) {
    return
  }
  if (letraIndex > 0) {
    typingElement.textContent = palabras[palabraIndex].substring(0, letraIndex - 1)
    letraIndex--
    setTimeout(borrar, velocidad / 2)
  } else {
    // Siguiente palabra
    palabraIndex = (palabraIndex + 1) % palabras.length
    setTimeout(tipear, velocidad)
  }
}

const menu_seleccion = (idioma) => {
  const titulos = {
    es: "¿Qué menú quieres ver?",
    cat: "Quin menú vols veure?",
    en: "What menu would you like to see?"
  };

  document.getElementById('pregunta').textContent = titulos[idioma]
}

const menu = (v, c) => {
  if ('menu' === c) {
    sessionStorage.removeItem('local')
    sessionStorage.setItem('idioma', v)
    document.querySelector('#menu-idioma').classList.add('hide')
    document.querySelector('#menu-local').classList.remove('hide')

    const idioma = sessionStorage.getItem('idioma') || 'es'
    menu_seleccion(idioma)

    // Remuevo la Direccion
    if (document.querySelector('#direccion')) {
      document.querySelector('#direccion').remove()
    }

    // Cambiar los títulos de los botones según el idioma
    document.querySelector('#menu-local-focacceria').textContent = locales_nombres[idioma].focacceria;
    document.querySelector('#menu-local-bolleria').textContent = locales_nombres[idioma].bolleria;
  }

  if ('local' === c) {
    sessionStorage.setItem('local', v)
  }

  // Si no se ha seleccionado el idioma o el local, redirigir
  if (sessionStorage.getItem('idioma') && sessionStorage.getItem('local')) {
    window.location.href = './menu.html?v=' + sessionStorage.getItem('idioma') + '&c=' + sessionStorage.getItem('local');
  }
}

const recarga = () => {
  const bienbenido = {
    es: "Bienvenido",
    cat: "Benvinguts",
    en: "Welcome"
  }
  document.querySelector("#typing").textContent = bienbenido[sessionStorage.getItem('idioma')]
  document.querySelector("#typing").style.paddingBottom = '0'
  document.querySelector("#menu-local").classList.add('hide')
  document.querySelector("#menu-idioma").classList.remove('hide')
  sessionStorage.clear()
}

const menu_datos = [
  {
    "id": "POPIS-01",
    "precio": "12,50",
    "cat_nombre": "LESSEPS",
    "cat_descripcion": "Carn braseada i esfilagarsada - crema de festucs - ceba caramel·litzades.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "LESSEPS",
    "en_descripcion": "Braised & pulled beef - pistachio cream - caramelized onions.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "LESSEPS",
    "es_descripcion": "Carne desmechada - crema de pistacho - cebolla Caramelizada.",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-02",
    "precio": "12,50",
    "cat_nombre": "DEL SOL",
    "cat_descripcion": "Carn braseada i esfilagarsada - Malbec glacejat - cebes caramel·litzades.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "DEL SOL",
    "en_descripcion": "Braised & pulled beef - Glazed Malbec - caramelized onions.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "DEL SOL",
    "es_descripcion": "Carne desmechada - Malbec glaseado - cebolla caramelizada.",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-03",
    "precio": "13.5",
    "cat_nombre": "DEL DIAMANT",
    "cat_descripcion": "Carn braseada i esfilagarsada - pesto rosa - albergínies en conserva - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "DEL DIAMANT",
    "en_descripcion": "Braised & pulled beef - pink pesto - preserved eggplants - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "DEL DIAMANT",
    "es_descripcion": "Carne desmechada - pesto rosa - berenjenas en conserva - queso Edam.",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-04",
    "precio": "13,50",
    "cat_nombre": "ROVIRA",
    "cat_descripcion": "Carn desfilada - crema de bolets - cebes encurtides - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "ROVIRA",
    "en_descripcion": "Shredded meat - mushroom cream - pickled onions - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "ROVIRA",
    "es_descripcion": "Carne desmechada - crema de setas - cebollas encurtidas - queso Edam",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-05",
    "precio": "15",
    "cat_nombre": "PERLA",
    "cat_descripcion": "Carn de roast beef - melmelada de pebrots - formatge brie - ruca.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "PERLA",
    "en_descripcion": "Roast beef - pepper jam - Brie cheese - arugula.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "PERLA",
    "es_descripcion": "Carne roast beef - mermelada de pimientos - queso brie - rúcula",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-06",
    "precio": "15",
    "cat_nombre": "CHIMI",
    "cat_descripcion": "Carn de roast beef - chimichurri - formatge Edam - tomàquet fresc - ruca - ceba cruixent.",
    "cat_categoria": "FOCACCIAS AMB CARN",
    "en_nombre": "CHIMI",
    "en_descripcion": "Roast beef - chimichurri - Edam cheese - fresh tomato - arugula - crispy onions.",
    "en_categoria": "FOCACCIAS WITH MEET",
    "es_nombre": "CHIMI",
    "es_descripcion": "Carne roast beef - chimichurri - queso Edam - tomate fresco - rúcula - cebolla crispy",
    "es_categoria": "FOCACCIAS DE CARNE",
    "local": "focacceria"
  },
  {
    "id": "POPIS-07",
    "precio": "12,5",
    "cat_nombre": "ASTURIES",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - crema de pesto - coleslaw.",
    "cat_categoria": "FOCACCIAS AMB POLLASTRE",
    "en_nombre": "ASTURIES",
    "en_descripcion": "Marinated chicken with honey and mustard - pesto cream - Coleslaw.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "ASTURIES",
    "es_descripcion": "Pollo marinado con mostaza y miel - crema de pesto - coleslaw.",
    "es_categoria": "FOCACCIAS DE POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-08",
    "precio": "12,5",
    "cat_nombre": "TRAVESSERA",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - aioli - ruca - tomàquet - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB POLLASTRE",
    "en_nombre": "TRAVESSERA",
    "en_descripcion": "Honey-mustard marinated chicken - aioli sauce - arugula  - tomato - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "TRAVESSERA",
    "es_descripcion": "Pollo marinado con mostaza y miel - salsa aioli - mix de hojas verdes - tomate fresco - queso Edam.",
    "es_categoria": "FOCACCIAS DE POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-09",
    "precio": "13,5",
    "cat_nombre": "PUIGMARTI",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - crema de festucs - tomàquets confitats - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB POLLASTRE",
    "en_nombre": "PUIGMARTI",
    "en_descripcion": "Honey-mustard marinated chicken - pistachio cream - confit tomatoes - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "PUIGMARTI",
    "es_descripcion": "Pollo marinado con mostaza y miel - crema de pistachos - tomates confitados - queso Edam.",
    "es_categoria": "FOCACCIAS DE POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-10",
    "precio": "13,5",
    "cat_nombre": "PROGRES",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - salsa Big Mac - ceba caramel-lizada - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB POLLASTRE",
    "en_nombre": "PROGRES",
    "en_descripcion": "Honey-mustard marinated chicken - Big Mac sauce - caramelized onions - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "PROGRES",
    "es_descripcion": "Pollo marinado con mostaza y miel - salsa Big Mac - cebolla caramelizada - queso Edam.",
    "es_categoria": "FOCACCIAS DE POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-11",
    "precio": "12",
    "cat_nombre": "DE LA REVOLUCIO",
    "cat_descripcion": "Stracciatella - crema de festucs - mortadella italiana.",
    "cat_categoria": "FOCACCIAS AMB EMBOTITS",
    "en_nombre": "DE LA REVOLUCIÓN",
    "en_descripcion": "Stracciatella - Pistachio cream - Italian mortadella.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "DE LA REVOLUCIÓN",
    "es_descripcion": "Stracciatella - crema de pistacho - mortadella Italiana.",
    "es_categoria": "FOCACCIAS DE EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-12",
    "precio": "9,50",
    "cat_nombre": "MOZART",
    "cat_descripcion": "Crema de pesto - pernil dolç - formatge Edam.",
    "cat_categoria": "FOCACCIAS AMB EMBOTITS",
    "en_nombre": "MOZART",
    "en_descripcion": "Pesto Cream - Cooked ham - Edam cheese.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "MOZART",
    "es_descripcion": "Crema de pesto - jamón dulce -queso Edam",
    "es_categoria": "FOCACCIAS DE EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-13",
    "precio": "13",
    "cat_nombre": "RASPALL",
    "cat_descripcion": "Crema de pesto - stracciatella - tomàquets confitats -  prosciutto - ruca.",
    "cat_categoria": "FOCACCIAS AMB EMBOTITS",
    "en_nombre": "RASPALL",
    "en_descripcion": "Pesto cream - stracciatella - prosciutto - confit tomatoes -arugula.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "RASPALL",
    "es_descripcion": "Crema de pesto - stracciatella - prosciutto - tomates confitados - rúcula",
    "es_categoria": "FOCACCIAS DE EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-14",
    "precio": "11",
    "cat_nombre": "VERDI",
    "cat_descripcion": "Hummus de remolatxa - cebes caramel·litzades - tomàquets confitats - ruca.",
    "cat_categoria": "FOCÀCCIES VEGANES",
    "en_nombre": "VERDI",
    "en_descripcion": "Beet hummus - caramelized onions - confit tomatoes - arugula.",
    "en_categoria": "VEGAN FOCACCIAS",
    "es_nombre": "VERDI",
    "es_descripcion": "Hummus de remolacha - cebollas Caramelizadas - tomates confitados - rúcula.",
    "es_categoria": "FOCACCIAS VEGANAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-15",
    "precio": "12",
    "cat_nombre": "BONAVISTA",
    "cat_descripcion": "Mostassa dolça - peres caramel·litzades amb canyella - nous - ruca (Suggeriment: Extra de formatge Roquefort + 1,50 €)",
    "cat_categoria": "FOCÀCCIES VEGANES",
    "en_nombre": "BONAVISTA",
    "en_descripcion": "Sweet mustard - cinnamon caramelized pears - walnuts - arugula  (Suggested: Extra Roquefort cheese + €1.50)",
    "en_categoria": "VEGAN FOCACCIAS",
    "es_nombre": "BONAVISTA",
    "es_descripcion": "Mostaza dulce - peras caramelizadas con canela - nueces - rúcula (Sugerencia: Extra Queso Roquefort + €1,50)",
    "es_categoria": "FOCACCIAS VEGANAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-16",
    "precio": "12",
    "cat_nombre": "FONTANA",
    "cat_descripcion": "Cremós de bolets - tomàquets confitats - straciatella - ruca.",
    "cat_categoria": "FOCÀCCIES VEGETARIANES",
    "en_nombre": "FONTANA",
    "en_descripcion": "Creamy oyster mushrooms - confit tomatoes - stracciatella - arugula.",
    "en_categoria": "VEGETARIAN FOCACCIAS",
    "es_nombre": "FONTANA",
    "es_descripcion": "Crema de setas - tomates confitados - straciatella - rúcula.",
    "es_categoria": "FOCACCIAS VEGETARIANAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-17",
    "precio": "12",
    "cat_nombre": "TEROL",
    "cat_descripcion": "Crema de pesto - stracciatella - carbassó - ruca.",
    "cat_categoria": "FOCÀCCIES VEGETARIANES",
    "en_nombre": "TEROL",
    "en_descripcion": "Pesto cream - stracciatella - zucchini - arugula.",
    "en_categoria": "VEGETARIAN FOCACCIAS",
    "es_nombre": "TEROL",
    "es_descripcion": "Crema de pesto - stracciatella - calabacín - rúcula.",
    "es_categoria": "FOCACCIAS VEGETARIANAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-18",
    "precio": "15",
    "cat_nombre": "RIERA",
    "cat_descripcion": "Crema de bolets - xampinyons marinats - formatge brie - coleslaw.",
    "cat_categoria": "FOCÀCCIES VEGETARIANES",
    "en_nombre": "RIERA",
    "en_descripcion": "Creamy mushroom sauce - marinated mushrooms - Brie cheese - coleslaw.",
    "en_categoria": "VEGETARIAN FOCACCIAS",
    "es_nombre": "RIERA",
    "es_descripcion": "Crema de setas - champiñones marinados  - queso brie - coleslaw.",
    "es_categoria": "FOCACCIAS VEGETARIANAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-19",
    "precio": "3.5",
    "cat_nombre": "OLIVES VERDES",
    "cat_descripcion": "",
    "cat_categoria": "ENTRANTS",
    "en_nombre": "GREEN OLIVES",
    "en_descripcion": "",
    "en_categoria": "STARTERS",
    "es_nombre": "OLIVAS VERDES",
    "es_descripcion": "",
    "es_categoria": "ENTRANTES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-20",
    "precio": "5.4",
    "cat_nombre": "HUMMUS CLÀSSIC",
    "cat_descripcion": "Hummus de cigrons amb nachos de blat de moro cruixents  (Sense gluten)",
    "cat_categoria": "ENTRANTS",
    "en_nombre": "CLASSIC HUMMUS",
    "en_descripcion": "Classic hummus with crispy corn nachos  (Gluten-free)",
    "en_categoria": "STARTERS",
    "es_nombre": "HUMMUS CLÁSICO",
    "es_descripcion": "Hummus de garbanzos  con crujientes nachos de maiz (Sin gluten).",
    "es_categoria": "ENTRANTES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-21",
    "precio": "5.9",
    "cat_nombre": "HUMMUS ROSA",
    "cat_descripcion": "Hummus de remolatxa amb nachos de blat de moro cruixents  (Sense gluten)",
    "cat_categoria": "ENTRANTS",
    "en_nombre": "PINK HUMMUS",
    "en_descripcion": "beet hummus with crispy corn nachos  (Gluten-free).",
    "en_categoria": "STARTERS",
    "es_nombre": "HUMMUS ROSA",
    "es_descripcion": "Hummus de remolacha con crujientes nachos de maiz (Sin gluten).",
    "es_categoria": "ENTRANTES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-22",
    "precio": "6.5",
    "cat_nombre": "SARDINES EN OLI D´OLIVA",
    "cat_descripcion": "Servides amb torradetes multicereal cruixents.",
    "cat_categoria": "ENTRANTS",
    "en_nombre": "SARDINES IN OLIVE OIL",
    "en_descripcion": "Served with crispy multigrain toast.",
    "en_categoria": "STARTERS",
    "es_nombre": "SARDINAS EN ACEITE DE OLIVA",
    "es_descripcion": "Servida con tostaditas multicereal cruijientes.",
    "es_categoria": "ENTRANTES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-23",
    "precio": "7.95",
    "cat_nombre": "STRACCIATELLA ESTIL MEDITERRANI",
    "cat_descripcion": "Servida amb tomáquets confitats i torradetes multicereal cruixents.",
    "cat_categoria": "ENTRANTS",
    "en_nombre": "MEDITERRANEAN-STYLE STRACCIATELLA",
    "en_descripcion": "Servedwith confit tomatoes and crispy multigrain toast.",
    "en_categoria": "STARTERS",
    "es_nombre": "STRACCIATELLA AL ESTILO MEDITERRÁNEO",
    "es_descripcion": "Acompañada de tomates confitados y tostaditas multicereal.",
    "es_categoria": "ENTRANTES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-24",
    "precio": "2.7",
    "cat_nombre": "XOCODATIL",
    "cat_descripcion": "Datil amb mantega de mani - Xocolata - Festucs.",
    "cat_categoria": "POSTRES",
    "en_nombre": "CHOCODATE",
    "en_descripcion": "Date - Peanut butter - Chocolate - Pistachios.",
    "en_categoria": "DESSERTS",
    "es_nombre": "CHOCODATIL",
    "es_descripcion": "Dátil con mantequilla de maní - chocolate - pistacho.",
    "es_categoria": "POSTRES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-25",
    "precio": "5.5",
    "cat_nombre": "BROWNIE",
    "cat_descripcion": "Brownie amb dulce de leche i pistatxos",
    "cat_categoria": "POSTRES",
    "en_nombre": "BROWNIE",
    "en_descripcion": "Brownie with dulce de leche and pistachios.",
    "en_categoria": "DESSERTS",
    "es_nombre": "BROWNIE",
    "es_descripcion": "Brownie con dulce de leche y pistacho.",
    "es_categoria": "POSTRES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-26",
    "precio": "4",
    "cat_nombre": "ALFAJOR",
    "cat_descripcion": "Alfajor de dulce de leche i nous",
    "cat_categoria": "POSTRES",
    "en_nombre": "ALFAJOR",
    "en_descripcion": "Dulce de leche and walnut alfajor.",
    "en_categoria": "DESSERTS",
    "es_nombre": "ALFAJOR",
    "es_descripcion": "Alfajor de dulce de leche y nuez.",
    "es_categoria": "POSTRES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-27",
    "precio": "2,30",
    "cat_nombre": "AIGUA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "WATER",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "AGUA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-28",
    "precio": "2,7",
    "cat_nombre": "AIGUA AMB GAS",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "SPARKLING WATER",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "AGUA CON GAS",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-29",
    "precio": "2,85",
    "cat_nombre": "NESTEA LLIMONA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "NESTEA LEMON",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "NESTEA LIMÓN",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-30",
    "precio": "2,90",
    "cat_nombre": "SPRITE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "SPRITE",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "SPRITE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-31",
    "precio": "2,90",
    "cat_nombre": "COCA COLA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "COCA COLA",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "COCA COLA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-32",
    "precio": "2,90",
    "cat_nombre": "COCA COLA ZERO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "COCA COLA ZERO",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "COCA COLA ZERO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-33",
    "precio": "3",
    "cat_nombre": "COPA ESTRELLA",
    "cat_descripcion": "CANYA",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "BIG GLASS OF ESTRELLA",
    "en_descripcion": "GLASS",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "COPA ESTRELLA",
    "es_descripcion": "CAÑA",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-34",
    "precio": "3",
    "cat_nombre": "COPA TURIA",
    "cat_descripcion": "CANYA",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "BIG GLASS OF TURIA",
    "en_descripcion": "GLASS",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "COPA TURIA",
    "es_descripcion": "CAÑA",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-35",
    "precio": "2,20",
    "cat_nombre": "CANYETA ESTRELLA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "SMALL GLASS ESTRELLA",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "CAÑITA ESTRELLA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-36",
    "precio": "2,20",
    "cat_nombre": "CANYETA TURIA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "SMALL GLASS TURIA",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "CAÑITA TURIA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-37",
    "precio": "3,3",
    "cat_nombre": "DAURA",
    "cat_descripcion": "CERVESA SENSE GLUTEN",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "DAURA",
    "en_descripcion": "GLUTEN FREE BEER",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "DAURA",
    "es_descripcion": "CERVEZA SIN GLUTEN",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-38",
    "precio": "3,3",
    "cat_nombre": "FREE DAMM LAGER",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "FREE DAMM LAGER",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "FREE DAMM LAGER",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-39",
    "precio": "3,30",
    "cat_nombre": "DAMM LEMON",
    "cat_descripcion": "CLARA",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "DAMM LEMON",
    "en_descripcion": "BEER WITH LEMON",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "DAMM LEMON",
    "es_descripcion": "CLARA",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-40",
    "precio": "4",
    "cat_nombre": "NEGRE D´ESTIU",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "WINE COOLER",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "TINTO DE VERANO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-41",
    "precio": "3,20",
    "cat_nombre": "VERMÚ",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "VERMOUTH",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "VERMÚ",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-42",
    "precio": "8",
    "cat_nombre": "FERNET",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "FERNET",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "FERNET",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-43",
    "precio": "8",
    "cat_nombre": "GIN TONIC",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES AMB ALCOHOL",
    "en_nombre": "GIN TONIC",
    "en_descripcion": "",
    "en_categoria": "DRINKS ALCOHOL",
    "es_nombre": "GIN TONIC",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CON ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-44",
    "precio": "3,50",
    "cat_nombre": "COPA VI NEGRE",
    "cat_descripcion": "",
    "cat_categoria": "VI",
    "en_nombre": "GLASS OF RED WINE",
    "en_descripcion": "GLASS",
    "en_categoria": "WINE",
    "es_nombre": "VINO TINTO DE LA CASA",
    "es_descripcion": "",
    "es_categoria": "VINOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-45",
    "precio": "3,50",
    "cat_nombre": "COPA VIU BLANC",
    "cat_descripcion": "",
    "cat_categoria": "VI",
    "en_nombre": "GLASS OF WHITE WINE",
    "en_descripcion": "GLASS",
    "en_categoria": "WINE",
    "es_nombre": "VINO BLANCO DE LA CASA",
    "es_descripcion": "",
    "es_categoria": "VINOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-46",
    "precio": "5 \n 25",
    "cat_nombre": "FIGA",
    "cat_descripcion": "Garnacha negra 70%, Cariñena",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "FIGA",
    "en_descripcion": "Garnacha negra 70%, Cariñena",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "FIGA",
    "es_descripcion": "Garnacha negra 70%, Cariñena",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-47",
    "precio": "24",
    "cat_nombre": "CURUBA",
    "cat_descripcion": "Garnacha blanca",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "CURUBA",
    "en_descripcion": "Garnacha blanca",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "CURUBA",
    "es_descripcion": "Garnacha blanca",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-48",
    "precio": "4.5 \n 23",
    "cat_nombre": "OH! BLANCO",
    "cat_descripcion": "Moscatel",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "OH! WHITE",
    "en_descripcion": "Moscatel",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "OH! BLANCO",
    "es_descripcion": "Moscatel",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-49",
    "precio": "5 \n 25",
    "cat_nombre": "OH! ORANGE",
    "cat_descripcion": "Garnacha Blanca",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "OH! ORANGE",
    "en_descripcion": "Garnacha Blanca",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "OH! ORANGE",
    "es_descripcion": "Garnacha Blanca",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-50",
    "precio": "4.5 \n 24",
    "cat_nombre": "OH! ROJO",
    "cat_descripcion": "Garnacha Negra",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "OH! RED",
    "en_descripcion": "Garnacha Negra",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "OH! ROJO",
    "es_descripcion": "Garnacha Negra",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-51",
    "precio": "23",
    "cat_nombre": "1R BLANCO",
    "cat_descripcion": "Cartoixà",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "1R WHITE WINE",
    "en_descripcion": "Cartoixà",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "1R BLANCO",
    "es_descripcion": "Cartoixà",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-52",
    "precio": "23",
    "cat_nombre": "2N TINTO",
    "cat_descripcion": "Garnacha Negra",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "2N RED WINE",
    "en_descripcion": "Garnacha Negra",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "2N TINTO",
    "es_descripcion": "Garnacha Negra",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-53",
    "precio": "25",
    "cat_nombre": "3ER ORANGE",
    "cat_descripcion": "Cartoixà Vermell",
    "cat_categoria": "VINS NATURALS",
    "en_nombre": "3ER ORANGE WINE",
    "en_descripcion": "",
    "en_categoria": "NATURAL WINES",
    "es_nombre": "3ER ORANGE",
    "es_descripcion": "",
    "es_categoria": "VINOS NATURALES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-54",
    "precio": "8",
    "cat_nombre": "AVOCADO TOAST - VEGAN",
    "cat_descripcion": "Pa de llavors torrat, alvocat, tomàquets cherry, brots d'alfals, oli de pesto.\nOU ESCALFAT EXTRA 2 €",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "AVOCADO TOAST - VEGAN",
    "en_descripcion": "Toasted seeded bread, avocado, cherry tomatoes, alfalfa sprouts, pesto oil.\nEXTRA POACHED EGG €2",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "AVOCADO TOAST - VEGAN",
    "es_descripcion": "Pan de semillas tostado, aguacate, tomates cherry, brotes de alfalfa, aceite de pesto.\nEXTRA HUEVO POCHÉ 2€",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-55",
    "precio": "8.5",
    "cat_nombre": "PINK TOAST - VEGAN",
    "cat_descripcion": "Pa de llavors torrat, hummus de remolatxa, alvocat, brots d'alfals, reducció de vinagre balsàmic.\nOU ESCALFAT EXTRA 2 €",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "PINK TOAST - VEGAN",
    "en_descripcion": "Toasted seeded bread, beetroot hummus, avocado, alfalfa sprouts, balsamic reduction.\nEXTRA POACHED EGG €2",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "PINK TOAST - VEGAN",
    "es_descripcion": "Pan de semillas tostado, hummus de remolacha, aguacate, brotes de alfalfa, reduccion de balsámico.\nEXTRA HUEVO POCHÉ 2€",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-56",
    "precio": "10",
    "cat_nombre": "PROSCIUTTO TOAST",
    "cat_descripcion": "Pa de llavors torrat, stracciatella, ruca, prosciutto, tomàquets confitats, oli de pesto.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "PROSCIUTTO TOAST",
    "en_descripcion": "Toasted seeded bread, stracciatella, arugula, prosciutto, confit cherry tomatoes, pesto oil.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "PROSCIUTTO TOAST",
    "es_descripcion": "Pan de semillas tostado, straciatella, rúcula, prosciutto, tomates confitados, aceite de pesto",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-57",
    "precio": "11,5",
    "cat_nombre": "NORDIC PLATE - VEGGIE",
    "cat_descripcion": "Ou escalfat, alvocat, pernil dolç, hummus clàssic, hummus de remolatxatomàquets cherry, olives, cogombrets, ruca amb brots d'alfals, oli de pesto i pa de llavors.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "NORDIC PLATE - VEGGIE",
    "en_descripcion": "Poached egg, avocado, cooked ham, classic hummus, beetroot hummus, cherry tomatoes, olives, pickles, arugula and alfalfa sprouts, pesto oil, and seeded bread.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "NORDIC PLATE - VEGGIE",
    "es_descripcion": "Huevo poché, aguacate, jamón dulce, hummus clásico, hummus de remolacha, tomates cherry, aceitunas, pepinillos, rúcula con brotes de alfalfa, aceite de pesto y pan de semillas.\nEXTRA HUMMUS 1,5€",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-58",
    "precio": "6,9",
    "cat_nombre": "PEANUT BERRY BANANA TOAST - VEGAN",
    "cat_descripcion": "Pa de llavors torrat, mantega de cacauet, melmelada de gerds i plàtan.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "PEANUT BERRY BANANA TOAST - VEGAN",
    "en_descripcion": "Toasted seeded bread, peanut butter, raspberry jam, and banana.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "PEANUT BERRY BANANA TOAST - VEGAN",
    "es_descripcion": "Pan de semillas tostado, mantequilla de cacahuete, mermelada de frambuesa y banana.",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-59",
    "precio": "8.9",
    "cat_nombre": "BLUE CHIA BOWL - VEGAN Y SIN GLUTEN",
    "cat_descripcion": "Púding de xia amb espirulina blava, plàtan i una altra fruita de temporada, nous, coco ratllat, mantega de cacauet i xarop d'atzavara.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "BLUE CHIA BOWL - VEGAN Y SIN GLUTEN",
    "en_descripcion": "Blue spirulina chia pudding with banana, seasonal fruit, walnuts, shredded coconut, peanut butter, and agave syrup.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "BLUE CHIA BOWL - VEGAN Y SIN GLUTEN",
    "es_descripcion": "Chía pudding con espirulina azul, banana y otra fruta de estación, nueces, coco rallado, mantequilla de cacahuete y agave.",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-60",
    "precio": "10,5",
    "cat_nombre": "AÇAI BOWL - VEGAN Y SIN GLUTEN",
    "cat_descripcion": "Base d'açaí, granola casolana sense gluten, plàtan, xarop d'atzavara, coco ratllat i mantega de cacauet.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "AÇAI BOWL - VEGAN Y SIN GLUTEN",
    "en_descripcion": "Açaí base, homemade gluten-free granola, banana, shredded coconut, and peanut butter.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "AÇAI BOWL - VEGAN Y SIN GLUTEN",
    "es_descripcion": "Base de açai, granola casera sin gluten, banana, coco rallado y mantequilla de cacahuete.",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-61",
    "precio": "8.5",
    "cat_nombre": "GREEK YOGURTH BOWL - VEGGIE Y SIN GLUTEN",
    "cat_descripcion": "Iogurt grec, granola casolana sense gluten, plàtan, fruita de temporada i mel.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "GREEK YOGURTH BOWL - VEGGIE Y SIN GLUTEN",
    "en_descripcion": "Greek yogurt, homemade gluten-free granola, banana, seasonal fruit, and honey.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "GREEK YOGURTH BOWL - VEGGIE Y SIN GLUTEN",
    "es_descripcion": "Yogurt griego, granola casera sin gluten, banana y otra fruta de estación y miel.",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-62",
    "precio": "6,5",
    "cat_nombre": "FRESH SMOOTHIE",
    "cat_descripcion": "Espinacs, plàtan, llimona i gingebre.",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "FRESH SMOOTHIE",
    "en_descripcion": "Spinach, banana, lemon, and ginger.",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "FRESH SMOOTHIE",
    "es_descripcion": "Espinaca, Banana, limón, jengibre",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-63",
    "precio": "6,9",
    "cat_nombre": "BERRYS SMOOTHIE",
    "cat_descripcion": "Plàtan, fruits vermells, xia i beguda vegetal d'ametlla.\n+ PROTEÏNA 1,50 €",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "BERRYS SMOOTHIE",
    "en_descripcion": "Banana, mixed berries, chia, and almond plant-based milk.\n+ PROTEIN €1.50",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "BERRYS SMOOTHIE",
    "es_descripcion": "Banana, frutos rojos, chìa, bebida vegetal de almendras\n+ PROTEINA 1,5€",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-64",
    "precio": "4,5",
    "cat_nombre": "SUC DE TORONJA",
    "cat_descripcion": "Suc de taronja natural acabat d’esprémer",
    "cat_categoria": "ESMORZARS · BRUNCH",
    "en_nombre": "ORANGE JUICE",
    "en_descripcion": "Freshly squeezed orange juice",
    "en_categoria": "BREAKFAST - BRUNCH",
    "es_nombre": "JUGO DE NARANJA",
    "es_descripcion": "Jugo de naranja exprimido natural",
    "es_categoria": "DESAYUNOS - BRUNCH",
    "local": "bolleria"
  },
  {
    "id": "POPIS-65",
    "precio": "1,90",
    "cat_nombre": "ESPRESSO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "ESPRESSO",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "ESPRESSO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-66",
    "precio": "2,40",
    "cat_nombre": "ESPRESSO DOBLE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "DOUBLE ESPRESSO",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "ESPRESSO DOBLE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-67",
    "precio": "2,40",
    "cat_nombre": "TALLAT",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "CORTADO",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "CORTADO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-68",
    "precio": "2,80",
    "cat_nombre": "AMERICANO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "AMERICANO",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "AMERICANO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-69",
    "precio": "2,90",
    "cat_nombre": "LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-70",
    "precio": "2,90",
    "cat_nombre": "CAPUCCINO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "CAPUCCINO",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "CAPUCCINO",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-71",
    "precio": "3,50",
    "cat_nombre": "FLAT WHITE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "FLAT WHITE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "FLAT WHITE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-72",
    "precio": "3,90",
    "cat_nombre": "MATCHA LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "MATCHA LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "MATCHA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-73",
    "precio": "4,40",
    "cat_nombre": "VAINILLA MATCHA LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "VAINILLA MATCHA LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "VAINILLA MATCHA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-74",
    "precio": "3,40",
    "cat_nombre": "LATTE DE VAINILLA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "VAINILLA LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "VAINILLA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-75",
    "precio": "3,40",
    "cat_nombre": "LATTE DE CARAMEL",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "CARAMEL LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "CARAMEL LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-76",
    "precio": "3,40",
    "cat_nombre": "LATTE DE MOCCA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "MOCCA LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "MOCCA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-77",
    "precio": "3,90",
    "cat_nombre": "XOCOLATA CALENTA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "HOT CHOCOLATE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "CHOCOLATE CALIENTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-78",
    "precio": "3,90",
    "cat_nombre": "CHAI LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "CHAI LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "CHAI LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-79",
    "precio": "4,40",
    "cat_nombre": "DIRTY CHAI LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "DIRTY CHAI LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "DIRTY CHAI LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-80",
    "precio": "2,40",
    "cat_nombre": "INFUSIÓ",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "INFUSION",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "INFUSIÓN",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-81",
    "precio": "3,50",
    "cat_nombre": "BATCH BREW",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "BATCH BREW",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "BATCH BREW",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-82",
    "precio": "3,90",
    "cat_nombre": "PURPLE LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "PURPLE LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "PURPLE LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-83",
    "precio": "3,90",
    "cat_nombre": "PINK LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "PINK LATTE",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "PINK LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-84",
    "precio": "3,70",
    "cat_nombre": "GOLDEN MILK",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES CALENTES",
    "en_nombre": "GOLDEN MILK",
    "en_descripcion": "",
    "en_categoria": "HOT BEVERAGES",
    "es_nombre": "GOLDEN MILK",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS CALIENTES",
    "local": "bolleria"
  },
  {
    "id": "POPIS-85",
    "precio": "4,50",
    "cat_nombre": "LATTE FRED",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-86",
    "precio": "4,80",
    "cat_nombre": "LATTE FRED DE VAINILLA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED VAINILLA LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED VAINILLA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-87",
    "precio": "4,80",
    "cat_nombre": "LATTE FRED DE CARAMEL",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED CARAMEL LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED CARAMEL LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-88",
    "precio": "4,80",
    "cat_nombre": "LATTE FRED DE MOCCA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED MOCCA LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED MOCCA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-89",
    "precio": "4,50",
    "cat_nombre": "XOCOLATE FREDA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED CHOCOLATE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED CHOCOLATE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-90",
    "precio": "4.7",
    "cat_nombre": "LATTE FRED DE MATCHA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED MATCHA LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED MATCHA LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-91",
    "precio": "5,00",
    "cat_nombre": "LATTE FRED DE VAINILLA MATCHA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "LATTE FRED DE VAINILLA MATCHA",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "LATTE FRED DE VAINILLA MATCHA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-92",
    "precio": "5,00",
    "cat_nombre": "MATCHA FRED DE GRANA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED GRANA MATCHA",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED GRANA MATCHA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-93",
    "precio": "5,00",
    "cat_nombre": "MATCHA FRED DE MANGO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED MANGO MATCHA",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED MANGO MATCHA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-94",
    "precio": "5,00",
    "cat_nombre": "MATCHA FRED DE COCO",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED COCONUT MATCHA",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED COCO MATCHA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-95",
    "precio": "4,70",
    "cat_nombre": "ICED CHAI LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED CHAI LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED CHAI LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-96",
    "precio": "5,20",
    "cat_nombre": "ICED DIRTY CHAI LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED DIRTY CHAI LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED DIRTY CHAI LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-97",
    "precio": "5",
    "cat_nombre": "ICED PURPLE LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED PURPLE LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED PURPLE LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-98",
    "precio": "5",
    "cat_nombre": "ICED PINK LATTE",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED PINK LATTE",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED PINK LATTE",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-99",
    "precio": "4,70",
    "cat_nombre": "ICED GOLDEN MILK",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ICED GOLDEN MILK",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ICED GOLDEN MILK",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-100",
    "precio": "4,5",
    "cat_nombre": "COLD BREW",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "COLD BREW",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "COLD BREW",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  }
]
// Filtro por local — usa la columna `local` del dato (focacceria | bolleria | ambos)
const menu_cargar = () => {
  const params = new URLSearchParams(window.location.search)
  const idioma = params.get('v') || localStorage.getItem('idioma_preferido') || sessionStorage.getItem('idioma') || 'es'
  const local = params.get('c') || sessionStorage.getItem('local') || 'todo'

  // Sincronizar preferencia con lo que se está mostrando
  localStorage.setItem('idioma_preferido', idioma)

  // Switcher de idioma en la esquina
  renderLangSwitcher(document.getElementById('lang-switcher'), idioma, (nuevo) => {
    const p = new URLSearchParams(window.location.search)
    p.set('v', nuevo)
    window.location.search = p.toString()
  })

  // Titulo del menu
  const titulo = locales_nombres[idioma] && locales_nombres[idioma][local] || 'Selecciona un menú'
  document.querySelector('#menu_titulo').textContent = titulo.toUpperCase()

  // Descripción del menu
  const descripciones = {
    es: "El pedido se hace en la barra",
    cat: "La comanda es fa a la barra",
    en: "Orders are placed at the bar"
  }

  document.querySelector('#descripcion_texto').textContent = descripciones[idioma] || descripciones.es

  // Agrupar items por local
  const locales = {}

  // Filtrar los items si el local no es 'todo'
  menu_datos.forEach(item => {
    // 'ambos' significa que el item aparece en las dos cartas
    if (local === 'todo' || item.local === local || item.local === 'ambos') {
      const key = item.local === 'ambos' ? local : item.local
      if (!locales[key]) locales[key] = []
      locales[key].push(item)
    }
  })

  // Limpiar el contenedor de menús previos
  const contenedor = document.querySelector('#menu_contenedor')
  contenedor.innerHTML = '' // Limpiar el contenedor

  // Crear un menú por local
  Object.entries(locales).forEach(([local_nombre, items]) => {
    const menuDiv = document.createElement('div')
    menuDiv.className = 'menu'
    menuDiv.id = `menu_${local_nombre}` // Asignar el id según el nombre del local

    // Crear categorías por idioma
    const categorias = {}
    items.forEach(item => {
      const key = item[`${idioma}_categoria`]
      if (!categorias[key]) categorias[key] = []
      categorias[key].push(item)
    })

    // Crear las categorías y los items
    Object.entries(categorias).forEach(([cat_nombre, items]) => {
      const categoriaDiv = document.createElement('div')
      categoriaDiv.className = 'menu_categoria'

      const tituloCategoria = document.createElement('h3')
      tituloCategoria.id = `menu_categoria_titulo_${local_nombre}`
      tituloCategoria.textContent = cat_nombre
      categoriaDiv.appendChild(tituloCategoria)

      const itemsContainer = document.createElement('div')
      itemsContainer.id = `menu_categoria_items_${local_nombre}`

      items.forEach(item => {
        const itemDiv = document.createElement('div')
        itemDiv.className = 'menu_categoria_item'

        const itemP = document.createElement('div')
        itemP.className = 'menu_categoria_item_p'

        const nombre = document.createElement('p')
        nombre.className = 'menu_item_nombre'
        nombre.textContent = item[`${idioma}_nombre`]

        const precio = document.createElement('p')
        precio.className = 'menu_item_precio'
        precio.textContent = `${item.precio} €`

        itemP.appendChild(nombre)
        itemP.appendChild(precio)

        const itemD = document.createElement('div')
        itemD.className = 'menu_categoria_item_d'

        const descripcion = document.createElement('p')
        descripcion.className = 'menu_item_descripcion'
        descripcion.textContent = item[`${idioma}_descripcion`] || ''

        itemD.appendChild(descripcion)

        itemDiv.appendChild(itemP)
        itemDiv.appendChild(itemD)

        itemsContainer.appendChild(itemDiv)
      })

      categoriaDiv.appendChild(itemsContainer)
      menuDiv.appendChild(categoriaDiv)
    })

    // Agregar el menú al contenedor
    contenedor.appendChild(menuDiv)
  })
}
