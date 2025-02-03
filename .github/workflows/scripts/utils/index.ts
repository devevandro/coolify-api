export const parseEnvString = (envString: string) => {
  const pairs = envString.trim().split(" ");

  const result = pairs.map((pair) => {
    const [key, value] = pair.split("=");

    return {
      key: key,
      value: value,
    };
  });

  return result;
};
