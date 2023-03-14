// キャメルケースをスペース入りの文字列にする
export const humanizeCamelCase = (src: string): string => {
  const parts = src.match(/[A-Z][a-z]+/g);

  return parts?.map((x) => x[0].toUpperCase() + x.slice(1)).join(" ") ?? src;
};
