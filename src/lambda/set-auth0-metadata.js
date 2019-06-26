import verify from 'auth0-verify'
import fetch from 'isomorphic-fetch'
import {
	GATSBY_AUTH0_DOMAIN,
	GATSBY_AUTH0_CLIENTID,
} from '../../env'

export async function handler(event) {
	let verified
	try {
		verified = await verify(event.headers.authorization, GATSBY_AUTH0_DOMAIN, GATSBY_AUTH0_CLIENTID)
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
		const clientBody = JSON.parse(event.body)
		console.log(`Received from client:`, clientBody)
		const req = await fetch(`https://${GATSBY_AUTH0_DOMAIN}/api/v2/users/${verified.sub}`, {
			method: `PATCH`,
			headers: {
				'content-type': `application/json`,
				authorization: `Bearer ${event.headers.authorization}`,
			},
		})
		const res = await req.json()
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
				metadata: res.user_metadata,
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