import {FC} from 'react'

interface Props {
	text: string
}

export const DashboardTitle: FC<Props> = ({text}) => {
	return (
		<div
			className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
			<h1 className='h2'>{text}</h1>
		</div>
	)
}