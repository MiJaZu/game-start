export class Player {
  private id: string;
  private x: number;
  private y: number;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  getId(): string {
    return this.id;
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
