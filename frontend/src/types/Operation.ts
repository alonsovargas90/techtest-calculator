import { OperationType } from "./OperationType";

export type Operation = {
  id: number;
  type: OperationType;
  cost: number;
};
