import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const userExists = await fetch(
            "http://localhost:3000/api/auth/user-exists",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );
          const userJS = await userExists.json();
          if (userJS.length < 1) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            password,
            userJS?.[0].password
          );
          if (!passwordMatch) {
            return null;
          }
          let user = {
            name: `${userJS?.[0].name}`,
            email: `${userJS?.[0].email}`,
            image: `${userJS?.[0].id}`,
          };
          return user;
        } catch (e) {
          console.log("Error: ", e);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "MYSECRET",
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
