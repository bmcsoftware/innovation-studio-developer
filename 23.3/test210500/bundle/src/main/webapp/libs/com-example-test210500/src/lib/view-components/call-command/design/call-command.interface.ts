export interface ICallCommandParameters {
}

export interface ICallCommandPayload {
  inputId: string;
  inputUserName: string;
}

export interface ICallCommandResult {
  userName: string;
  password: string;
}
