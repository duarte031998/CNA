// Contenido de la guía. Para cambiar textos, capturas o valores, edita solo este archivo.
window.GUIDE = {
  brand: 'CNA Sistemas',
  coverTag: 'Soporte IT · Humanity & Inclusion',
  headerTag: 'Setup inicial de laptops',
  cover: {
    pill: 'Guía de soporte · Windows 11',
    title: 'Configuración inicial de laptops',
    lead: 'Sigue estos 11 pasos cuando enciendas una laptop nueva o recién formateada. Al terminar llegarás al escritorio y el equipo de soporte completará el resto de la configuración de forma remota.',
    image: { src: 'img/p6-16.jpg', caption: 'Pantalla de configuración de Windows' }
  },
  steps: [
    {
      short: 'Elegir idioma',
      title: 'Elegir idioma',
      body: ['Cuando configuramos una laptop nueva o recién formateada, el primer paso es elegir el idioma. Aquí debemos elegir Español (México); si no sale esta opción, elegiremos Español.'],
      image: { src: 'img/p2-5.jpg', caption: 'Pantalla de selección de idioma', portrait: true }
    },
    {
      short: 'Seleccionar país',
      title: 'Seleccionar país',
      body: ['En el segundo paso vamos a elegir el país donde estemos ubicados.'],
      image: { src: 'img/p3-8.jpg', caption: 'Selección de país o región' }
    },
    {
      short: 'Distribución del teclado',
      title: 'Elegir distribución del teclado',
      body: ['Siempre vamos a elegir la distribución del teclado Latinoamericano, para evitar conflictos al digitar símbolos en el teclado.'],
      value: { label: 'Selecciona', text: 'Latinoamericano' },
      image: { src: 'img/p4-11.jpg', caption: 'Distribución del teclado' }
    },
    {
      short: 'Omitir 2.ª distribución',
      title: 'Omitir la segunda distribución del teclado',
      body: ['En el cuarto paso vamos a seleccionar Omitir en la segunda distribución del teclado.'],
      image: { src: 'img/p5-14.jpg', caption: 'Presiona “Omitir”' }
    },
    {
      short: 'No conectar el WiFi',
      title: 'No conectar el WiFi',
      compact: true,
      body: [
        'Cuando aparezca la pantalla de red, no te conectes. Presiona estas 3 teclas al mismo tiempo. Aparecerá un cuadro negro; haz clic sobre él para poder escribir.',
        'Escribe el comando y presiona Enter. Esto te regresará al paso 1 de la guía: sigue los pasos nuevamente hasta llegar otra vez a la pantalla del WiFi.'
      ],
      keys: { label: 'Presiona al mismo tiempo', keys: ['SHIFT', 'FN', 'F10'], hint: 'Fn es la tecla al lado de Control.' },
      value: { label: 'Comando', text: 'oobe\\bypassnro', mono: true },
      warning: 'Si no aparece el cuadro negro, ponte en contacto con Soporte IT: el sistema pedirá obligatoriamente iniciar sesión con una cuenta de Microsoft.',
      images: [
        { src: 'img/p6-16.jpg', caption: 'Pantalla de red: no te conectes' },
        { src: 'img/p6-17.jpg', caption: 'Cuadro negro con el comando escrito' }
      ]
    },
    {
      short: 'Elegir “No tengo internet”',
      title: 'Elegir “No tengo internet”',
      body: ['Una vez lleguemos de nuevo al paso de conectar el WiFi, vamos a escoger la opción “No tengo internet”, que ahora ya se podrá elegir.'],
      image: { src: 'img/p7-21.jpg', caption: 'Opción “No tengo internet”' }
    },
    {
      short: 'Acuerdo de licencia',
      title: 'Acuerdo de licencia',
      body: ['En este paso daremos Aceptar al acuerdo de licencia del sistema operativo Windows.'],
      image: { src: 'img/p8-24.jpg', caption: 'Acuerdo de licencia de Windows' }
    },
    {
      short: 'Nombre del dispositivo',
      title: 'Colocar el nombre al dispositivo',
      body: ['Siempre vamos a colocar el nombre HI y le damos Siguiente.'],
      value: { label: 'Nombre', text: 'HI' },
      image: { src: 'img/p9-27.jpg', caption: 'Nombre del dispositivo' }
    },
    {
      short: 'Asignar contraseña',
      title: 'Asignar contraseña',
      body: ['La contraseña que siempre vamos a asignar es la siguiente. Respeta mayúsculas y números.'],
      value: { label: 'Contraseña', text: 'H4ndicap' },
      image: { src: 'img/p10-29.jpg', caption: 'Crear contraseña' }
    },
    {
      short: 'Preguntas de seguridad',
      title: 'Preguntas de seguridad',
      body: ['Aparecerá que elijamos 3 preguntas. Todas las preguntas deben ser elegidas al azar y en cada respuesta vamos a colocar siempre el número 1.'],
      value: { label: 'Respuesta para las 3 preguntas', text: '1' },
      image: { src: 'img/p11-32.jpg', caption: 'Preguntas de seguridad' }
    },
    {
      short: 'Configuración de privacidad',
      title: 'Configuración de privacidad',
      body: [
        'En el último paso vamos a dar clic 2 veces en Siguiente y después presionamos Aceptar la configuración de privacidad.',
        'Luego el sistema nos enviará al escritorio y ahí ya podremos conectar el WiFi y descargar AnyDesk para que el área de soporte realice el resto de la configuración del equipo.'
      ],
      image: { src: 'img/p12-35.jpg', caption: 'Configuración de privacidad' }
    }
  ],
  finish: {
    title: '¡Muchas gracias!',
    lead: 'Ya estás en el escritorio. Para terminar:',
    // Cada elemento admite HTML de confianza (enlaces).
    items: [
      'Conecta el WiFi.',
      'Descarga AnyDesk desde <a href="https://anydesk.com/es/downloads" target="_blank" rel="noopener">anydesk.com</a>.',
      'Comparte tu código de AnyDesk con Soporte IT para que realicen el resto de la configuración.'
    ]
  }
};
