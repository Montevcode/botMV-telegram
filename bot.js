require ('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const axios = require('axios');

/* CONSTANTES */



/* Bot inicial */

bot.hears(["hola", "Hola", "HOLA", 
"HoLa", "hOlA","Hola Monteverde", 
"holamonteverde", "Monteverde", "/start", "monteverde"], ctx =>{
    sendStartMessage(ctx);
})

/*---------------------- MENU PRINCIPAL START ----------------------*/
function sendStartMessage (ctx){
    const startMessage = ('Hola ' + ctx.from.first_name + ', Bienvenid@, este bot te ayudará en el momento de realizar tus pedidos');

    bot.telegram.sendMessage(ctx.chat.id, startMessage,{
        reply_markup:{
            inline_keyboard:[
                [
                    {text: "Nuestro website 🏔", url: "https://monteverde.com.co"}
                ],
                [
                    {text: "Registrar usuario 🔎", url: "https://forms.gle/yuLiMYvhBKwCi6TPA"} //buscar formulario de inscripción para insertar aqui
                ],
                [
                    {text: "Preguntas Frecuentes 📚", callback_data: "preguntasFrecuentes"}
                ],
/*                 [
                    {text: "Realizar un pedido", url:"Próximamente"}
                ], */
/*                 [
                    {text: "Modo de entrega del pedido", callback_data: "modoEntrega"}
                ], */
                [
                    {text: "Contáctanos 📱", callback_data: "contacto"}
                ],
                [
                    {text: "Salir ✅", callback_data: 'exit'}
                ]
            ]
        }
    })
};

bot.action('exit', ctx => {
    ctx.answerCbQuery();
    ctx.reply("Gracias por visitarnos");
});

/* -------------------BUTTON TELEGRAM OPTIONS START------------------- */


/* --------------------------FRECUENT QUESTIONS START-------------------------- */
bot.action('preguntasFrecuentes', ctx =>{
    ctx.answerCbQuery();
    const menuMessage = "¿Qué duda podemos revolverte el día de hoy?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard:[
                [
                    {text:"Compras 🛒", callback_data:"Compras"},
                ],
                [
                    {text:"Modificaciones 🔄", callback_data:"Modificaciones"},
                    {text:"Devoluciones ↪️", callback_data:"Devoluciones"},
                ],
                [
                    {text:"Registro de Usuario 👤", callback_data:"RegistroUsuario"},
                ],
                [
                    {text: "Cerrar ✅"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}); 

/* COMPRAS START */
bot.hears(['Compras', "Compras 🛒", "compras", "🛒", "Quiero comprar", 
"quiero comprar", "compra", "Compra", "COMPRAS", "COMPRA", "QUIERO COMPRAR", 
"Cómo comprar", "Como comprar", "como comprar", "cómo comprar", "COMO COMPRAR", 
"CÓMO COMPRAR"], ctx =>{
    const menuMessage = "¿De que forma podemos ayudarte con tus compras?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard:[
                [
                    {text:"Seleccionar mis productos 🎯", callback_data: "seleccionProductos"},
                ],
                [
                    {text:"Pagar mi pedido 💳", callback_data:"pagoPedido"},
                ],
                [
                    {text:"Recibir o retirar mi pedido 📦", callback_data: "reciORetiProducto"},

                ],
                [
                    {text: "Cerrar"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
});

bot.hears(['Seleccionar mis productos', "Seleccionar mis productos 🎯", 
"selección de preoductos", "Selección de productos", "Seleccionar", 
"Selección", "selección", "seleccion", "Seleccion", "seleccionar","🎯",
"seleccionar mis productos 🎯","SELECCION DE PRODUCTO", "SELECCIÓN DE PRODUCTO",
"SELECCIONAR", "SELECCIÓN"], ctx =>{
    const numWhatsapp = 3228834285;
    const menuMessage = "🏔 Ingresa a nuestro website:\n https://monteverde.com.co\n Revisa nuestros productos.\n\n Envianos  lo que necesitas a nuestra área de ventas virtuales: \n\n -📲Whatsapp: "+ numWhatsapp + " \n-💻 Correo: tiendaenlinea@monteverde.com.co \n\n Así nosotros te devolveremos la cotización con el valor a pagar. 🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});

bot.hears(['Pagar mi pedido', "Pagar mi pedido 💳", "💳", 
"pagar", "Pagar", "pagar mi dedido", "pagar mi pedido 💳", 
"Cómo pago pedido", "Cómo pago mi pedido", "Cómo pago mi Pedido", 
"cómo pago mi pedido", "Como pago mi pedido", "Como pago mi pedido", 
"como pago mi pedido", "como pago pedido", "pagar pedido", "Pagar pedido", 
"COMO PAGAR MI PEDIDO", "PAGAR MI PEDIDO", "REALIZAR PAGO", "realizar pago", 
"Realizar pago", "REALIZAR MI PAGO", "Realizar mi pago", "realizar mi pago" ], ctx =>{
    const numWhatsapp = 3228834285;
    const menuMessage = "🏔 Una Vez te generemos la cotización de tus productos\n Poseemos varios medios de pago: \n\n - Bancolombia:\n Cuenta corriente\n 04102934876\n\n - Pagos PSE: \nhttps://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=9431 \n\n Para concluir el proceso envianos copia del recibo de pago \n\n 📲Whatsapp: "+ numWhatsapp + " \n💻 Correo: tiendaenlinea@monteverde.com.co \n\n De esta forma podremos coordinar la entrega de tus productos. 🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});

bot.hears(['Recibir o retirar mi pedido', "Recibir o retirar mi pedido 📦", 
"📦", "recibir o retirar mi pedido 📦", "Recibir pedido", "recibir pedido", 
"Retirar pedido", "retirar pedido", "Retirar Pedido", "retirar Pedido", "recibir Pedido", 
"Recibir Pedido"], ctx =>{
    const menuMessage = "🏔 Al validar tu pago nos contactaremos para establecer el medio de entrega de su elección \n\n - Entrega en nuestras instalaciones:\n Ubicación\n Calle 11 #17 - 98\n\n - Entrega puerta a puerta: \n En el territorio de Bogotá y la sabana\n\n - Entrega a nivel Nacional: \n Empresas transportadoras de encomiendas \n El costo de envío es independiente de la compra 🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});

/* COMPRAS END */

/* DEVOLUCIONES START */
bot.hears(['Devoluciones', "Devoluciones ↪️", "↪️", "devoluciones ↪️", 
"devoluciones", "Devolución", "devolución", "devolucion", "devolución", "Quiero mi dinero", 
"quiero mi dinero","QUIERO MI DINERO"], ctx =>{
    const numWhatsapp = 3228834285;
    const menuMessage = "🏔¿tienes problemas con tus productos, te ayudamos?\n\n Contactanos en nuestra área de ventas virtuales: \n\n -📲Whatsapp: "+ numWhatsapp + " \n-💻 Correo: tiendaenlinea@monteverde.com.co \n\n para brindarte una solución a tu petición.🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});

/* DEVOLUCIONES END */

/* MODIFICACIONES START */
bot.hears(["Modificaciones 🔄", "modificaciones 🔄", "🔄", "modificación", 
"Modificación","modificacion", "Modificacion", "Modificar", "modificar",
"MODIFICACIÓN", "MODIFICACION", "MODIFICAR", "MODIFICACIONES", 
"CAMBIAR PRODUCTOS", "CAMBIAR", "Cambiar productos", "cambiar productos", 
"cambiar Productos", "Cambiar", "cambiar", "modificaciones", "Modificaciones", 
"MODIFICACIONES"], ctx =>{
    const numWhatsapp = 3228834285;
    const menuMessage = "🏔¿tienes problemas con tus productos, te ayudamos?\n\n Contactanos en nuestra área de ventas virtuales: \n\n -📲Whatsapp: "+ numWhatsapp + " \n-💻 Correo: tiendaenlinea@monteverde.com.co \n\n para brindarte una solución a tu petición.🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});


/* MODIFICACIONES END */

/* REGISTRO DE USUARIOS START */
bot.hears(['Registro de Usuario 👤', "registro de usuario 👤", 
"Registro de usuario", "No tengo correo", "no tengo correo", 
"NO TENGO CORREO"], ctx =>{
    const numWhatsapp = 3228834285;
    const menuMessage = "🏔 Si no puedes registar tus datos o presentas un incoveniente al solicitar tu usuario y contraseña.\n\n Contactanos en nuestra área de soporte: \n\n -📲Whatsapp: "+ numWhatsapp + " \n-💻 Correo: tiendaenlinea@monteverde.com.co \n\n Así nosotros podremos ayudarte en el proceso de registro. 🏔"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage)
});
/* REGISTRO DE USUARIOS END */


/* --------------------------FRECUENT QUESTIONS END-------------------------- */


/* --------------------------ORDER OPTIONS START-------------------------- */
/* bot.action('modoPedido', ctx =>{
    ctx.answerCbQuery();
    const menuMessage = "¿Qué tipo de pedido deseas realizar?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard:[
                [
                    {text:"Dulcería"},
                ],
                [
                    {text:"Hogar"},
                    {text:"Enlatados"},
                ],
                [
                    {text:"Aseo"},
                    {text:"Licores"}
                ],
                [
                    {text: "Cerrar"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
});  */

/* --------ORDER OPTIONS START-------- */
/* bot.hears("Dulcería", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Dulceria info",{
        reply_markup: {
            inline_keyboard:[
                [
                    {text:"Dulcería", url: "https://monteverde.com.co/productos.jsp?g=03"}
                ]
            ]
        }
    })
});

bot.hears("Hogar", ctx =>{
    ctx.reply("Has seleccionado Hogar");
});

bot.hears("Enlatados", ctx =>{
    ctx.reply("Has seleccionado Enlatados");
});

bot.hears("Aseo", ctx =>{
    ctx.reply("Has seleccionado Aseo");
});

bot.hears("Licores", ctx =>{
    ctx.reply("Has seleccionado Licores");
}); */

/* --------ORDER OPTIONS END-------- */


/* --------------------------ORDER OPTIONS END-------------------------- */
/* --------------------------DELIVERY MODE START-------------------------- */ 
bot.action('modoEntrega', ctx =>{
    ctx.answerCbQuery();
    const menuMessage = "¿Cómo quieres recibir tu pedido?"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard:[
                [
                    {text:"Recoger personalmente"},
                    {text:"Entrega puerta a puerta"}
                ],
                [
                    {text: "Cerrar"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
});

/* --------DELIVERY OPTIONS START-------- */
bot.action('contacto', ctx => {
    ctx.answerCbQuery();
    ctx.reply("Número de Whatsapp 📲: " + 3228834285);
    ctx.reply("Correo electrónico 💻: tiendaenlinea@monteverde.com.co");
});

/* bot.hears("Recoger personalmente", ctx =>{
    ctx.reply("Has seleccionado Recoger personalmente");
});

bot.hears("Entrega puerta a puerta", ctx =>{
    ctx.reply("Has seleccionado Entrega puerta a puerta");
});

bot.hears("Cerrar", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Gracias por visitarnos", {
        reply_markup: {
            remove_keyboard: true
        }
    })
}) */
/* --------DELIVERY OPTIONS END-------- */

/* --------------------------DELIVERY MODE END-------------------------- */ 

/* -------------------BUTTON TELEGRAM OPTIONS END------------------- */

/* Preguntas frecuentes */

/* async function fetchQuote (type) {
    const res = await axios.get("http://localhost:3000/modoEntrega/" + type);
    return res.data.quote;
}


bot.hears("mensaje amistad", async(ctx) =>{
    const quote = await fetchQuote("amistad")
    ctx.reply(quote);
}); */


/* Bot ejecutador de todos los bots */

const PORT = process.env.PORT || 4000

App.listen(PORT, function(){
    console.log("Servidor conectado desde el puerto", PORT)
})


bot.launch();
