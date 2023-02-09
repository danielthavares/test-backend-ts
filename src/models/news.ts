export class News {
  private id: number | undefined;
  private title: string;
  private description: string;

  constructor(title: string, description: string, id?: number) {
    this.title = title;
    this.description = description;
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }
}
