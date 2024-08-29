//4 days in ms
const UPPER_LIMIT = 345600000;
const ONE_HOUR_IN_MS = 3600000;

export const getReadTime = () => {
  const now = Date.now();
  const randomTimeInFuture = Math.floor(Math.random() * UPPER_LIMIT);

  return randomTimeInFuture + now;
};

export const normaliseTime = (storedTimestamp: string) => {
  const now = Number(Date.now());
  const numberTime = Number(storedTimestamp);
  const niceTime = Math.ceil((numberTime - now) / ONE_HOUR_IN_MS);

  return niceTime.toString();
};

export const isReadyToRead = (storedTimestamp: string) => {
  const now = new Date();
  const futureDate = new Date(Number(storedTimestamp));

  return futureDate > now ? false : true;
};
