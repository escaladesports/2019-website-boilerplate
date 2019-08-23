import React from 'react'
import logo from 'gatsby-site/src/img/logo.svg'
import styles from './logo.css'

export default function Logo(){
	return (
		<img src={logo} className={styles.logo} />
	)
}