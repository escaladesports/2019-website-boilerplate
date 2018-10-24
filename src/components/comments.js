import React from 'react'
import { css } from 'emotion'

export default class Comments extends React.Component{
	render(){
		const { comments } = this.props
		const hasComments = !!comments.length
		return (
			<>
				<h3>Comments:</h3>
				{hasComments && (
					<div className={styles.commentsList}>
						{comments.map(({
							html,
							name,
							date,
							formattedDate,
						}, index) => (
							<div key={`comment${index}`}>
								<h4>{name}</h4>
								<time dateTime={date}>{formattedDate}</time>
								<div dangerouslySetInnerHTML={{ __html: html }} />
							</div>
						))}
					</div>
				)}
				{!hasComments && (
					<div>There are no comments for this post.</div>
				)}
			</>
		)
	}
}

const styles = {
	commentsList: css`
		> div{
			border-top: 1px solid #333;
			:first-of-type{
				border-top: 0;
			}
		}
	`,
}