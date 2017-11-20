import env from 'json/env.json'

let api
if (env.ZYGOTE_API){
	api = env.ZYGOTE_API
}
else if(env.NODE_ENV === 'production'){
	api = 'https://yh5fc30fhh.execute-api.us-east-1.amazonaws.com/production/handler'
}
else{
	api = 'https://hzrxrm0s9b.execute-api.us-east-1.amazonaws.com/staging/handler'
}

// Refreshes Zygote info & searches for new links
export default function () {
	if ('zygote' in window) {
		zygote.findButtons()
		zygote.findQty()
		zygote.findIcons()
		if (!zygote.api) {
			zygote.api = api
			zygote.properties = {
				site: env.ECOMMERCE_API_SITE || 'all'
			}
		}
	}
}