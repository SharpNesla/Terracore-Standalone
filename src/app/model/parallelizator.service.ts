import {Injectable} from "@angular/core";
import * as threads from "threads";

@Injectable()
export class ParallelizatorService {
  constructor() {
    const pool = new threads.Pool(3);
  }
}