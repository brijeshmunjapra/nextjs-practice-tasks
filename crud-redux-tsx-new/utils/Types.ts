export interface ApiDataStateType {
  _id: string;
  post: string;
}
export interface OperationState {
  data: string[];
  apiData: ApiDataStateType[];
  isLoading: boolean;
  error: string | null;
}

export type RootState = {
  operations: OperationState;
};

export interface AddPostPayloadType {
  post: string;
}

export interface UpdatePostPayloadType {
  id: string;
  data: AddPostPayloadType;
}

export type PayloadType = {
  itemTobeEdit: string;
  post: string;
};


