export interface Requirement {
    requerimiento_id?: number
    solicitante_id: number
    nombre_solicitud: string
    descripcion: string
    archivo_adjunto: string
    estado: string
    asignado?: Usuario
    solicitante?: Usuario
  }
  
  export interface Usuario {
    usuarioId?: number
    nombre: string
    apellidos: string
    area: string
    rol: string
    requerimientos?: any[]
  }

  export interface Propuesta {
    propuestaId?: number
    requerimientoId: number
    analistaId: number
    textoPropuesta: string
    estimacionTiempo: number
    numeroProgramadores: number
    fechaEnvio?: string
    estado?: string
    epica?: Epica[]
    historiaUsuarios?: HistoriaUsuario[]
    requirement?: Requirement
    analista?: Usuario
  }

  export interface Epica {
    epicId: number
    titulo: string,
    descripcion: string,
    propuesta_id: number
  }
  
  export interface HistoriaUsuario {
    historiaId: number
    titulo: string
    descripcion: string
    prioridad: string
    propuesta_id: number
  }