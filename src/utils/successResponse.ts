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
