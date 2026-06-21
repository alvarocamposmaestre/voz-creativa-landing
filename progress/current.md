# Current Session Progress

- **Feature**: webhook_and_email_automation
- **Goal**: Integración del formulario de registro con un Webhook en Make.com, almacenamiento local de registros en un Data store de Make y preparación de la lógica de enrutamiento y plantillas de correo segmentadas para Gmail.
- **Start Time**: 2026-06-20T23:47:00

## 📝 Active Plan
- [x] Crear y vincular nuevo Webhook en Make.com (`https://hook.us2.make.com/7igt46ndla249vbxfmoeofg0bq8kmz5g`).
- [x] Actualizar `script.js` con la nueva URL de Webhook y verificar consistencia del mapeo.
- [x] Diseñar y crear un Data store local en Make.com (`Voz Creativa Landing Junio`) con las columnas correspondientes (`nombre`, `whatsapp`, `pais`, `profesion`, `objetivos`, `fecha`).
- [x] Configurar la opción `Overwrite an existing record` en `Yes` en el módulo de Data store de Make.com utilizando el `email` del usuario como clave única.
- [x] Estructurar el Router en Make.com para segmentación de caminos (Ruta Venezuela con filtro sobre `pais` y `pais_detectado`; Ruta Internacional configurada como fallback).
- [x] Ejecutar pruebas en vivo enviando un registro desde la consola que guardó con éxito los datos de prueba en la base de datos de Make.com.
- [x] Descargar y guardar copia de seguridad en formato CSV de los datos históricos del anterior Data store en la ruta especificada de `Open RC Studio - Landing`.

## 📌 Próximos Pasos (Pendiente de Acceso a Gmail de la Clienta)
- `[ ]` Volver a agregar los dos módulos de **Gmail -> Send an email** a las ramas del Router en Make.com.
- `[ ]` Realizar la conexión con la cuenta de Gmail de la clienta (haciendo clic en **Add connection** y completando la verificación en su correo).
- `[ ]` Configurar la plantilla HTML en cada módulo de Gmail:
  - En la rama de **Venezuela**: Usar el código HTML de [venezuela_email.html](file:///c:/Users/alvar/Documents/Diseño/Raquel%20Cartaya%20Studio/Voz%20Creativa%20-%20Raquel%20Cartaya/venezuela_email.html).
  - En la rama **Internacional**: Usar el código HTML de [international_email.html](file:///c:/Users/alvar/Documents/Diseño/Raquel%20Cartaya%20Studio/Voz%20Creativa%20-%20Raquel%20Cartaya/international_email.html).
  - En ambas plantillas, reemplazar la etiqueta `{{nombre}}` con el valor dinámico `nombre` obtenido del Webhook.
- `[ ]` Activar el escenario de Make.com cambiando el interruptor **Scheduling** a **ON**.

