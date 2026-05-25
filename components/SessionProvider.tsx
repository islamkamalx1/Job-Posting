import { SessionProvider as Provider } from "next-auth/react";

type props = {
  session: any;
  children: React.ReactNode;
};

export default function SessionProvider({ session, children }: props) {
  return <Provider session={session}>{children}</Provider>;
}
