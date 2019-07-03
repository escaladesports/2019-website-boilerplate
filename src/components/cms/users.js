import React, { useState } from 'react'
import People from '@material-ui/icons/People'
import Modal from '../modal'

export default function UsersPane({ buttonClasses, iconClasses }){
	const [open, setOpen] = useState(false)
	return <>
		<button
			className={buttonClasses}
			onClick={() => setOpen(true)}
		>
			<span className={iconClasses}>
				<People />
			</span>
			Users
		</button>
		<Modal
			open={open}
			onClose={() => setOpen(false)}
		>
			This is a test.
		</Modal>
	</>
}