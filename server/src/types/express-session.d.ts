import 'express-session';

declare module 'http' {
  interface IncomingMessage {
    session: import('express-session').Session &
      Partial<import('express-session').SessionData>;
  }
}
