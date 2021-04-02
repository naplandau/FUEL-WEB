interface ResponseError {
  data: {
    code: number;
    message: string;
  }
}

export function isResponseError(object: any): object is ResponseError {
  console.log(object)
  return typeof object.data.code === 'number' && typeof object.data.error === 'string';
}

export default ResponseError;
