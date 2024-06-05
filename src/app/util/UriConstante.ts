import { environment } from "src/environments/environment"
export class UriConstante {
  public static readonly REQUERIMENT_RESOURCE = environment.API_BASE_URL + "requirement"
  public static readonly AYUDA_RESOURCE = environment.API_BASE_URL + "help"
  public static readonly PROPUESTA_RESOURCE = environment.API_BASE_URL + "proposal"
  public static readonly USUARIO_RESOURCE = environment.API_BASE_URL + "users"

}
