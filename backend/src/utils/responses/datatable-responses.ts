export class DataTableResponses<T> {
    data: T[];
    count: number;

    constructor(data: T[], count: number) {
        this.count = count;
        this.data = data;
    }
  }
