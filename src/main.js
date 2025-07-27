// Título principal dinámico
const palabras = [
    'Bienvenido',   // Español
    'Benvinguts',   // Catalan
    'Welcome',      // Inglés
    'Benvenuto',    // Italiano
    'Willkommen',   // Alemán
    'Bienvenue'     // Francés
]

let palabraIndex = 0
let letraIndex = 0
const velocidad = 150 // velocidad de tipeo
const pausaEntrePalabras = 1500

const typingElement = document.getElementById('typing')

function tipear() {
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

// Menu
const menu = (v) => {
    sessionStorage.setItem('menu', v)
    window.location.href = './menu.html?v=' + v
}

// Menu datos
const menu_datos = [
    {
        "id": "POPIS-01",
        "precio": "11,9",
        "cat_nombre": "DE LA VILA",
        "cat_descripcion": "Roast beef fumat - Crema de pesto - Pebrots en conserva - Formatge grana padano.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "DE LA VILA",
        "en_descripcion": "Smoked roast beef - pesto cream - preserved peppers - Grana Padano cheese",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "DE LA VILA",
        "es_descripcion": "Roast beef ahumado - Crema de pesto - Pimientos en conserva - Queso grana padano.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-02",
        "precio": "11,9",
        "cat_nombre": "DEL SOL",
        "cat_descripcion": "Roast beef fumat - Malbec glacejat - cebes caramel·litzades.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "DEL SOL",
        "en_descripcion": "Smoked roast beef - glazed Malbec - gratin onions",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "DEL SOL",
        "es_descripcion": "Roast beef ahumado - Malbec glaseado - cebollas caramelizadas.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-03",
        "precio": "11,9",
        "cat_nombre": "DEL DIAMAN",
        "cat_descripcion": "Roast beef fumat - pesto rosa - albergínies en conserva - mozarella fior di latte",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "DEL DIAMAN",
        "en_descripcion": "Smoked roast beef - pink pesto - preserved eggplants - mozzarella fior di latte",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "DEL DIAMAN",
        "es_descripcion": "Roast beef ahumado - pesto rosa - berenjenas en conserva - mozarella fior di latte",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-04",
        "precio": "11,9",
        "cat_nombre": "LESSEPS",
        "cat_descripcion": "Roast beef fumat - Crema de festucs - ceba caramel·litzades.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "LESSEPS",
        "en_descripcion": "Smoked roast beef - pistachio cream + gratin onions",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "LESSEPS",
        "es_descripcion": "Roast beef ahumado - Crema de pistachos - cebolla caramelizadas.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-05",
        "precio": "11,9",
        "cat_nombre": "DE LA VIRREINA",
        "cat_descripcion": "Roast beef fumat - cremós de girgoles - pebrots en conserva - coleslaw.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "DE LA VIRREINA",
        "en_descripcion": "Smoked roast beef - creamy oyster mushrooms - preserved peppers - coleslaw",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "DE LA VIRREINA",
        "es_descripcion": "Roast beef ahumado - cremoso de girgolas - pimientos en conserva - coleslaw.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-06",
        "precio": "11,9",
        "cat_nombre": "DEL NORD",
        "cat_descripcion": "Roast beef fumat - hummus de remolatxa - albergínies en conserva - coleslaw.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "DEL NORD",
        "en_descripcion": "Smoked roast beef - beet hummus - preserved eggplants - coleslaw",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "DEL NORD",
        "es_descripcion": "Roast beef ahumado - hummus de remolacha - berenjenas en conserva - coleslaw.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-07",
        "precio": "11,9",
        "cat_nombre": "LIBERTAT",
        "cat_descripcion": "Roast beef fumat - salsa aioli - pebrots en conserva - cogombres agredolços - mozarella fior di latte.",
        "cat_categoria": "FOCÀCIES AMB ROAST BEEF FUMAT",
        "en_nombre": "LIBERTAD",
        "en_descripcion": "Smoked roast beef - aioli sauce - preserved peppers - sweet and sour pickles - fior di latte mozzarella",
        "en_categoria": "FOCACCIAS WITH SMOKED ROAST BEEF",
        "es_nombre": "LIBERTAD",
        "es_descripcion": "Roast beef ahumado - salsa aioli - pimientos en conserva - pepinillos agridulces - mozarella fior di latte.",
        "es_categoria": "FOCACCIAS CON ROAST BEEF AHUMADO"
    },
    {
        "id": "POPIS-08",
        "precio": "7,9",
        "cat_nombre": "ASTURIES",
        "cat_descripcion": "Pollastre marinat amb mostassa i mel - crema de pesto - coleslaw.",
        "cat_categoria": "FOCÀCIES AMB POLLASTRE",
        "en_nombre": "ASTURIES",
        "en_descripcion": "Marinated chicken with honey and mustard - pesto cream - coleslaw",
        "en_categoria": "FOCACCIAS WITH CHICKEN",
        "es_nombre": "ASTURIES",
        "es_descripcion": "Pollo marinado con mostaza y miel - crema de pesto - coleslaw.",
        "es_categoria": "FOCACCIAS CON POLLO"
    },
    {
        "id": "POPIS-09",
        "precio": "7,9",
        "cat_nombre": "TRAVESSERA",
        "cat_descripcion": "Pollastre marinat amb mostassa i mel - aioli - mix de verds - tomàquet.",
        "cat_categoria": "FOCÀCIES AMB POLLASTRE",
        "en_nombre": "TRAVESSERA",
        "en_descripcion": "Honey-mustard marinated chicken – aioli - fresh spinach - tomato",
        "en_categoria": "FOCACCIAS WITH CHICKEN",
        "es_nombre": "TRAVESSERA",
        "es_descripcion": "Pollo marinado con mostaza y miel - aioli - mix de verdes - tomate.",
        "es_categoria": "FOCACCIAS CON POLLO"
    },
    {
        "id": "POPIS-10",
        "precio": 10,
        "cat_nombre": "DE LA REVOLUCIO",
        "cat_descripcion": "Stracciatella - crema de festucs - mortadella.",
        "cat_categoria": "FOCÀCIES AMB EMBOTITS",
        "en_nombre": "DE LA REVOLUCIÓN",
        "en_descripcion": "Stracciatella - pistachio cream - mortadella",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "DE LA REVOLUCIÓN",
        "es_descripcion": "Stracciatella - crema de pistachos - mortadella.",
        "es_categoria": "FOCACCIAS CON EMBUTIDOS"
    },
    {
        "id": "POPIS-11",
        "precio": 11,
        "cat_nombre": "POBLE ROMANÍ",
        "cat_descripcion": "Salsa aioli - coleslaw - tomàquets confitats - formatge emental - pernil cuit.",
        "cat_categoria": "FOCÀCIES AMB EMBOTITS",
        "en_nombre": "POBLE ROMANÍ",
        "en_descripcion": "Aioli sauce - coleslaw - confit tomatoes - Emmental cheese - cooked ham",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "POBLE ROMANÍ",
        "es_descripcion": "Salsa aioli - coleslaw - tomates confitados - queso emental - jamón cocido.",
        "es_categoria": "FOCACCIAS CON EMBUTIDOS"
    },
    {
        "id": "POPIS-12",
        "precio": 10,
        "cat_nombre": "RASPALL",
        "cat_descripcion": "Crema de pesto - stracciatella - prosciutto - mix de verds.",
        "cat_categoria": "FOCÀCIES AMB EMBOTITS",
        "en_nombre": "RASPALL",
        "en_descripcion": "Pesto cream - stracciatella - prosciutto - mixed greens",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "RASPALL",
        "es_descripcion": "Crema de pesto - stracciatella - prosciutto - mix de verdes.",
        "es_categoria": "FOCACCIAS CON EMBUTIDOS"
    },
    {
        "id": "POPIS-13",
        "precio": 10,
        "cat_nombre": "JOANIC",
        "cat_descripcion": "Pesto rosa - coleslaw - cogombres agredolços - mozarella fior di latte - pernil cuit.",
        "cat_categoria": "FOCÀCIES AMB EMBOTITS",
        "en_nombre": "JOANIC",
        "en_descripcion": "Pink pesto - coleslaw - sweet and sour pickles - mozzarella fior di latte - cooked ham",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "JOANIC",
        "es_descripcion": "Pesto rosa - coleslaw - pepinillos agridulces - mozarella fior di latte - jamón cocido.",
        "es_categoria": "FOCACCIAS CON EMBUTIDOS"
    },
    {
        "id": "POPIS-14",
        "precio": 11,
        "cat_nombre": "SANT MIQUEL",
        "cat_descripcion": "Stracciatella - malbec glacejat - prosciutto - mix de verds.",
        "cat_categoria": "FOCÀCIES AMB EMBOTITS",
        "en_nombre": "SANT MIQUEL",
        "en_descripcion": "Stracciatella - glazed Malbec - prosciutto - mixed greens",
        "en_categoria": "FOCACCIAS WITH COLD CUTS",
        "es_nombre": "SANT MIQUEL",
        "es_descripcion": "Stracciatella - malbec glaseado - prosciutto - mix de verdes.",
        "es_categoria": "FOCACCIAS CON EMBUTIDOS"
    },
    {
        "id": "POPIS-15",
        "precio": 10,
        "cat_nombre": "VERDI (VEGANA)",
        "cat_descripcion": "Hummus de remolatxa - cebes caramel·litzades - tomàquets confitats - mix de verds.",
        "cat_categoria": "FOCACCIES VEGGIES",
        "en_nombre": "VERDI (VEGANA)",
        "en_descripcion": "Beet hummus - gratin onions - confit tomatoes - mixed greens",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "VERDI (VEGANA)",
        "es_descripcion": "Hummus de remolacha - cebollas caramelizadas - tomates confitados - mix de verdes.",
        "es_categoria": "FOCACCIAS VEGGIES"
    },
    {
        "id": "POPIS-16",
        "precio": 10,
        "cat_nombre": "FONTANA",
        "cat_descripcion": "Cremós de girgoles - tomàquets confitats - straciatella - mix de verds",
        "cat_categoria": "FOCACCIES VEGGIES",
        "en_nombre": "FONTANA",
        "en_descripcion": "Creamy oyster mushrooms - confit tomatoes - stracciatella - mixed greens",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "FONTANA",
        "es_descripcion": "Cremoso de girgolas - tomates confitados - straciatella - mix de verdes.",
        "es_categoria": "FOCACCIAS VEGGIES"
    },
    {
        "id": "POPIS-17",
        "precio": 10,
        "cat_nombre": "DEL CAMP",
        "cat_descripcion": "Salsa aioli - coleslaw - cebes adobades - mozarella fior di latte - mix de verds.",
        "cat_categoria": "FOCACCIES VEGGIES",
        "en_nombre": "DEL CAMP",
        "en_descripcion": "Aioli sauce - coleslaw - pickled onions - mozzarella fior di latte - mixed greens",
        "en_categoria": "VEGGIE FOCACCIAS",
        "es_nombre": "DEL CAMP",
        "es_descripcion": "Salsa aioli - coleslaw - cebollas encurtidas - mozarella fior di latte - mix de verdes.",
        "es_categoria": "FOCACCIAS VEGGIES"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
    },
    {
        "id": "POPIS-25",
        "precio": "2,8",
        "cat_nombre": "COPA ESTRELLA",
        "cat_descripcion": "Canya",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "BIG GLASS OF ESTRELLA",
        "en_descripcion": "GLASS",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "COPA ESTRELLA",
        "es_descripcion": "Caña",
        "es_categoria": "BEBIDAS CON ALCOHOL"
    },
    {
        "id": "POPIS-26",
        "precio": "2,8",
        "cat_nombre": "COPA TURIA",
        "cat_descripcion": "Canya",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "BIG GLASS OF TURIA",
        "en_descripcion": "GLASS",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "COPA TURIA",
        "es_descripcion": "Caña",
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
    },
    {
        "id": "POPIS-29",
        "precio": "3,3",
        "cat_nombre": "DAURA",
        "cat_descripcion": "Cervesa sense gluten",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "DAURA",
        "en_descripcion": "Gluten free beer",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "DAURA",
        "es_descripcion": "Cerveza sin gruten",
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS SIN ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
    },
    {
        "id": "POPIS-32",
        "precio": "3,2",
        "cat_nombre": "DAMM LEMON",
        "cat_descripcion": "Clara",
        "cat_categoria": "BEGUDES AMB ALCOHOL",
        "en_nombre": "DAMM LEMON",
        "en_descripcion": "Beer with lemon",
        "en_categoria": "DRINKS ALCOHOL",
        "es_nombre": "DAMM LEMON",
        "es_descripcion": "Clara",
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
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
        "es_categoria": "BEBIDAS CON ALCOHOL"
    },
    {
        "id": "POPIS-39",
        "precio": "2,5",
        "cat_nombre": "XOCODATIL",
        "cat_descripcion": "Datil amb mantega de mani - xocolata i escates de sal.",
        "cat_categoria": "POSTRES",
        "en_nombre": "CHOCODATE",
        "en_descripcion": "Date - peanut butter - chocolate and salt flakes.",
        "en_categoria": "DESSERTS",
        "es_nombre": "CHOCODATIL",
        "es_descripcion": "Datil con mantequilla de maní - chocolate y escamas de sal.",
        "es_categoria": "POSTRES"
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
        "es_categoria": "POSTRES"
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
        "es_categoria": "TAPAS"
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
        "es_categoria": "TAPAS"
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
        "es_categoria": "TAPAS"
    },
    {
        "id": "POPIS-44",
        "precio": "3,7",
        "cat_nombre": "BRUSQUETA POPIS",
        "cat_descripcion": "Pa brioix, prociutto, rucula, grana padano, i reduccio d'accet.",
        "cat_categoria": "TAPES",
        "en_nombre": "BRUSCHETTA POPIS",
        "en_descripcion": "Brioche bread, prociutto, arugula, Grana Padano cheese, and vinegar reduction.",
        "en_categoria": "TAPAS",
        "es_nombre": "BRUSQUETA POPIS",
        "es_descripcion": "Pan brioche, prociutto, rucula, queso grana padano, y reducción de acceto.",
        "es_categoria": "TAPAS"
    }
]

const menu_cargar = () => {
    const params = new URLSearchParams(window.location.search)
    const idioma = sessionStorage.getItem('menu') || params.get('v') || 'cat'

    const titulos = {
        es: 'Menú en español',
        en: 'Menu in English',
        cat: 'Menú en català'
    }
    document.querySelector('#menu_titulo').textContent = titulos[idioma] || 'Menú'

    // Agrupar items por categoría
    const categorias = {}
    menu_datos.forEach(item => {
        const key = item[`${idioma}_categoria`]
        if (!categorias[key]) categorias[key] = []
        categorias[key].push(item)
    })

    const plantilla = document.querySelector('.menu_categoria')
    const contenedor = plantilla.parentElement
    contenedor.innerHTML = '' // Limpiar todas las categorías previas

    Object.entries(categorias).forEach(([cat_nombre, items]) => {
        const clon = plantilla.cloneNode(true)

        // Setear título de categoría
        clon.querySelector('#menu_categoria_titulo').textContent = cat_nombre

        // Contenedor de items
        const itemsContainer = clon.querySelector('#menu_categoria_items')
        itemsContainer.innerHTML = '' // Limpiar item de ejemplo

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

        contenedor.appendChild(clon)
    })
}

