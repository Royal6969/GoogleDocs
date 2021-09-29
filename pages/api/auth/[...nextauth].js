import NextAuth from "next-auth"; // npm install --save next-auth
import { FirebaseAdapter } from '@next-auth/firebase-adapter'; // npm install next-auth @next-auth/firebase-adapter
import { db } from '../../../firebase';
// import { providers } from "next-auth/client"; // seems it is not necessary
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
      Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirect: process.env.GOOGLE_REDIRECT_URL,
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),
});