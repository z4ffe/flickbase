import {EditorState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
	editorBlur: boolean
	editorData?: any
	handleEditorState: (html: any) => any
	setEditorBlur: Dispatch<SetStateAction<boolean>>
	onError: string | undefined
}

export const TextEditor: FC<Props> = ({editorData, handleEditorState, setEditorBlur, editorBlur, onError}) => {
	const [data, setData] = useState({
		editorState: EditorState.createEmpty(),
	})

	useEffect(() => {
		setData(editorData)
	}, [editorData])

	const handleErrorEffect = () => onError || (onError && editorBlur) ? 'error' : ''

	const onEditorStateChange = (text: any) => {
		const html = stateToHTML(text.getCurrentContent())
		setData({
			editorState: text,
		})
		handleEditorState(html)
	}

	return (
		<div>
			<Editor editorState={data.editorState} onEditorStateChange={onEditorStateChange}
					  wrapperClassName={`demo-wrapper ${handleErrorEffect()}`}
					  editorClassName='demo-editor'
					  onBlur={() => setEditorBlur(true)} />
		</div>
	)
}