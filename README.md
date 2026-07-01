# patients-frontend — Angular 16 + PrimeNG

Aplicación web para gestión de pacientes construida con Angular 16 y PrimeNG, consumiendo la API REST de PatientsApi.

---

## Requisitos

- Node.js 18+
- Angular CLI 16
- PatientsApi corriendo en `http://localhost:5175`

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Gilbertog12/patients-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

En `src/environments/environment.ts` verificar que la URL apunte a la API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5175/api/v1'
};
```

### 4. Ejecutar la aplicación

```bash
ng serve
```

La aplicación quedará disponible en `http://localhost:4200`

---

## Ejecutar pruebas unitarias

```bash
ng test
```

3 pruebas implementadas con Jasmine y Karma:
- PatientListComponent llama al servicio en ngOnInit
- PatientFormComponent inválido con campos vacíos
- PatientFormComponent válido con todos los campos requeridos

---

## Funcionalidades

- **Lista de pacientes** — tabla paginada server-side con filtros por nombre y número de documento
- **Crear paciente** — formulario reactivo con validaciones
- **Editar paciente** — misma vista del formulario en modo edición, documento bloqueado
- **Ver detalle** — vista de solo lectura con datos del paciente
- **Eliminar paciente** — con confirmación antes de ejecutar
- **Manejo global de errores** — interceptor HTTP muestra toast en cualquier error

---

## Arquitectura y decisiones técnicas

**Módulo con lazy loading:** el módulo de pacientes se carga solo cuando el usuario navega a `/patients`, reduciendo el bundle inicial.

**Servicio centralizado:** `PatientService` maneja todas las llamadas HTTP con `HttpClient`. Ningún componente llama a la API directamente.

**Interceptor de errores:** captura cualquier error HTTP de forma global y muestra un toast de PrimeNG sin necesidad de manejar errores en cada componente individualmente.

**Formulario reactivo:** se usó `ReactiveFormsModule` sobre template-driven forms por mayor control sobre validaciones y estado del formulario. En modo edición, `DocumentType` y `DocumentNumber` se deshabilitan porque son el identificador del paciente — se usa `getRawValue()` en lugar de `form.value` para incluirlos en el payload.

**Paginación server-side:** la tabla delega la paginación a la API con `page` y `pageSize`, evitando cargar todos los registros en memoria.

---

## Stack

| Tecnología | Versión |
|---|---|
| Angular | 16 |
| PrimeNG | 16 |
| TypeScript | 5 |
| RxJS | 7 |
