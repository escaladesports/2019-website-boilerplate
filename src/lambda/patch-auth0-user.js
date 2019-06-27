import verify from 'auth0-verify'
import { ManagementClient } from 'auth0'
import {
	GATSBY_AUTH0_DOMAIN,
	GATSBY_AUTH0_CLIENTID,
	AUTH0_CLIENTSECRET,
} from '../../env'

const auth0 = new ManagementClient({
	grant_type: `client_credentials`,
	domain: GATSBY_AUTH0_DOMAIN,
	clientId: GATSBY_AUTH0_CLIENTID,
	clientSecret: AUTH0_CLIENTSECRET,
	scope: `read:users update:users`,
	audience: `https://${GATSBY_AUTH0_DOMAIN}/api/v2/`,
	tokenProvider: {
		enableCache: true,
		cacheTTLInSeconds: 10,
	},

})

export async function handler(event) {
	const {
		body,
		headers: { authorization },
	} = event
	let verified
	try {
		verified = await verify(authorization, GATSBY_AUTH0_DOMAIN, GATSBY_AUTH0_CLIENTID)
		if(!verified){
			throw new Error(`Invalid token`)
		}
	}
	catch(err){
		console.error(err)
		return {
			statusCode: 403,
			body: JSON.stringify({ success: false }),
		}
	}
	// If verified
	try{

		const reqData = JSON.parse(body)
		console.log(`Received from API`, reqData)

		auth0.getUsers((err, users) => {
			if(err) throw err
			console.log(users)
		})

		return {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
			}),
		}

	}
	catch(err){
		console.error(err)
		return {
			statusCode: 500,
			body: JSON.stringify({ success: false }),
		}
	}
}