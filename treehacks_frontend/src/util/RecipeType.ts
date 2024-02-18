export type Recipe = {
    title: string;
    description: string;
    imageLink: string;
    ingredients: string[];
    instructions: string[];

    index?: number;
}