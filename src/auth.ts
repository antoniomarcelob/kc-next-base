import NextAuth from "next-auth"
import keycloak from "next-auth/providers/keycloak"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: "", // AUTH_SECRET here
  providers: [keycloak({
    profile(profile) {
      // that profile parameter have the user info that comes from keycloak. If you want to change some of that info, go to your keycloak > client scopes > profile > mappers
      return profile
    }
  })],

  callbacks: {
    jwt({token, user}) { // that function is called everytime that a jwt token is exchanged. When the user logs in, for exemple.
      if(user) {
        // the default behaviour of the useSession() is to return just the name, email, expire date and authentication status. If you want more than that, you have to manually add here:
        // here I wanted the roles and the user preferred username, so below I get the info from the id token and put into the user information
        token.preferred_username = user.preferred_username
        token.resource_access = user.resource_access
        // the types for the token, user and session(below) are in @types/authjs.d.ts. You have to modify this file as you put more infos above.
      }
      return token
    },
    session({session, token}) { // that function is called when a useSession() or auth() is called.
      // gatter the info that was placed in jwt function above and puts into the session data for retrieving in the useSession or auth functions.
      session.user.preferred_username = token.preferred_username as string
      session.user.userRoles = token.resource_access as string[]
      return session
    }
  }

})