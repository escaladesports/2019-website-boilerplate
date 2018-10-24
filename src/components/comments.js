import React from 'react'
import { css } from 'emotion'
import formatDateTime from '../functions/format-date-time'

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
						}, index) => {
							return (
								<div key={`comment${index}`}>
									<h4 className={styles.name}>{name}</h4>
									<time
										dateTime={date}
										className={styles.time}
									>
										{formatDateTime(date)}
									</time>
									<div dangerouslySetInnerHTML={{ __html: html }} />
								</div>
							)
						})}
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
			border-top: 1px solid #ccc;
			padding: 20px 0;
			:first-of-type{
				border-top: 0;
			}
		}
	`,
	name: css`
		margin: 0;
	`,
	time: css`
		font-size: .75em;
	`,
}