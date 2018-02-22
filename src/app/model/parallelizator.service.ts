import {Injectable} from "@angular/core";
import * as threads from "threads";

@Injectable()
export class ParallelizatorService {
  private pool;

  constructor() {
    this.pool = new threads.Pool(3);

  }
}