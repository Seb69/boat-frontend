import { Boat } from "./boat.model";

export interface BoatPaged {
    content: Boat[];
    totalElements: number;
    number: number;
}