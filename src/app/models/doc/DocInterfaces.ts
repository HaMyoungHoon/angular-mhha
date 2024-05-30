import {DocInterfacesEvents} from "./DocInterfacesEvents";
import {DocInterfacesTemplates} from "./DocInterfacesTemplates";
import {DocInterfacesValues} from "./DocInterfacesValues";

export interface DocInterfaces {
  thisIndex: number,
  description?: string | null
  docInterfacesEvents?: DocInterfacesEvents | null,
  docInterfacesTemplates?: DocInterfacesTemplates | null,
  docInterfacesValues?: DocInterfacesValues[] | null
}
