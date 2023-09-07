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
          // check if user exists in db (by email)
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
          // if it does't exists need to sign up
          const userJS = await userExists.json();
          if (userJS.length < 1) {
            return null;
          }
          // check if password is right
          const passwordMatch = await bcrypt.compare(
            password,
            userJS?.[0].password
          );
          if (!passwordMatch) {
            return null;
          }
          // return user info (in the image there is the id of the user, next-auth has only this 3 params)
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
  // usually a secret in .env
  secret: "MYSECRET",
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
