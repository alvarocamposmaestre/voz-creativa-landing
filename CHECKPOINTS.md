# CHECKPOINTS.md — Estándares de Calidad

> Antes de marcar una tarea como `done` en `feature_list.json`, el Auditor debe verificar que se cumplen los siguientes puntos.

## 🟢 1. Estándares de Spec (Blueprint)
- [x] **EARS Notation**: Los requisitos siguen el formato *When, If, The system shall...*
- [x] **Traceability**: Cada requisito tiene un ID único (`R1`, `R2`...).
- [x] **No Ambiguity**: No hay términos vagos (ej: "rápido", "eficiente" sin métrica).
- [x] **Approval**: Existe una traza de aprobación humana en el chat o en `progress/`.

## 🟡 2. Estándares de Código (Architect)
- [x] **Zero Secrets**: No hay claves API, tokens o credenciales en el código (usar `.env`).
- [x] **Error Handling**: Se implementan bloques `try/except` o similares con logs descriptivos.
- [x] **Clean Code**: Nombres de variables semánticos y funciones de responsabilidad única.
- [x] **Security**: Se ha validado la entrada de datos para prevenir inyecciones (Prompt Guard si aplica).

## 🔵 3. Estándares de Verificación (Audit)
- [x] **Test Coverage**: Existe al menos un test por cada requisito `R<n>`.
- [x] **Disk Trace**: El archivo `progress/impl_<feature>.md` contiene el output de los tests.
- [x] **Clean Environment**: No quedan archivos temporales, logs de debug o `print()` innecesarios.

## 🔴 4. Estándares de Entrega (Trigger)
- [x] **Documentation**: Se han actualizado los manuales o archivos `.md` relevantes.
- [x] **Memory Update**: Se han subido los aprendizajes clave a Pinecone (si aplica).
- [x] **Linter/Formatting**: El código pasa los checks de estilo del proyecto.

---
*La excelencia no es un acto, sino un hábito. Verifica siempre antes de entregar.*
