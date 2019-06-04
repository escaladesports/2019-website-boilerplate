export function onCreatePage({ page, actions: { createPage } }){
	if (page.path.match(/^\/app/)) {
		page.matchPath = `/app/*`
		// Update the page.
		createPage(page)
	}
}