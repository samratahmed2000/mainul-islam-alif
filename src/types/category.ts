export interface Category {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly singular: string;
  readonly description: string;
  readonly icon: string;
  readonly order: number;
}