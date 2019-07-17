import { useState } from 'react'

export default function useTestState(){
	return useState(`This is a test.`)
}