const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// CREDENCIALES OFICIALES CEGNE SAN JUAN BAUTISTA
const SUPABASE_URL = 'https://tqzmggopevyzxgxijgzi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxem1nZ29wZXZ5enhneGlqZ3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NTY3NjUsImV4cCI6MjEwNjIzMjc2NX0.HDzoQeCsAFpzjloXqFaYh9qWY_rXI8B7ObMQW8l40DE';
const WHATSAPP_TOKEN = 'EAAQcC7HRSAYBSsKHqXajZAexvOaUv9Hq6E101BRQHKZC2QZAWl1LSjss3YJZAAB0GZBVe4xiW1O36KlZB1H2ZBvcy677kBtgZCKBysnQHb2KQYma2nsSE3d6Wn2hffTrf7fGdr0Uc29cdTqYbVHLL2cg8IsZCUY8r02PIICMRwtneD5heR0XFzePhkbgw0EuGM5IZAG4cBMw7N3bSxdaat2pFCe9WWkBOQiYozAlBOhSmacPJL1xNFZAZAJk08dM9ZBa3uZAPSL5sxhMnPko7L41NiGqARBjeOJgZDZD';
const WHATSAPP_PHONE_ID = '187371744449376';
const WABA_ID = '186772897842582';
const META_VERIFY_TOKEN = 'SAN_JUAN_CONECTA_TOKEN_2026';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('🤖 Cerebro de Pancho conectado y listo');

// 26 PREGUNTAS Y TEMAS OFICIALES DEL CEGNE SAN JUAN BAUTISTA DE PUNO
const baseConocimientoPancho = [
  {
    tema: "saludo",
    palabras_clave: ["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "pancho", "hey", "ola"],
    respuesta: "¡Paz y Bien! 🐿️ Soy Pancho, el asistente oficial del CEGNE San Juan Bautista de Puno.\n\n¿En qué puedo orientarte hoy? Puedes consultarme sobre:\n• Horarios de clases\n• Vacantes 2026\n• Costos y pensiones\n• Descuentos por hermanos\n• Requisitos de admisión\n• Ubicación de la sede"
  },
  {
    tema: "horarios",
    palabras_clave: ["horario", "horarios", "hora", "entrada", "salida", "turno", "clases", "a que hora"],
    respuesta: "⏰ Horarios de clases oficiales 2026:\n\n• Inicial: 8:30 a.m. a 1:30 p.m.\n• Primaria: 8:00 a.m. a 2:00 p.m.\n• Secundaria: 8:00 a.m. a 2:30 p.m."
  },
  {
    tema: "vacantes",
    palabras_clave: ["vacante", "vacantes", "cupo", "cupos", "disponibles", "hay vacantes", "no hay vacantes"],
    respuesta: "⚠️ Disponibilidad de vacantes 2026:\n\n• Primaria: NO hay vacantes para 5to y 6to grado.\n• Secundaria: NO hay vacantes para 3ro y 5to grado.\n\nPara los demás grados, por favor consulte disponibilidad directamente en secretaría."
  },
  {
    tema: "pensiones_costos",
    palabras_clave: ["pension", "pensiones", "costo", "costos", "matricula", "pago", "cuanto cuesta", "mensualidad", "dinero", "pagar", "economica"],
    respuesta: "💵 La información económica (costos de matrícula y pensiones 2026) debe ser consultada de manera presencial en la sede del colegio:\n\n📍 Jr. Grau 449, Oficina de Recursos Humanos (3er piso)."
  },
  {
    tema: "descuentos_hermanos",
    palabras_clave: ["descuento", "descuentos", "hermanos", "hijos", "familiar", "beneficio"],
    respuesta: "👨‍👩‍👧‍👦 Descuentos familiares por hermanos:\n\n• Familias con 3 hijos: 20% de descuento en pensiones.\n• Familias con 4 hijos: 30% de descuento.\n\n⚠️ Previa evaluación y presentación de solicitud hasta el 17 de febrero de 2026."
  },
  {
    tema: "requisitos_admision",
    palabras_clave: ["requisito", "requisitos", "documento", "documentos", "papeles", "fut", "partida", "partidas", "dni", "admision", "ingreso"],
    respuesta: "📄 Requisitos de ingreso para nuevos estudiantes:\n\n1. FUT de admisión.\n2. Constancia de no adeudo y conducta.\n3. Cartilla de vacunas.\n4. Partidas de nacimiento, matrimonio y bautizo.\n5. DNI (estudiante y padres).\n6. Certificado de estudios, ficha de matrícula y pago por derecho de ingreso."
  },
  {
    tema: "proceso_admision",
    palabras_clave: ["pasos", "proceso", "etapas", "entrevista", "postulacion", "como postular"],
    respuesta: "📋 Pasos del proceso de admisión:\n\n1. Reserva de matrícula.\n2. Entrevista psicológica.\n3. Entrevista con equipo directivo.\n4. Publicación de resultados.\n5. Pago por derecho de ingreso y matrícula."
  },
  {
    tema: "ubicacion",
    palabras_clave: ["donde queda", "donde esta", "ubicacion", "direccion", "llegar", "grau", "sede", "lugar"],
    respuesta: "📍 La sede central del CEGNE San Juan Bautista está ubicada en Jr. Grau 449, en el centro de la ciudad de Puno."
  },
  {
    tema: "director",
    palabras_clave: ["director", "directora", "macedo", "fernandez"],
    respuesta: "👤 El director del CEGNE San Juan Bautista es el Lic. Marco Antonio Fernández Macedo."
  },
  {
    tema: "promotor",
    palabras_clave: ["promotor", "obispo", "carrion", "pavlich", "monseñor"],
    respuesta: "⛪ El promotor general de la institución es Monseñor Jorge Pedro Carrión Pavlich (Obispo de Puno)."
  },
  {
    tema: "edades",
    palabras_clave: ["edad", "edades", "años cumplidos", "marzo", "cumplir", "edad inicial", "edad primaria"],
    respuesta: "🎂 Edades mínimas al 31 de marzo de 2026:\n\n• Inicial de 3 años: 3 años cumplidos.\n• Primer Grado de Primaria: 6 años cumplidos."
  },
  {
    tema: "uniforme",
    palabras_clave: ["uniforme", "ropa", "vestimenta", "buzo"],
    respuesta: "👕 Sí, el uso del uniforme escolar oficial es de carácter obligatorio según el modelo institucional del CEGNE San Juan Bautista."
  },
  {
    tema: "intranet",
    palabras_clave: ["intranet", "notas", "clave", "ver notas", "calificaciones", "sistema"],
    respuesta: "💻 Sí, cada padre de familia recibe una clave de acceso personal a la intranet institucional para consultar las notas y el avance escolar de su hijo."
  },
  {
    tema: "servicios",
    palabras_clave: ["servicios", "psicologia", "psicologo", "enfermeria", "enfermera", "biblioteca", "laboratorio", "talleres"],
    respuesta: "🏫 Servicios institucionales:\n\n• Departamento de Psicología\n• Enfermería escolar\n• Biblioteca y Laboratorios de ciencias\n• Talleres formativos y Tutoría permanente."
  },
  {
    tema: "alumnos_aula",
    palabras_clave: ["alumnos por aula", "salon", "salones", "capacidad", "estudiantes por aula", "cuantos alumnos"],
    respuesta: "👥 Capacidad por aula:\n• Inicial: aprox. 20 estudiantes por aula.\n• Primaria y Secundaria: aprox. 30 estudiantes por salón."
  },
  {
    tema: "agradecimiento",
    palabras_clave: ["gracias", "muchas gracias", "agradecido", "excelente", "bueno", "ok"],
    respuesta: "🐿️ ¡Con mucho gusto! En el CEGNE San Juan Bautista estamos siempre para servir a las familias. ¡Paz y Bien!"
  }
];

// MOTOR DE BÚSQUEDA INTELIGENTE
async function responderPancho(mensaje, remitenteId) {
  const limpia = mensaje.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let respuestaFinal = null;
  let maxScore = 0;

  // 1. Buscar en la memoria de temas de Pancho
  for (const item of baseConocimientoPancho) {
    let score = 0;
    for (const kw of item.palabras_clave) {
      const kwLimpia = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (limpia.includes(kwLimpia)) {
        score += kwLimpia.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      respuestaFinal = item.respuesta;
    }
  }

  // 2. Si no encontró en memoria, usar la derivación oficial
  if (!respuestaFinal || maxScore === 0) {
    respuestaFinal = "Para esa consulta en particular, por favor acérquese a la sede de la institución en Jr. Grau 449, Oficina de Recursos Humanos (3er piso) o consulte en secretaría.";
  }

  // 3. Guardar en historial de Supabase
  try {
    await supabase.from('historial_mensajes').insert([{
      remitente_id: remitenteId || 'anonimo',
      canal: 'whatsapp',
      mensaje_padre: mensaje,
      respuesta_pancho: respuestaFinal
    }]);
  } catch(e) {}

  return respuestaFinal;
}

// ENVIAR MENSAJE A WHATSAPP
async function enviarAWhatsApp(telefono, texto) {
  try {
    const res = await axios.post(
      `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: telefono,
        type: "text",
        text: { body: texto }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
    console.log(`✅ [WhatsApp] ¡Respuesta enviada a ${telefono}! (ID: ${res.data.messages[0].id})`);
    return res.data;
  } catch (e) {
    const errMsg = e.response ? JSON.stringify(e.response.data) : e.message;
    console.error('❌ Error enviando a WhatsApp:', errMsg);
  }
}

// VERIFICACIÓN DEL WEBHOOK
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
    console.log('✅ Webhook verificado por Meta.');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// RECEPCIÓN DE MENSAJES EN VIVO
app.post('/webhook', async (req, res) => {
  console.log('\n🔔 [LLEGÓ MENSAJE O NOTIFICACIÓN DE META]');
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      const msg = body.entry[0].changes[0].value.messages[0];
      const deNumero = msg.from;
      const texto = msg.text ? msg.text.body : '';

      console.log(`📩 Mensaje recibido de ${deNumero}: "${texto}"`);

      if (texto) {
        console.log(`🧠 Buscando tema en base de conocimiento...`);
        const respuesta = await responderPancho(texto, deNumero);
        console.log(`💬 Pancho dice:\n${respuesta}\n`);
        await enviarAWhatsApp(deNumero, respuesta);
      }
    } else if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.statuses) {
      const status = body.entry[0].changes[0].value.statuses[0];
      console.log(`📊 Confirmación de entrega: estado "${status.status}"`);
    }
    return res.sendStatus(200);
  }

  res.sendStatus(200);
});

// Endpoint de estado
app.get('/', (req, res) => res.send('Pancho API está activo'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor Pancho funcionando en puerto ${PORT}`);
  console.log('👀 Esperando mensajes de WhatsApp con 26 temas listos...');
});