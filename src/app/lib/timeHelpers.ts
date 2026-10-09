// TODO: make it so posts are revealed on the hour

const UPPER_LIMIT = 172800000; // 2 days in ms
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
  const now = Date.now();
  const targetTime = Number(storedTimestamp);

  return now >= targetTime;
};

export const getRemainingHours = (storedTimestamp: string) => {
  const now = new Date();
  const futureDate = new Date(Number(storedTimestamp));

  //TODO:
  //@ts-ignore
  const diffInMs = futureDate - now;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const remainingHours = Math.floor(diffInHours);

  return Math.max(Math.min(remainingHours, 10), 0);
};
