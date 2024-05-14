export interface Repository {
    id:String;
    name: string;
    description: string;
    languages: { [key: string]: number };
    // Add other properties as needed
  }
  