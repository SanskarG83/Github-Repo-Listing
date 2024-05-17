export interface Repository {
    id:string;
    name: string;
    description: string;
    languages: { [key: string]: number };
    // Add other properties as needed
  }
  