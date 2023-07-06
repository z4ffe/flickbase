import {ContentState, EditorState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import htmlToDraft from 'html-to-draftjs'
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {htmlDecode} from '../../utils/htmlDecode.ts'

interface Props {
	editorBlur: boolean
	editorData?: any
	handleEditorState: (html: string) => void
	setEditorBlur: Dispatch<SetStateAction<boolean>>
	onError: string | undefined
}

export const TextEditor: FC<Props> = ({editorData, handleEditorState, setEditorBlur, editorBlur, onError}) => {
	const [data, setData] = useState({
		editorState: EditorState.createEmpty(),
	})

	useEffect(() => {
		if (editorData) {
			// @ts-ignore TODO: fix TS error
			const blockFromHtml = htmlToDraft(htmlDecode(editorData))
			const {contentBlocks, entityMap} = blockFromHtml
			const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
			setData({
				editorState: EditorState.createWithContent(contentState),
			})

		}
	}, [editorData])

	const handleErrorEffect = () => onError || (onError && editorBlur) ? 'error' : ''

	const onEditorStateChange = (text: EditorState) => {
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