import Database from "./Database";
import { error, info } from "./Logger";
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

  execute(): Promise<any> {
    info(`execute() on view ${this.id}`);
    // return this.db.find({
    // selector: { field: value },
    // fields: this.spec.columns.map((col) => col.id),
    // sort: [ cols ]
    // });
    return this.db.allDocs({
      include_docs: true,
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
