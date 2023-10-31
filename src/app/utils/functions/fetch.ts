export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${input}`,
    init
  );

  if (!data.ok) {
    return;
  }

  const result = await data.json();

  return result as T;
}
