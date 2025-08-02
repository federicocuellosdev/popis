// Título principal dinámico
const palabras = [
  'Bienvenido',   // Español
  'Benvinguts',   // Catalan
  'Welcome',      // Inglés
  'Benvenuto',    // Italiano
  'Willkommen',   // Alemán
  'Bienvenue'     // Francés
]

const locales_nombres = {
  es: {
    focacceria: "Focacceria de carne ahumada",
    bolleria: "Café de especialidad y panadería",
    todo: "Focacceria de carne ahumada & Café de especialidad y panadería"
  },
  cat: {
    focacceria: "Focacceria de carn fumada",
    bolleria: "Cafè d'especialitat i fleca",
    todo: "Focacceria de carn fumada & Cafè d'especialitat i fleca"
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
  if (sessionStorage.getItem('menu')) {
    const bienvenido = {
      es: "Bienvenido",
      cat: "Benvinguts",
      en: "Welcome"
    }
    document.getElementById('typing').textContent = bienvenido[sessionStorage.getItem('menu')]
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
  document.getElementById('typing').textContent = titulos[idioma]

}

const menu = (v, c) => {
  if ('menu' === c) {
    sessionStorage.removeItem('local')
    sessionStorage.setItem('menu', v)
    document.querySelector('#menu-idioma').classList.add('hide')
    document.querySelector('#menu-local').classList.remove('hide')

    const idioma = sessionStorage.getItem('menu') || 'es'
    menu_seleccion(idioma)

    // Cambiar los títulos de los botones según el idioma
    document.querySelector('#direccion').remove()
    document.querySelector('#menu-local-focacceria').textContent = locales_nombres[idioma].focacceria;
    document.querySelector('#menu-local-bolleria').textContent = locales_nombres[idioma].bolleria;
  }

  if ('local' === c) {
    sessionStorage.setItem('local', v)
  }

  // Si no se ha seleccionado el idioma o el local, redirigir
  if (sessionStorage.getItem('menu') && sessionStorage.getItem('local')) {
    window.location.href = './menu.html?v=' + sessionStorage.getItem('menu') + '&c=' + sessionStorage.getItem('local');
  }
}

// Menu
const menu_datos = [
  {
    "id": "POPIS-01",
    "precio": "11,9",
    "cat_nombre": "DE LA VILA",
    "cat_descripcion": "Roast beef fumat - Crema de pesto - Pebrots en conserva - Formatge Grana padano.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "DE LA VILA",
    "en_descripcion": "Smoked roast beef - Pesto cream - Preserved peppers - Grana Padano cheese.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "DE LA VILA",
    "es_descripcion": "Roast beef ahumado - Crema de pesto - Pimientos en conserva - Queso grana padano.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-02",
    "precio": "11,9",
    "cat_nombre": "DEL SOL",
    "cat_descripcion": "Roast beef fumat - Malbec glacejat - Cebes caramel·litzades.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "DEL SOL",
    "en_descripcion": "Smoked roast beef - Glazed Malbec - Caramelized onions.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "DEL SOL",
    "es_descripcion": "Roast beef ahumado - Malbec glaseado - Cebollas caramelizadas.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-03",
    "precio": "11,9",
    "cat_nombre": "DEL DIAMAN",
    "cat_descripcion": "Roast beef fumat - pesto rosa - Albergínies en conserva - Mozarella fior di latte.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "DEL DIAMAN",
    "en_descripcion": "Smoked roast beef - Pink pesto - Preserved eggplants - Mozzarella fior di latte.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "DEL DIAMAN",
    "es_descripcion": "Roast beef ahumado - Pesto rosa - Berenjenas en conserva - Mozarella fior di latte.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-04",
    "precio": "11,9",
    "cat_nombre": "LESSEPS",
    "cat_descripcion": "Roast beef fumat - Crema de festucs - Ceba caramel·litzades.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "LESSEPS",
    "en_descripcion": "Smoked roast beef - Pistachio cream - Caramelized onions.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "LESSEPS",
    "es_descripcion": "Roast beef ahumado - Crema de pistachos - Cebollas Caramelizadas.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-05",
    "precio": "11,9",
    "cat_nombre": "DE LA VIRREINA",
    "cat_descripcion": "Roast beef fumat - Cremós de girgoles - Pebrots en conserva - Coleslaw.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "DE LA VIRREINA",
    "en_descripcion": "Smoked roast beef - Creamy oyster mushrooms - Preserved peppers - Coleslaw.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "DE LA VIRREINA",
    "es_descripcion": "Roast beef ahumado - Cremoso de girgolas - Pimientos en conserva - Coleslaw.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-06",
    "precio": "11,9",
    "cat_nombre": "DEL NORD",
    "cat_descripcion": "Roast beef fumat - Hummus de remolatxa - Albergínies en conserva - Coleslaw.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "DEL NORD",
    "en_descripcion": "Smoked roast beef - Beet hummus - Preserved eggplants - Coleslaw.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "DEL NORD",
    "es_descripcion": "Roast beef ahumado - Hummus de remolacha - Berenjenas en conserva - Coleslaw.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-07",
    "precio": "11,9",
    "cat_nombre": "LIBERTAT",
    "cat_descripcion": "Roast beef fumat - Salsa aioli - Pebrots en conserva - Cogombres agredolços - Mozarella fior di latte.",
    "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
    "en_nombre": "LIBERTAD",
    "en_descripcion": "Smoked roast beef - Aioli sauce - Preserved peppers - Sweet and sour pickles - Fior di latte mozzarella.",
    "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
    "es_nombre": "LIBERTAD",
    "es_descripcion": "Roast beef ahumado - Salsa aioli - Pimientos en conserva - Pepinillos agridulces - Mozarella fior di latte.",
    "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-08",
    "precio": "7,9",
    "cat_nombre": "ASTURIES",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - Crema de pesto - Coleslaw.",
    "cat_categoria": "FOCÀCIES AMB POLLASTRE",
    "en_nombre": "ASTURIES",
    "en_descripcion": "Marinated chicken with honey and mustard - Pesto cream - Coleslaw.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "ASTURIES",
    "es_descripcion": "Pollo marinado con mostaza y miel - Crema de pesto - Coleslaw.",
    "es_categoria": "FOCACCIAS CON POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-09",
    "precio": "7,9",
    "cat_nombre": "TRAVESSERA",
    "cat_descripcion": "Pollastre marinat amb mostassa i mel - Aioli - Mix de verds - Tomàquet.",
    "cat_categoria": "FOCÀCIES AMB POLLASTRE",
    "en_nombre": "TRAVESSERA",
    "en_descripcion": "Honey-mustard marinated chicken – Aioli sauce - Mixed greens - Tomato.",
    "en_categoria": "FOCACCIAS WITH CHICKEN",
    "es_nombre": "TRAVESSERA",
    "es_descripcion": "Pollo marinado con mostaza y miel - Salsa aioli - Mix de hojas verdes - Tomate.",
    "es_categoria": "FOCACCIAS CON POLLO",
    "local": "focacceria"
  },
  {
    "id": "POPIS-10",
    "precio": 10,
    "cat_nombre": "DE LA REVOLUCIO",
    "cat_descripcion": "Stracciatella - Crema de festucs - Mortadella.",
    "cat_categoria": "FOCÀCIES AMB EMBOTITS",
    "en_nombre": "DE LA REVOLUCIÓN",
    "en_descripcion": "Stracciatella - Pistachio cream - Mortadella.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "DE LA REVOLUCIÓN",
    "es_descripcion": "Stracciatella - Crema de pistachos - Mortadella Italiana.",
    "es_categoria": "FOCACCIAS CON EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-11",
    "precio": 11,
    "cat_nombre": "POBLE ROMANÍ",
    "cat_descripcion": "Salsa aioli - coleslaw - Tomàquets confitats - Formatge emental - Pernil cuit.",
    "cat_categoria": "FOCÀCIES AMB EMBOTITS",
    "en_nombre": "POBLE ROMANÍ",
    "en_descripcion": "Aioli sauce - Coleslaw - Confit tomatoes - Emmental cheese - Cooked ham.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "POBLE ROMANÍ",
    "es_descripcion": "Salsa aioli - Coleslaw - Tomates confitados - Queso emental - Jamón cocido.",
    "es_categoria": "FOCACCIAS CON EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-12",
    "precio": 10,
    "cat_nombre": "RASPALL",
    "cat_descripcion": "Crema de pesto - Stracciatella - Prosciutto - Mix de verds.",
    "cat_categoria": "FOCÀCIES AMB EMBOTITS",
    "en_nombre": "RASPALL",
    "en_descripcion": "Pesto cream - Stracciatella - Prosciutto - Mixed greens.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "RASPALL",
    "es_descripcion": "Crema de pesto - Stracciatella - Prosciutto - Mix de hojas verdes.",
    "es_categoria": "FOCACCIAS CON EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-13",
    "precio": 10,
    "cat_nombre": "JOANIC",
    "cat_descripcion": "Pesto rosa - Coleslaw - Cogombres agredolços - Mozarella fior di latte - Pernil cuit.",
    "cat_categoria": "FOCÀCIES AMB EMBOTITS",
    "en_nombre": "JOANIC",
    "en_descripcion": "Pink pesto - Coleslaw - Sweet and sour pickles - Mozzarella fior di latte - Cooked ham.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "JOANIC",
    "es_descripcion": "Pesto rosa - Coleslaw - Pepinillos agridulces - Mozarella fior di latte - Jamón cocido.",
    "es_categoria": "FOCACCIAS CON EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-14",
    "precio": 11,
    "cat_nombre": "SANT MIQUEL",
    "cat_descripcion": "Stracciatella - Malbec glacejat - Prosciutto - Mix de verds.",
    "cat_categoria": "FOCÀCIES AMB EMBOTITS",
    "en_nombre": "SANT MIQUEL",
    "en_descripcion": "Stracciatella - Glazed Malbec - Prosciutto - Mixed greens.",
    "en_categoria": "FOCACCIAS WITH COLD CUTS",
    "es_nombre": "SANT MIQUEL",
    "es_descripcion": "Stracciatella - Malbec glaseado - Prosciutto - Mix de verdes.",
    "es_categoria": "FOCACCIAS CON EMBUTIDOS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-15",
    "precio": 10,
    "cat_nombre": "VERDI (VEGANA)",
    "cat_descripcion": "Hummus de remolatxa - Cebes caramel·litzades - Tomàquets confitats - Mix de verds.",
    "cat_categoria": "FOCACCIES VEGGIES",
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
    "precio": 10,
    "cat_nombre": "FONTANA",
    "cat_descripcion": "Cremós de girgoles - Tomàquets confitats - Straciatella - Mix de verds.",
    "cat_categoria": "FOCACCIES VEGGIES",
    "en_nombre": "FONTANA",
    "en_descripcion": "Creamy oyster mushrooms - Confit tomatoes - Stracciatella - Mixed greens.",
    "en_categoria": "VEGGIE FOCACCIAS",
    "es_nombre": "FONTANA",
    "es_descripcion": "Cremoso de girgolas - Tomates confitados - Straciatella - Mix de hojas verdes.",
    "es_categoria": "FOCACCIAS VEGGIES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-17",
    "precio": 10,
    "cat_nombre": "DEL CAMP",
    "cat_descripcion": "Salsa aioli - Coleslaw - Cebes adobades - Mozarella fior di latte - Mix de verds.",
    "cat_categoria": "FOCACCIES VEGGIES",
    "en_nombre": "DEL CAMP",
    "en_descripcion": "Aioli sauce - Coleslaw - Pickled onions - Mozzarella fior di latte - Mixed greens.",
    "en_categoria": "VEGGIE FOCACCIAS",
    "es_nombre": "DEL CAMP",
    "es_descripcion": "Salsa aioli - Coleslaw - Cebollas encurtidas - Mozarella fior di latte - mix de verdes.",
    "es_categoria": "FOCACCIAS VEGGIES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-18",
    "precio": "2,5",
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
    "id": "POPIS-19",
    "precio": "2,5",
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
    "id": "POPIS-20",
    "precio": "2,5",
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
    "id": "POPIS-21",
    "precio": "2,5",
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
    "id": "POPIS-22",
    "precio": "2,75",
    "cat_nombre": "COCA CUA",
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
    "id": "POPIS-23",
    "precio": "2,75",
    "cat_nombre": "COCA CUA ZERO",
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
    "id": "POPIS-24",
    "precio": 3,
    "cat_nombre": "LLIMONADA",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES SENSE ALCOHOL",
    "en_nombre": "LEMONADE",
    "en_descripcion": "",
    "en_categoria": "NON-ALCOHOLIC DRINKS",
    "es_nombre": "LIMONADA",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS SIN ALCOHOL",
    "local": "focacceria"
  },
  {
    "id": "POPIS-25",
    "precio": "2,8",
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
    "id": "POPIS-26",
    "precio": "2,8",
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
    "id": "POPIS-27",
    "precio": 2,
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
    "id": "POPIS-28",
    "precio": 2,
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
    "id": "POPIS-29",
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
    "id": "POPIS-30",
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
    "id": "POPIS-31",
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
    "id": "POPIS-32",
    "precio": "3,2",
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
    "id": "POPIS-33",
    "precio": "3,5",
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
    "id": "POPIS-34",
    "precio": "3,5",
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
    "id": "POPIS-35",
    "precio": 3,
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
    "id": "POPIS-36",
    "precio": "2,9",
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
    "id": "POPIS-37",
    "precio": 7,
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
    "id": "POPIS-38",
    "precio": 7,
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
    "id": "POPIS-39",
    "precio": "2,9",
    "cat_nombre": "XOCODATIL",
    "cat_descripcion": "Datil amb mantega de mani - xocolata - festucs - escates de sal.",
    "cat_categoria": "POSTRES",
    "en_nombre": "CHOCODATE",
    "en_descripcion": "Date - peanut butter - chocolate - pistachios - salt flakes.",
    "en_categoria": "DESSERTS",
    "es_nombre": "CHOCODATIL",
    "es_descripcion": "Datil con mantequilla de maní - chocolate - pistachos - escamas de sal.",
    "es_categoria": "POSTRES",
    "local": "focacceria"
  },
  {
    "id": "POPIS-40",
    "precio": "2,5",
    "cat_nombre": "TRUFES DE L'ÀVIA",
    "cat_descripcion": "Tòfones de civada i dolç de llet.",
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
    "id": "POPIS-41",
    "precio": "2,5",
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
    "id": "POPIS-42",
    "precio": 3,
    "cat_nombre": "HUMMUS CLÀSSIC",
    "cat_descripcion": "Huummus de cigrons i el nostre pa de focaccia (consulta opció sense gluten).",
    "cat_categoria": "TAPES",
    "en_nombre": "CLASSIC HUMMUS",
    "en_descripcion": "Chickpea hummus and our focaccia bread (ask for gluten-free options).",
    "en_categoria": "TAPAS",
    "es_nombre": "HUMMUS CLÁSICO",
    "es_descripcion": "Huummus de garbanzos con  nuestro pan de focaccia (consulta opción sin gluten).",
    "es_categoria": "TAPAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-43",
    "precio": 3,
    "cat_nombre": "HUMMUS ROSA",
    "cat_descripcion": "Huummus de cigrons i remolatxa amb el nostre pa de focaccia (consulta opció sense gluten).",
    "cat_categoria": "TAPES",
    "en_nombre": "PINK HUMMUS",
    "en_descripcion": "Chickpea and beetroot hummus with our focaccia bread (ask for gluten-free options).",
    "en_categoria": "TAPAS",
    "es_nombre": "HUMMUS ROSA",
    "es_descripcion": "Huummus de garbanzos y remolacha con nuestro pan de focaccia (consulta opción sin gluten).",
    "es_categoria": "TAPAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-44",
    "precio": "3,7",
    "cat_nombre": "BRUSQUETA POPIS",
    "cat_descripcion": "Pa brioix, prociutto, rucula, grana padano i reduccio d'accet.",
    "cat_categoria": "TAPES",
    "en_nombre": "BRUSCHETTA POPIS",
    "en_descripcion": "Brioche bread, prociutto, arugula, Grana Padano cheese and vinegar reduction.",
    "en_categoria": "TAPAS",
    "es_nombre": "BRUSQUETA POPIS",
    "es_descripcion": "Pan brioche, prociutto, rucula, queso grana padano y reducción de acceto.",
    "es_categoria": "TAPAS",
    "local": "focacceria"
  },
  {
    "id": "POPIS-45",
    "precio": 9,
    "cat_nombre": "VICENS",
    "cat_descripcion": "Mesclum d’enciams - carbassa rostida - ou dur - nous - formatge de cabra - ceba en vinagre - salsa d’oli i mel | Servit amb hummus de remolatxa i pa (consulta l'opció sense gluten)",
    "cat_categoria": "AMANIDES - de 12h a 16h",
    "en_nombre": "VICENS",
    "en_descripcion": "Mixed greens - roasted pumpkin - hard -boiled egg - walnuts - goat cheese - pickled onions - olive and honey dressing | Served with beetroot hummus and bread (ask for gluten-free option)",
    "en_categoria": "SALADS - from 12 PM to 4 PM",
    "es_nombre": "VICENS",
    "es_descripcion": "Mix de hojas verdes - calabaza asada - huevo duro - nueces - queso de cabra - cebolla encurtida - salsa de oliva y miel | acompañado de hummus de remolacha y pan (consulta opción sin gluten)",
    "es_categoria": "ENSALADAS - de 12 a 16 hs",
    "local": "focacceria"
  },
  {
    "id": "POPIS-46",
    "precio": 9,
    "cat_nombre": "GAUDI",
    "cat_descripcion": "Mesclum d’enciams - miso de bolets amb arròs bicolor i crema de bolets - mongeta vermella - cacauets - pollastre esmicolat - allioli | Servit amb hummus de remolatxa i pa (consulta l'opció sense gluten)",
    "cat_categoria": "AMANIDES - de 12h a 16h",
    "en_nombre": "GAUDI",
    "en_descripcion": "Mixed greens - mushroom miso with black & white rice and mushroom cream - red beans - peanuts -shredded chicken - aioli | Served with beetroot hummus and bread (ask for gluten-free option)",
    "en_categoria": "SALADS - from 12 PM to 4 PM",
    "es_nombre": "GAUDI",
    "es_descripcion": "Mix de hojas verdes - miso de hongos con arroz bicolor y crema de setas - alubia roja - mani - pollo desmechado - aioli | acompañado de hummus de remolacha y pan (consulta opción sin gluten)",
    "es_categoria": "ENSALADAS - de 12 a 16 hs",
    "local": "focacceria"
  },
  {
    "id": "POPIS-47",
    "precio": "1,8",
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
    "id": "POPIS-48",
    "precio": "2,3",
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
    "id": "POPIS-49",
    "precio": "2,2",
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
    "id": "POPIS-50",
    "precio": "2,6",
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
    "id": "POPIS-51",
    "precio": "2,7",
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
    "id": "POPIS-52",
    "precio": "2,7",
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
    "id": "POPIS-53",
    "precio": "3,1",
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
    "id": "POPIS-54",
    "precio": "3,7",
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
    "id": "POPIS-55",
    "precio": 3,
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
    "id": "POPIS-56",
    "precio": 3,
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
    "id": "POPIS-57",
    "precio": "3,3",
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
    "id": "POPIS-58",
    "precio": "0,5",
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
    "id": "POPIS-59",
    "precio": "3,5",
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
    "id": "POPIS-60",
    "precio": "2,00",
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
    "id": "POPIS-61",
    "precio": "3,9",
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
    "id": "POPIS-62",
    "precio": 4,
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
    "id": "POPIS-63",
    "precio": 4,
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
    "id": "POPIS-64",
    "precio": 4,
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
    "id": "POPIS-65",
    "precio": "4,1",
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
    "id": "POPIS-66",
    "precio": "4,5",
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
    "id": "POPIS-67",
    "precio": "4,5",
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
    "id": "POPIS-68",
    "precio": "4,5",
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
    "id": "POPIS-69",
    "precio": 4,
    "cat_nombre": "ESPRESSO TONIC",
    "cat_descripcion": "",
    "cat_categoria": "BEGUDES FREDES",
    "en_nombre": "ESPRESSO TONIC",
    "en_descripcion": "",
    "en_categoria": "COLD DRINKS",
    "es_nombre": "ESPRESSO TONIC",
    "es_descripcion": "",
    "es_categoria": "BEBIDAS FRIAS",
    "local": "bolleria"
  },
  {
    "id": "POPIS-70",
    "precio": 4,
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
    "id": "POPIS-71",
    "precio": 4,
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
  },
  {
    "id": "POPIS-72",
    "precio": "0,5",
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
  },
  {
    "id": "POPIS-73",
    "precio": "2,20",
    "cat_nombre": "CROISSANT CLÀSSIC X 1",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CLASSIC CROISSANT X 1",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CLASICA X 1",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-74",
    "precio": "11,90",
    "cat_nombre": "CROISSANT CLÀSSIC X 6",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CLASSIC CROISSANT X 6",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CLASICA X 6",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-75",
    "precio": 23,
    "cat_nombre": "CROISSANT CLÁSSIC X 12",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CLASSIC CROISSANT X 12",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CLASICA X 6",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-76",
    "precio": "2,45",
    "cat_nombre": "CROISSANT AMB TOPPINGS X 1",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CROISSANT WITH TOPPINGS X 1",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CON TOPPING X 1",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-77",
    "precio": 14,
    "cat_nombre": "CROISSANT AMB TOPPINGS X 6",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CROISSANT WITH TOPPINGS X 6",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CON TOPPING X 6",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-78",
    "precio": "26,90",
    "cat_nombre": "CROISSANT AMB TOPPINGS X 12",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CROISSANT WITH TOPPINS X 12",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA CON TOPPING X 12",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-79",
    "precio": "2,55",
    "cat_nombre": "CROISSANT DE PERNIL I FORMATGE X 1",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "HAM & CHEESE CROISSANT X1",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA DE JAMON Y QUESO X 1",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-80",
    "precio": "14,60",
    "cat_nombre": "CROISSANT DE PERNIL I FORMATGE X 6",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "HAM & CHEESE CROISSANT X6",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA DE JAMON Y QUESO X 6",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-81",
    "precio": "28,90",
    "cat_nombre": "CROISSANT DE PERNIL I FORMATGE X 12",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "HAM & CHEESE CROISSANT X12",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "MEDIALUNA DE JAMON Y QUESO X 12",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-82",
    "precio": "3,75",
    "cat_nombre": "BRIOIX DE PERNIL I FORMATGE",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "HAM & CHESSE BRIOCHE",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "BRIOCHE DE JAMON Y QUESO",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-83",
    "precio": "3,20",
    "cat_nombre": "PA DE PESSIC DE LLIMONA I NABIUS",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "LEMON AND BLUEBERRY CAKE",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "BUDIN DE LIMON Y ARANDANOS",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-84",
    "precio": "3,30",
    "cat_nombre": "PASTIS DE PASTANAGA",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "CARROT POUND CAKE",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "BUDIN DE ZANAHORIA",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-85",
    "precio": "3,40",
    "cat_nombre": "PA DE PLÀTAN AMB XCOCOLAT",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "BANANA BREAD WITH CHOCOLATE",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "PAN DE BANANA Y CHOCOLATE",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-86",
    "precio": 3.5,
    "cat_nombre": "ESPECIALITAT DE LA SETMANA",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "SPECIAL OF THE WEEK",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "ESPECIALIDAD DE LA SEMANA",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-87",
    "precio": "4,5",
    "cat_nombre": "PA DE MOTLLE BRIOIX",
    "cat_descripcion": "",
    "cat_categoria": "",
    "en_nombre": "SLICED BRIOCHE BREAD",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "PAN BRIOCHE DE MOLDE",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-88",
    "precio": "3,5",
    "cat_nombre": "ROTTLE DE CANYELLA",
    "cat_descripcion": "",
    "cat_categoria": "ROTTLE DOLÇ",
    "en_nombre": "CINAMMON ROLL",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "ROLL DE CANELA",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-89",
    "precio": "4,00",
    "cat_nombre": "ROTTLE DE FESTUC",
    "cat_descripcion": "",
    "cat_categoria": "ROTTLE DOLÇ",
    "en_nombre": "PISTACHIO ROLL",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "ROLL DE PISTACHO",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-90",
    "precio": 4,
    "cat_nombre": "ROTTLE DE CHOCOTORTA",
    "cat_descripcion": "",
    "cat_categoria": "ROTTLE DOLÇ",
    "en_nombre": "CHOCOTORTA ROLL",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "ROLL DE CHOCOTORTA",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  },
  {
    "id": "POPIS-91",
    "precio": 4,
    "cat_nombre": "ROTTLE DE LEMON PIE",
    "cat_descripcion": "",
    "cat_categoria": "ROTTLE DOLÇ",
    "en_nombre": "LEMON PIE ROLL",
    "en_descripcion": "",
    "en_categoria": "",
    "es_nombre": "ROLL DE LEMON PIE",
    "es_descripcion": "",
    "es_categoria": "",
    "local": "bolleria"
  }
]

const menu_cargar = () => {
  const params = new URLSearchParams(window.location.search)
  const idioma = sessionStorage.getItem('menu') || params.get('v') || 'es'
  const local = sessionStorage.getItem('local') || params.get('c') || 'todo'  // Usar 'todo' si no hay valor

  // Titulo del menu
  const titulo = locales_nombres[idioma] && locales_nombres[idioma][local] || 'Selecciona un menú'
  document.querySelector('#menu_titulo').textContent = titulo.toUpperCase() // Titulo en mayúsculas

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
