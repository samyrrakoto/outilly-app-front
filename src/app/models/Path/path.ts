export class Path {
    current: string;
    previous: string;
    next: string;

    constructor(current="", previous="", next="") {
        this.current = current;
        this.previous = previous;
        this.next = next;
    }
}
