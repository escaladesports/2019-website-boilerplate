import React from "react"

class Index extends React.Component {
	render() {
		return (
			<section>
				<div className='row'>
					<div>1</div>
					<div>2</div>
				</div>
				<style jsx>{`
					.row{
						lost-utility: clearfix;
						div{
							lost-column: 1/2;
						}
					}
				`}</style>
			</section>
		)
	}
}

export default Index
