import Database from "./Database";
import { error, info } from "./Logger";
import { DocContent } from "../types/General";
import { View as ViewSpec, ViewColumn } from "../types/View";

export default class View {
  private db: Database;
  public readonly id: string;
  private spec: ViewSpec;

  constructor(db: Database, id: string, spec: ViewSpec) {
    this.db = db;
    this.id = id;
    this.spec = spec;
  }

  execute(): Promise<DocContent[]> {
    info(`execute() on view ${this.id} with index? ${this.spec.index}`);
    if (this.spec.index) {
      return this.db.find(
        this.id,
        this.spec.index,
        this.spec.columns.map((col) => col.field.id),
        this.spec.selector,
        this.spec.sort
      );
    }
    if (this.spec.selector || this.spec.sort) {
      error(
        `view ${this.id} specifies selector ${this.spec.selector} and/or sort ${this.spec.sort} without specifying an index`
      );
    }
    return this.db
      .allDocs({
        include_docs: true,
      })
      .then((data) => {
        return data.rows.map((row) => row.doc as DocContent);
      });
  }

  getColumns(): ViewColumn[] {
    return this.spec.columns;
  }

  getDatabase(): Database {
    return this.db;
  }

  getNewDocumentLink(): string {
    return `/${this.db.name}/create/main`;
  }

  getShowLink(doc_id: string): string {
    return `/${this.db.name}/show/${doc_id}`;
  }

  getType(): string {
    return this.spec.type;
  }
}
