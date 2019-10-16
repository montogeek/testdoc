## Ingresar

```mermaid title: "Ingresar"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Ingresa pagina principal del sistema GEACA
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>C: 7. Información validada
        C->>P: 8. Mostrar dashboard
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Registrarse

```mermaid title: "Registrarse"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Ingresa pagina principal del sistema GEACA
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>C: 7. Información validada
        C->>P: 8. Mostrar dashboard
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Visualización de Eventos

```mermaid title: "Visualización de Eventos"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Ingresar dashboard
    P->>C: 2. Solicitar dashboard
    C->>+A: 3. Solicitar datos
    A->>-C: 4. Enviar datos
    C->>P: 5. Mostrar dashboard
```

## Ver información detallada de un evento

```mermaid title: "Ver información detallada de un evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Seleccionar evento
    P->>C: 2. Solicitar evento
    C->>A: 3. Solicitar evento
    A->>C: 4. Enviar evento
    C->>P: 5. Mostrar evento
```

## Crear eventos

```mermaid title: "Crear eventos"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Crear evento
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar datos
    alt Correcto
        A->>A: 7. Almacenar datos
        A->>C: 8. Enviar datos
        C->>P: 8. Mostrar dashboard.
    else Incorrecto
        A->>C: 7. Retornar error.
        C->>P: 8. Mostrar errores de validación.
    end
```

## Editar eventos

```mermaid title: "Editar eventos"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Editar evento
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar datos
    alt Correcto
        A->>A: 7. Almacenar datos
        A->>C: 8. Enviar datos
        C->>P: 8. Mostrar dashboard.
    else Incorrecto
        A->>C: 7. Retornar error.
        C->>P: 8. Mostrar errores de validación.
    end
```

## Ver lista de invitados

```mermaid title: "Ver lista de invitados"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Ingresar invitados
    P->>C: 2. Solicitar invitados
    C->>A: 3. Solicitar invitados
    A->>C: 4. Enviar invidatos
    C->>P: 5. Mostrar invitados
```

## Agregar invitados

```mermaid title: "Agregar invitados"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Agregar invitado
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Guardar datos
        A->>C: 8. Enviar invitados
        C->>P: 9. Mostrar invitados
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Importar invitados de forma masiva

```mermaid title: "Importar invitados de forma masiva"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Importar invitados
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Guardar datos
        A->>C: 8. Enviar invitados
        C->>P: 9. Mostrar invitados
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Editar invitados

```mermaid title: "Editar invitados"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Editar invitado
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Actualizar datos
        A->>C: 8. Enviar invitados
        C->>P: 9. Mostrar invitados
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Eliminar invitados

```mermaid title: "Eliminar invitados"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Eliminar invitado
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Eliminar invitado
        A->>C: 8. Enviar invidatos
        C->>P: 8. Mostrar invitados
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Ver menú del evento

```mermaid title: "Ver menú del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Ingresar menú
    P->>C: 2. Solicitar menú
    C->>A: 3. Solicitar menú
    A->>C: 4. Enviar menú
    C->>P: 5. Mostrar menú
```

## Agregar ítems al menú del evento

```mermaid title: "Agregar ítems al menú del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Agregar ítem
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Guardar datos
        A->>C: 8. Enviar menú
        C->>P: 9. Mostrar menú
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Editar ítems del menú del evento

```mermaid title: "Editar ítems del menú del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Editar ítem
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Actualizar datos
        A->>C: 8. Enviar menú
        C->>P: 9. Mostrar menú
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Eliminar ítems del menú del evento

```mermaid title: "Eliminar ítems del menú del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Eliminar ítem
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Eliminar ítem
        A->>C: 8. Enviar menú
        C->>P: 8. Mostrar menú
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Editar presupuesto del evento

```mermaid title: "Editar presupuesto del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Editar presupuesto
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Actualzar datos
        A->>C: 8. Enviar menú
        C->>P: 8. Mostrar menú
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Agregar distribución de sillas del evento

```mermaid title: "Agregar distribución de sillas del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Agregar sillas
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Guardar datos
        A->>C: 8. Enviar sillas
        C->>P: 9. Mostrar sillas
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```

## Editar distribución de sillas del evento

```mermaid title: "Editar distribución de sillas del evento"
sequenceDiagram
    participant U as Usuario
    participant P as Pantalla
    participant C as Componente
    participant A as API
    U->>P: 1. Editar sillas
    P->>+C: 2. Solicitar formulario
    C->>-P: 3. Mostrar formulario
    U->>P: 4. Diligenciar formulario
    P->>C: 5. Enviar formulario
    C->>A: 6. Validar formulario
    alt Correcto
        A->>A: 7. Actualizar datos
        A->>C: 8. Enviar sillas
        C->>P: 9. Mostrar sillas
    else Incorrecto
        A->>C: 7. Retornar error
        C->>P: 8. Mostrar errores de validación
    end
```