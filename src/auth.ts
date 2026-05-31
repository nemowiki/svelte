import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { serverEnv } from '$lib/server/env.js';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({
			clientId: serverEnv.googleId,
			clientSecret: serverEnv.googleSecret
			// authorization: {
			//     params: {
			//         prompt: 'consent',
			//         access_type: 'offline',
			//         response_type: 'code',
			//     },
			// },
		})
	],
	secret: serverEnv.authSecret,
	trustHost: true // For Vercel
	// pages: {
	//     signIn: '/u/',
	// }
});
