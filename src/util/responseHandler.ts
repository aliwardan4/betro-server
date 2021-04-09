import ErrorData from "../constant/ErrorData";

const findErrorMessage = (status:number) => {
  return ErrorData.ERROR_STATUS_ARRAY.find(v => v.status == status) || { status:status, message: "Unknown Error", data: 'There must be an error' };
}

export const errorResponse = (statusCode:number) => {
	return findErrorMessage(statusCode);
}
