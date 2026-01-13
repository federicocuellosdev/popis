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
    focacceria: "Focacceria de Carne Ahumada",
    bolleria: "Café de Especialidad y Bollería",
    todo: "Focacceria de Carne Ahumada & Café de Especialidad y Bolería"
  },
  cat: {
    focacceria: "Focacceria de Carn Fumada",
    bolleria: "Cafè D'especialitat i Fleca",
    todo: "Focacceria de Carn Fumada & Cafè D'especialitat i Fleca"
  },
  en: {
    focacceria: "Smoked Meat Focacceria",
    bolleria: "Specialty Coffee and Bakery",
    todo: "Smoked Meat Focacceria & Specialty Coffee and Bakery"
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

// Menu
const menu_datos = [
    {
        "id": "POPIS-01",
        "precio": "12,50",
        "cat_nombre": "LESSEPS",
        "cat_descripcion": "Carn fumada - Crema de festucs - Ceba caramel·litzades.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "LESSEPS",
        "en_descripcion": "Smoked meat - Pistachio cream - Caramelized onions.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "LESSEPS",
        "es_descripcion": "Carne ahumada - Crema de pistachos - Cebollas Caramelizadas.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-02",
        "precio": "12,50",
        "cat_nombre": "DEL SOL",
        "cat_descripcion": "Carn fumada - Malbec glacejat - Cebes caramel·litzades.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "DEL SOL",
        "en_descripcion": "Smoked meat - Glazed Malbec - Caramelized onions.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "DEL SOL",
        "es_descripcion": "Carne ahumada - Malbec glaseado - Cebollas caramelizadas.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-03",
        "precio": "13.5",
        "cat_nombre": "DEL DIAMANT",
        "cat_descripcion": "Carn fumada - Pesto rosa - Albergínies en conserva - Mozarella fior di latte.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "DEL DIAMANT",
        "en_descripcion": "Smoked meat - Pink pesto - Preserved eggplants - Mozzarella fior di latte.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "DEL DIAMANT",
        "es_descripcion": "Carne ahumada - Pesto rosa - Berenjenas en conserva - Mozarella fior di latte.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-04",
        "precio": "13,50",
        "cat_nombre": "DE LA VIRREINA",
        "cat_descripcion": "Carn fumada - Crema de bolets - Pebrots en conserva - Coleslaw.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "DE LA VIRREINA",
        "en_descripcion": "Smoked meat - Creamy oyster mushrooms - Preserved peppers - Coleslaw.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "DE LA VIRREINA",
        "es_descripcion": "Carne ahumada - Cremoso de setas - Pimientos en conserva - Coleslaw.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-05",
        "precio": "13",
        "cat_nombre": "DE LA VILA",
        "cat_descripcion": "Carn fumada - Crema de pesto - Pebrots en conserva - Formatge.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "DE LA VILA",
        "en_descripcion": "Smoked meat - Pesto cream - Preserved peppers - Cheese.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "DE LA VILA",
        "es_descripcion": "Carne ahumada - Crema de pesto - Pimientos en conserva - Queso.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-06",
        "precio": "12,50",
        "cat_nombre": "LIBERTAT",
        "cat_descripcion": "Carn fumada - Salsa aioli - Pebrots en conserva - Mozarella fior di latte.",
        "cat_categoria": "FOCACCIAS AMB CARN FUMADA",
        "en_nombre": "LIBERTAD",
        "en_descripcion": "Smoked meat - Aioli sauce - Preserved peppers - Fior di latte mozzarella.",
        "en_categoria": "FOCACCIAS WITH SMOKED MEAT",
        "es_nombre": "LIBERTAD",
        "es_descripcion": "Carne ahumada - Salsa aioli - Pimientos en conserva - Mozarella fior di latte.",
        "es_categoria": "FOCACCIAS DE CARNE AHUMADA",
        "local": "focacceria"
    },
    {
        "id": "POPIS-07",
        "precio": "11,50",
        "cat_nombre": "ASTURIES",
        "cat_descripcion": "Pollastre marinat amb mostassa i mel - Crema de pesto - Coleslaw.",
        "cat_categoria": "FOCACCIAS AMB POLLASTRE",
        "en_nombre": "ASTURIES",
        "en_descripcion": "Marinated chicken with honey and mustard - Pesto cream - Coleslaw.",
        "en_categoria": "FOCACCIAS WITH CHICKEN",
        "es_nombre": "ASTURIES",
        "es_descripcion": "Pollo marinado con mostaza y miel - Crema de pesto - Coleslaw.",
        "es_categoria": "FOCACCIAS DE POLLO",
        "local": "focacceria"
    },
    {
        "id": "POPIS-08",
        "precio": "11",
        "cat_nombre": "TRAVESSERA",
        "cat_descripcion": "Pollastre marinat amb mostassa i mel - Aioli - Mescla d´enciams - Tomàquet - Formatge",
        "cat_categoria": "FOCACCIAS AMB POLLASTRE",
        "en_nombre": "TRAVESSERA",
        "en_descripcion": "Honey-mustard marinated chicken - Aioli sauce - Mixed greens - Tomato - Cheese",
        "en_categoria": "FOCACCIAS WITH CHICKEN",
        "es_nombre": "TRAVESSERA",
        "es_descripcion": "Pollo marinado con mostaza y miel - Salsa aioli - Mix de hojas verdes - Tomate - Queso",
        "es_categoria": "FOCACCIAS DE POLLO",
        "local": "focacceria"
    },
    {
        "id": "POPIS-09",
        "precio": "12,50",
        "cat_nombre": "PUIGMARTI",
        "cat_descripcion": "Pollastre marinat amb mostassa i mel - crema de festucs - tomàquets confitats - formatge",
        "cat_categoria": "FOCACCIAS AMB POLLASTRE",
        "en_nombre": "PUIGMARTI",
        "en_descripcion": "Honey-mustard marinated chicken - pistachio cream - confit tomatoes - cheese",
        "en_categoria": "FOCACCIAS WITH CHICKEN",
        "es_nombre": "PUIGMARTI",
        "es_descripcion": "Pollo marinado con mostaza y miel - crema de pistachos - tomates confitados - queso",
        "es_categoria": "FOCACCIAS DE POLLO",
        "local": "focacceria"
    },
    {
        "id": "POPIS-10",
        "precio": "11",
        "cat_nombre": "DE LA REVOLUCIO",
        "cat_descripcion": "Stracciatella - Crema de festucs - Mortadella italiana.",
        "cat_categoria": "FOCACCIAS AMB EMBOTITS",
        "en_nombre": "DE LA REVOLUCIÓN",
        "en_descripcion": "Stracciatella - Pistachio cream - Italian mortadella.",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "DE LA REVOLUCIÓN",
        "es_descripcion": "Stracciatella - Crema de pistachos - Mortadella Italiana.",
        "es_categoria": "FOCACCIAS DE EMBUTIDOS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-11",
        "precio": "9,50",
        "cat_nombre": "MOZART",
        "cat_descripcion": "Crema de pesto - Pernil dolç - Mozzarella fior di latte",
        "cat_categoria": "FOCACCIAS AMB EMBOTITS",
        "en_nombre": "MOZART",
        "en_descripcion": "Pesto Cream - Cooked ham - Mozzarella fior di latte",
        "en_categoria": "FOCACCIAS WITH CHARCUTERIE",
        "es_nombre": "MOZART",
        "es_descripcion": "Crema de pesto - Jamón dulce - Mozzarella fior di latte",
        "es_categoria": "FOCACCIAS DE EMBUTIDOS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-12",
        "precio": "10",
        "cat_nombre": "POBLE ROMANÍ",
        "cat_descripcion": "Salsa aioli - Tomàquets confitats - Formatge - Pernil cuit.",
        "cat_categoria": "FOCACCIAS AMB EMBOTITS",
        "en_nombre": "POBLE ROMANÍ",
        "en_descripcion": "Aioli sauce - Confit tomatoes - Cheese - Cooked ham.",
        "en_categoria": "FOCACCIAS WITH CHARCUTERIE",
        "es_nombre": "POBLE ROMANÍ",
        "es_descripcion": "Salsa aioli - Tomates confitados - Queso - Jamón dulce.",
        "es_categoria": "FOCACCIAS DE EMBUTIDOS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-13",
        "precio": "12.5",
        "cat_nombre": "RASPALL",
        "cat_descripcion": "Crema de pesto - Stracciatella - Tomàquets confitats -  Prosciutto - Mescla d´enciams.",
        "cat_categoria": "FOCACCIAS AMB EMBOTITS",
        "en_nombre": "RASPALL",
        "en_descripcion": "Pesto cream - Stracciatella - Prosciutto - Confit tomatoes - Mixed greens.",
        "en_categoria": "FOCACCIAS WITH CHARCUTERIE",
        "es_nombre": "RASPALL",
        "es_descripcion": "Crema de pesto - Stracciatella - Prosciutto - Tomates confitados - Mix de hojas verdes.",
        "es_categoria": "FOCACCIAS DE EMBUTIDOS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-14",
        "precio": "11",
        "cat_nombre": "JOANIC",
        "cat_descripcion": "Pesto rosa - Coleslaw - Mozarella fior di latte - Pernil cuit.",
        "cat_categoria": "FOCACCIAS AMB EMBOTITS",
        "en_nombre": "JOANIC",
        "en_descripcion": "Pink pesto - Coleslaw - Mozzarella fior di latte - Cooked ham.",
        "en_categoria": "FOCACCIAS WITH CHARCUTERIE",
        "es_nombre": "JOANIC",
        "es_descripcion": "Pesto rosa - Coleslaw - Mozarella fior di latte - Jamón dulce.",
        "es_categoria": "FOCACCIAS DE EMBUTIDOS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-15",
        "precio": "10.5",
        "cat_nombre": "VERDI (VEGANA)",
        "cat_descripcion": "Hummus de remolatxa - Cebes caramel·litzades - Tomàquets confitats - Mescla d´enciams.",
        "cat_categoria": "FOCACCIAS VEGGIES",
        "en_nombre": "VERDI (VEGANA)",
        "en_descripcion": "Beet hummus - Caramelized onions - Confit tomatoes - Mixed greens.",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "VERDI (VEGANA)",
        "es_descripcion": "Hummus de remolacha - Cebollas Caramelizadas - Tomates confitados - Mix de hojas verdes.",
        "es_categoria": "FOCACCIAS VEGGIES",
        "local": "focacceria"
    },
    {
        "id": "POPIS-16",
        "precio": "10.5",
        "cat_nombre": "FONTANA",
        "cat_descripcion": "Cremós de bolets - Tomàquets confitats - Straciatella - Mescla d´enciams.",
        "cat_categoria": "FOCACCIAS VEGGIES",
        "en_nombre": "FONTANA",
        "en_descripcion": "Creamy oyster mushrooms - Confit tomatoes - Stracciatella - Mixed greens.",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "FONTANA",
        "es_descripcion": "Cremoso de setas - Tomates confitados - Straciatella - Mix de hojas verdes.",
        "es_categoria": "FOCACCIAS VEGGIES",
        "local": "focacceria"
    },
    {
        "id": "POPIS-17",
        "precio": "10.5",
        "cat_nombre": "DEL CAMP",
        "cat_descripcion": "Albergínies en conserva - Hummus de remolatxa - Formatge - Mescla d´enciams.",
        "cat_categoria": "FOCACCIAS VEGGIES",
        "en_nombre": "DEL CAMP",
        "en_descripcion": "Preserved eggplants - Beet hummus - Cheese - Mixed greens.",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "DEL CAMP",
        "es_descripcion": "Berenjenas en conserva - Hummus de remolacha - Queso - Mix de hojas verdes.",
        "es_categoria": "FOCACCIAS VEGGIES",
        "local": "focacceria"
    },
    {
        "id": "POPIS-18",
        "precio": "3",
        "cat_nombre": "OLIVES VERDES",
        "cat_descripcion": "",
        "cat_categoria": "TAPES",
        "en_nombre": "GREEN OLIVES",
        "en_descripcion": "",
        "en_categoria": "TAPAS",
        "es_nombre": "OLIVAS VERDES",
        "es_descripcion": "",
        "es_categoria": "TAPAS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-19",
        "precio": "5",
        "cat_nombre": "HUMMUS CLÀSSIC",
        "cat_descripcion": "Hummus clàssic amb el nostre pa de focaccia  (consulta l’opció sense gluten)",
        "cat_categoria": "TAPES",
        "en_nombre": "CLASSIC HUMMUS",
        "en_descripcion": "Classic hummus with our focaccia bread (ask for gluten-free options).",
        "en_categoria": "TAPAS",
        "es_nombre": "HUMMUS CLÁSICO",
        "es_descripcion": "Hummus de garbanzos con nuestro pan de focaccia (consulta opción sin gluten).",
        "es_categoria": "TAPAS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-20",
        "precio": "5.5",
        "cat_nombre": "HUMMUS ROSA",
        "cat_descripcion": "Hummus de remolatxa amb el nostre pa de focaccia  (consulta 'opció sense gluten)",
        "cat_categoria": "TAPES",
        "en_nombre": "PINK HUMMUS",
        "en_descripcion": "beet hummus with our focaccia bread  (ask for gluten-free options).",
        "en_categoria": "TAPAS",
        "es_nombre": "HUMMUS ROSA",
        "es_descripcion": "Hummus de remolacha con nuestro pan de focaccia (consulta opción sin gluten).",
        "es_categoria": "TAPAS",
        "local": "focacceria"
    },
    {
        "id": "POPIS-21",
        "precio": "2,9",
        "cat_nombre": "XOCODATIL",
        "cat_descripcion": "Datil amb mantega de mani - Xocolata - Festucs.",
        "cat_categoria": "POSTRES",
        "en_nombre": "CHOCODATE",
        "en_descripcion": "Date - Peanut butter - Chocolate - Pistachios.",
        "en_categoria": "DESSERTS",
        "es_nombre": "CHOCODATIL",
        "es_descripcion": "Datil con mantequilla de maní - Chocolate - Pistachos.",
        "es_categoria": "POSTRES",
        "local": "focacceria"
    },
    {
        "id": "POPIS-22",
        "precio": "2,5",
        "cat_nombre": "TRUFES DE L'ÀVIA",
        "cat_descripcion": "Trufes d´ avena i dulce de leche.",
        "cat_categoria": "POSTRES",
        "en_nombre": "GRANDMA'S TRUFFLES",
        "en_descripcion": "Oatmeal and dulce de leche truffles.",
        "en_categoria": "DESSERTS",
        "es_nombre": "TRUFAS DE LA ABUELA",
        "es_descripcion": "Trufas de avena y dulce de leche.",
        "es_categoria": "POSTRES",
        "local": "focacceria"
    },
    {
        "id": "POPIS-23",
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
        "id": "POPIS-24",
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
        "id": "POPIS-25",
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
        "id": "POPIS-26",
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
        "id": "POPIS-27",
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
        "id": "POPIS-28",
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
        "id": "POPIS-29",
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
        "id": "POPIS-30",
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
        "id": "POPIS-31",
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
        "id": "POPIS-32",
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
        "id": "POPIS-33",
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
        "id": "POPIS-34",
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
        "id": "POPIS-35",
        "precio": "3,3",
        "cat_nombre": "VOLL DAMM",
        "cat_descripcion": "",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "VOLL DAMM",
        "en_descripcion": "",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "VOLL DAMM",
        "es_descripcion": "",
        "es_categoria": "BEBIDAS CON ALCOHOL",
        "local": "focacceria"
    },
    {
        "id": "POPIS-36",
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
        "id": "POPIS-37",
        "precio": "3,50",
        "cat_nombre": "COPA VI NEGRE",
        "cat_descripcion": "",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "GLASS OF RED WINE",
        "en_descripcion": "GLASS",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "COPA VINO TINTO",
        "es_descripcion": "",
        "es_categoria": "BEBIDAS CON ALCOHOL",
        "local": "focacceria"
    },
    {
        "id": "POPIS-38",
        "precio": "3,50",
        "cat_nombre": "COPA VIU BLANC",
        "cat_descripcion": "",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "GLASS OF WHITE WINE",
        "en_descripcion": "GLASS",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "COPA VIVO BLANCO",
        "es_descripcion": "",
        "es_categoria": "BEBIDAS CON ALCOHOL",
        "local": "focacceria"
    },
    {
        "id": "POPIS-39",
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
        "id": "POPIS-40",
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
        "id": "POPIS-41",
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
        "id": "POPIS-42",
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
        "id": "POPIS-43",
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
        "id": "POPIS-44",
        "precio": "2,50",
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
        "id": "POPIS-45",
        "precio": "2,30",
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
        "id": "POPIS-46",
        "precio": "2,70",
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
        "id": "POPIS-47",
        "precio": "2,80",
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
        "id": "POPIS-48",
        "precio": "2,80",
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
        "id": "POPIS-49",
        "precio": "3,20",
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
        "id": "POPIS-50",
        "precio": "3,80",
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
        "id": "POPIS-51",
        "precio": "3,10",
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
        "id": "POPIS-52",
        "precio": "3,10",
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
        "id": "POPIS-53",
        "precio": "3,40",
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
        "id": "POPIS-54",
        "precio": "0,6",
        "cat_nombre": "EXTRA SHOT",
        "cat_descripcion": "",
        "cat_categoria": "BEGUDES CALENTES",
        "en_nombre": "EXTRA SHOT",
        "en_descripcion": "",
        "en_categoria": "HOT BEVERAGES",
        "es_nombre": "EXTRA SHOT",
        "es_descripcion": "",
        "es_categoria": "BEBIDAS CALIENTES",
        "local": "bolleria"
    },
    {
        "id": "POPIS-55",
        "precio": "3,60",
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
        "id": "POPIS-56",
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
        "id": "POPIS-57",
        "precio": "3,30",
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
        "id": "POPIS-58",
        "precio": "4",
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
        "id": "POPIS-59",
        "precio": "4,10",
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
        "id": "POPIS-60",
        "precio": "4,10",
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
        "id": "POPIS-61",
        "precio": "4,10",
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
        "id": "POPIS-62",
        "precio": "4,20",
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
        "id": "POPIS-63",
        "precio": "4,60",
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
        "id": "POPIS-64",
        "precio": "4,60",
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
        "id": "POPIS-65",
        "precio": "4,60",
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
        "id": "POPIS-66",
        "precio": "4,10",
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
        "id": "POPIS-67",
        "precio": "0,6",
        "cat_nombre": "EXTRA SHOT",
        "cat_descripcion": "",
        "cat_categoria": "BEGUDES FREDES",
        "en_nombre": "EXTRA SHOT",
        "en_descripcion": "",
        "en_categoria": "COLD DRINKS",
        "es_nombre": "EXTRA SHOT",
        "es_descripcion": "",
        "es_categoria": "BEBIDAS FRIAS",
        "local": "bolleria"
    }
]

const menu_cargar = () => {
  const params = new URLSearchParams(window.location.search)
  const idioma = sessionStorage.getItem('menu') || params.get('v') || 'es'
  const local = sessionStorage.getItem('local') || params.get('c') || 'todo'  // Usar 'todo' si no hay valor

  // Titulo del menu
  const titulo = locales_nombres[idioma] && locales_nombres[idioma][local] || 'Selecciona un menú'
  document.querySelector('#menu_titulo').textContent = titulo.toUpperCase()

  // Descripción del menu
  const descripciones = {
    es: "Realizar pedido en caja",
    cat: "Realitzar la comanda a caixa",
    en: "Place order at checkout"

  }

  document.querySelector('#descripcion_texto').textContent = (descripciones[idioma] || "Realizar pedido en caja").toUpperCase()

  // Agrupar items por local
  const locales = {}

  // Filtrar los items si el local no es 'todo'
  menu_datos.forEach(item => {
    // Si el valor de local es 'todo', agregar todos los items
    if (local === 'todo' || item.local === local) {
      const key = item.local
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
