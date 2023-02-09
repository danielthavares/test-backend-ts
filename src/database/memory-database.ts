import { News } from "../models/news";

export class MemoryDatabase {
  private _database: News[];

  constructor() {
    this._database = [];
  }

  public insert(data: News): News {
    const id = Math.floor(Math.random() * 1000);
    const record = new News(data.getTitle(), data.getDescription(), id);
    this._database.push(record);
    return record;
  }

  public update(id: number, data: News): number {
    let record = this.findById(id);

    if (record) {
      this._database = this._database.filter((x) => x.getId() !== id);
      this._database.push(new News(data.getTitle(), data.getDescription(), id));

      return 1;
    }
    return 0;
  }

  public remove(id: number): number {
    let record = this.findById(id);

    if (record) {
      this._database = this._database.filter((x) => x.getId() !== id);
      return 1;
    }
    return 0;
  }

  public findById(id: number): News | undefined {
    return this._database.find((x) => x.getId() === id);
  }

  public findAll(): News[] {
    return this._database;
  }
}
