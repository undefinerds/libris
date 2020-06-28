import React from 'react';

export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const FIND_BOOK = 'FIND_BOOK';
export const SHOW = 'SHOW';
export const HIDE = 'HIDE';
export const INSTRUCTIONS = [
{
  x: '45%',
  y: '45%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Bienvenido a Libris, tu biblioteca. Hoy voy a guiarte a vivir una aventura llena de conocimiento</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Espera, ¿Ya nos conocemos? Creo que estoy olvidando las cosas, puedes ignorar mi tutorial haciendo click en el botón de ignorar en el fondo</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 45,
  rightHand: 45,
  messageBottom: false,
  message: (<p>Esta biblioteca está hecha para organizar todos los libros de tu computadora. Nunca perderás un libro, siempre estaremos aquí esperándote para seguir con nuestra aventura.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 45,
  rightHand: 45,
  messageBottom: false,
  message: (<p>Libris es una de las formas de decir libros en latín, o conjunto de libros. Puedes leer más acerca de esto <a href="#" target="_blank">aquí</a></p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 120,
  rightHand: 120,
  messageBottom: false,
  message: (<p>¡Qué modales, ni siquiera me he presentado!</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 56,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Mi nombre es Glaucopis Scarpofonie Athene Noctua El Tercero, Glaux para abreviar, y soy un mochuelo bibliotecario.</p>)
},
{
  x: '70%',
  y: '45%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Esto que ves aquí es un buscador, puedes escribir lo que necesites que yo lo buscaré por ti</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 50,
  rightHand: 50,
  messageBottom: false,
  message: (<p>Todos los libros aparecen debajo, basta con dar click y podrás abrirlo</p>)
},
{
  x: '70%',
  y: '45%',
  leftHand: 90,
  rightHand: 0,
  push: '/0',
  messageBottom: false,
  message: (<p>Puedes revisar todo acerca de este libro</p>),
},
//(<p>Esto de aquí significa el número de personas que también le han hechado un vistazo, y también a cuántos le ha gustado</p>),
{
  x: '60%',
  y: '10%',
  leftHand: 0,
  rightHand: 90,
  messageBottom: true,
  message: (<p>¿Quieres agregar algo? Por supuesto, haciendo click en el botón de Editar con forma de lápiz.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 45,
  rightHand: 45,
  messageBottom: false,
  message: (<p>Vamos a darle una oportunidad a este libro, puedes leerlo haciendo click en el botón de Leer</p>)
},
{
  x: '70%',
  y: '45%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: false,
  message: (<p>También puedes leer a partir de cualquier capítulo, haciendo click a los subtítulos más abajo</p>)
},
/*
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  push: '/2/read',
  messageBottom: false,
  message: (<p>Ex Libris proviene del latín y significa "De la Biblioteca". Verás, todos los libros provienen de algún lado, esta frase dice que proviene <em>«de la biblioteca de {process.env.USER}»</em>.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p><em>«Ab insome custodita dracone»</em> significa "Custodiado por un dragón que no duerme", era común colocar eso en las pertenencias y en las catedrales francesas.</p>)
},*/
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Esto me trae tan lindos recuerdos en la escuela medieval de mochuelos... En fin, pasemos a la siguiente página.</p>)
},
{
  x: '65%',
  y: '70%',
  leftHand: 0,
  rightHand: 90,
  push: '/0/read/0',
  messageBottom: false,
  message: (<p>Puedes pasar a la siguiente página haciendo click en la esquina derecha o con la flecha en el teclado que apunta hacia la derecha.</p>)
},
{
  x: '35%',
  y: '70%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Igual puedes volver a la página anterior haciendo click en la esquina de la izquierda o con su respectiva flecha en el teclado</p>)
},
{
  x: '45%',
  y: '0%',
  leftHand: 90,
  rightHand: 90,
  messageBottom: true,
  message: (<p>En la barra de arriba puedes acceder al índice de capítulos, así como crear marcadores si quieres guardar algo importante.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  push: '/0/read/2',
  messageBottom: false,
  message: (<p>Te mostraré un secreto que guarda esta biblioteca...</p>)
},
{
  x: '55%',
  y: '0%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: true,
  message: (<p>Interesante ¿no? Me gusta llevar la cuenta de cuánto tiempo tienes leyendo este libro, y te recompensaré con cada objetivo de lectura que logres.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Pero cuidado, tampoco puedes permanecer mucho tiempo leyendo por la luz de tu ordenador, así que cuidaré de tu vista y te aconsejaré cuándo tomar un descanso</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p>Sé que a veces puede ser muy divertido así que me aseguraré de que cuando vuelvas puedas seguir leyendo justo donde te has quedado.</p>)
},
{
  x: '30%',
  y: '0%',
  leftHand: 90,
  rightHand: 0,
  messageBottom: true,
  message: (<p>Por ahora volvamos a la biblioteca, puedes hacerlo con sólo un click en el botón superior de la izquierda con forma de X.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  push: '/',
  messageBottom: false,
  message: (<p>¡Y listo! Ya conoces todo lo necesario para navegar por todos los libros de la biblioteca. Recuerda nunca rayarlos, y trátalos con respeto.</p>)
},
{
  x: '70%',
  y: '0%',
  leftHand: 0,
  rightHand: 90,
  messageBottom: true,
  message: (<p>Puedes conocer todo acerca de esta biblioteca en el menú superior derecho, en el botón con la forma de engranaje</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p>¿Tienes alguna pregunta? Puedes consultar nuestra página de <a href="https://github.com/undefinerds/libris#issues" target="_blank">FAQ</a> o consultar a nuestros programadores.</p>)
},
{
  x: '45%',
  y: '45%',
  leftHand: 0,
  rightHand: 0,
  messageBottom: false,
  message: (<p><em>«Viam Sapientiae Mostrabo»</em>, joven. ¡Nos vemos!</p>)
}
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