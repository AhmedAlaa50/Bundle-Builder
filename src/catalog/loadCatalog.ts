import raw from "./catalog.json";
import { catalogSchema, type Catalog } from "./schema";

export function loadCatalog(): Catalog {
  return catalogSchema.parse(raw);
}
