import React from 'react';

export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const FIND_BOOK = 'FIND_BOOK';
export const SHOW = 'SHOW';
export const HIDE = 'HIDE';
export const INSTRUCTIONS = [
(<p>Bienvenido a Libris, tu biblioteca. Hoy voy a guiarte a vivir una aventura llena de conocimiento</p>),
(<p>Espera, ¿Ya nos conocemos? Creo que estoy olvidando las cosas, puedes ignorar mi tutorial haciendo click en el botón de ignorar en el fondo</p>),
(<p>Esta biblioteca está hecha para organizar todos los libros de tu computadora. Nunca perderás un libro, siempre estaremos aquí esperándote para seguir con nuestra aventura.</p>),
(<p>Libris es una de las formas de decir libros en latín, o conjunto de libros. Puedes leer más acerca de esto <a href="#" target="_blank">aquí</a></p>),
(<p>¡Qué modales, ni siquiera me he presentado!</p>),
(<p>Mi nombre es Glaucopis Scarpofonie Athene Noctua El Tercero, Glaux para abreviar, y soy un mochuelo bibliotecario.</p>),
(<p>Esto que ves aquí es un buscador, puedes escribir lo que necesites que yo lo buscaré por ti. Vamos, ¡Inténtalo!</p>),
(<p>Ahora haz click en uno de los libros que aparecen acá</p>),
(<p>Puedes revisar todo acerca de este libro</p>),
(<p>Esto de aquí significa el número de personas que también le han hechado un vistazo, y también a cuántos le ha gustado</p>),
(<p>¿Quieres agregar algo? Por supuesto, haciendo click en el botón de Editar, uno con forma de lápiz a la derecha</p>),
(<p>Vamos a darle una oportunidad a este libro, haz click en el botón de Leer</p>),
(<p>Ex Libris proviene del latín y significa "De la Biblioteca". Verás, todos los libros provienen de algún lado, esta frase dice que proviene <em>«de la biblioteca de {process.env.USER}»</em>.</p>),
(<p><em>«Ab insome custodita dracone»</em> significa "Custodiado por un dragón que no duerme", era común colocar eso en las pertenencias y en las catedrales francesas.</p>),
(<p>Esto me trae tan lindos recuerdos en la escuela medieval de mochuelos... En fin, pasemos a la siguiente página.</p>),
(<p>Puedes pasar a la siguiente página haciendo click en la esquina derecha o con la flecha en el teclado que apunta hacia la derecha.</p>),
(<p>Igual puedes volver a la página anterior haciendo click en la esquina de la izquierda o con su respectiva flecha en el teclado</p>),
(<p>Puedes cambiar algunas de las opciones en la barra de arriba como la fuente y el tamaño de la letra, también puedes acceder al índice de capítulos desde aquí.</p>),
(<p>Adelante, haz click en el botón de la izquierda y vayamos a otro capítulo.</p>),
(<p>Te mostraré un secreto que guarda esta biblioteca...</p>),
(<p>Interesante ¿no? Me gusta llevar la cuenta de cuánto tiempo tienes leyendo este libro, y te recompensaré con cada objetivo de lectura que logres.</p>),
(<p>Pero cuidado, tampoco puedes permanecer mucho tiempo leyendo por la luz de tu ordenador, así que cuidaré de tu vista y te aconsejaré cuándo tomar un descanso</p>),
(<p>Sé que a veces puede ser muy divertido así que me aseguraré de que cuando vuelvas puedas seguir leyendo justo donde te has quedado.</p>),
(<p>Por ahora volvamos a la biblioteca, haz click en el botón superior de la derecha.</p>),
(<p>¡Y listo! Ya conoces todo lo necesario para navegar por todos los libros de la biblioteca. Recuerda nunca rayarlos, y trátalos con respeto.</p>),
(<p>Puedes conocer todo acerca de esta biblioteca en el menú superior derecho, en la opción <em>«Acerca de»</em></p>),
(<p>¿Tienes alguna pregunta? Puedes consultar nuestra página de <a href="https://github.com/undefinerds/libris#issues" target="_blank">FAQ</a> o consultar a nuestros programadores.</p>),
(<p><em>«Viam Sapientiae Mostrabo»</em>, joven. ¡Nos vemos!</p>)
];

const frases = [
'Omnibus enim mobilibus mobilior est sapientia',
'Omnibus nobilior, nobilior sapientia',
'Omnium potientor est sapientia',
'Sapientia sola libertas est',
'Universitas Lux et Sapientia est',
'Fortis Spiritus Sapientia',
'In lumine sapientia'
];