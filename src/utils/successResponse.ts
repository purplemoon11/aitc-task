/**
 * This function return response on success
 *
 * @param res
 * @param status - Status code
 * @param act - Type of response
 * @param message - Type of message for res
 * @param data - Response data
 * @returns Promise
 */

export const successCallback = async (
  res: any,
  status: string,
  act: string,
  message: string,
  data: object | undefined
) => {
  const responseData = {
    status,
    act,
    message,
    data,
  };
  return res.status(200).send(responseData);
};
