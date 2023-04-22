import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import { OperationType } from "../types/OperationType";
import api from "../API";
import { Operation } from "../types/Operation";
import { UserContext } from "../providers/UserContext";
import { UserProfile } from "../types/UserProfile";
import { Record } from "../types/Records";

const NewOperation: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [initialBalance, setInitialBalance] = useState<number>(1000);
  const [operation, setOperation] = useState<OperationType>();
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await api.get("/operations");
        const operations = await response.data;
        console.log(operations);
        setOperations(operations); // TODO Move this to a Provider on the future
        setOperation(
          OperationType[operations[2].type as keyof typeof OperationType]
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchOperations();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseProfile = await api.get("/auth/profile");
        const userProfile: UserProfile = responseProfile.data;
        if (setUserProfile) {
          setUserProfile(userProfile);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handleNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum1(parseInt(e.target.value));
  };

  const handleNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum2(parseInt(e.target.value));
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setOperation(e.target.value as OperationType);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const OptObj = operations.find(
      (x) =>
        OperationType[x.type as unknown as keyof typeof OperationType] ===
        operation
    );
    const OperationId = OptObj?.id!;
    const UserId = userProfile?.sub!;
    console.log("USER", userProfile);
    console.log("operations", operations);
    console.log("OperationId", OperationId);
    const recordDto: Record = {
      operation_id: OperationId,
      user_id: UserId,
      number_1: num1,
      number_2: num2,
      operation_response: '',
      user_balance: 880, //TODO UPDATE
      date: new Date().toISOString(),
    };
    console.log("NewRecord", recordDto);

    await api.post('/records', { data: recordDto }).then((res) => {
      console.log('res', res);
    });
    //const response = await api.post('/auth/login', { data: { username, password } });
    // let res: number;
    // switch (operation) {
    //   case OperationType.ADDITION:
    //     res = num1 + num2;
    //     break;
    //   case OperationType.SUBTRACTION:
    //     res = num1 - num2;
    //     break;
    //   case OperationType.MULTIPLICATION:
    //     res = num1 * num2;
    //     break;
    //   case OperationType.DIVISION:
    //     res = num1 / num2;
    //     break;
    //   default:
    //     res = 0;
    //     break;
    // }
    //setResult(res);
  };

  return (
    <div className="bg-light">
      <NavBar />
      <Container className="my-5">
        <h2 className="mb-4">Arithmetic Calculator</h2>
        <p>
          <label>
            Operation Cost: <b> 100</b>
          </label>
        </p>
        <p>
          <label>
            Remanding Balance: <b> {initialBalance}</b>
          </label>
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="num1">
            <Form.Label>Number 1:</Form.Label>
            <Form.Control
              type="number"
              value={num1}
              onChange={handleNum1Change}
            />
          </Form.Group>
          <Form.Group controlId="num2">
            <Form.Label>Number 2:</Form.Label>
            <Form.Control
              type="number"
              value={num2}
              onChange={handleNum2Change}
            />
          </Form.Group>
          <Form.Group controlId="operation">
            <Form.Label>Operation:</Form.Label>
            <Form.Control
              as="select"
              value={operation}
              onChange={
                handleOperationChange as (e: React.ChangeEvent<Element>) => void
              }
            >
              {Object.keys(OperationType).map((key) => (
                <option
                  key={key}
                  value={OperationType[key as keyof typeof OperationType]}
                >
                  {OperationType[key as keyof typeof OperationType]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Calculate
          </Button>
        </Form>
        {result !== 0 && (
          <div className="mt-3">
            <h3>Result: {result}</h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewOperation;
