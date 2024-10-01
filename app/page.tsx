import { BASE_URL } from "config/env";

export const metadata = {
  title: "App Router",
};

export default function Page() {
  return (
    <>
      <h1>App Router</h1>
      <p>{BASE_URL}</p>
    </>
  );
}
