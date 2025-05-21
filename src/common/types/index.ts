export type FieldsError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors: FieldsError[];
  messages: string[];
  resultCode: number;
};