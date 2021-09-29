import NextAuth from "next-auth"; // npm install --save next-auth
// import { providers } from "next-auth/client"; // seems it is not necessary
import Providers from "next-auth/providers";
import { FirebaseAdapter } from '@next-auth/firebase-adapter'; // npm install next-auth @next-auth/firebase-adapter
import { db } from '../../../firebase';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
      Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirect: process.env.GOOGLE_REDIRECT_URL, // This is really necesary ??
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),

    // NOTE: If you ever need the users ID, this is how you obtain it in the session!
    callbacks: {
      session: async (session, user) => {
        session.id = user.id;
        return Promise.resolve(session);
      },
    },
});