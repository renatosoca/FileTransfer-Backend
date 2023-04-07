
export const generateURL = (name: string) => {
  return name + '-' + Math.random().toString(36).substring(2);
}