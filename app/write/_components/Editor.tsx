import { usePostImage } from '@/app/_hooks/services/mutations/postImage'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import '../styles/quill.scss'
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    )
  },
  {
    ssr: false,
  },
)
interface EditorProps {
  setContent: Dispatch<SetStateAction<string>>
  initialContent?: string
}
export default function Editor({ setContent, initialContent }: EditorProps) {
  const { mutate: imageMutate } = usePostImage()
  const quillRef = useRef<any>()
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()

    input.onchange = async () => {
      const file = input.files
      if (file) {
        const fileName = encodeURIComponent(file[0].name)
        imageMutate(
          {
            imageName: fileName,
            image: file[0],
          },
          {
            onSuccess: (response) => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor()
                const range = editor.getSelection()
                editor.insertEmbed(range.index, 'image', response)
                editor.setSelection(range.index + 1)
              }
            },
          },
        )
      }
    }
  }
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [
            'bold',
            'underline',
            { color: [] },
            { list: 'ordered' },
            { list: 'bullet' },
            { align: [] },
            'link',
            'image',
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]
  return (
    <ReactQuill
      forwardedRef={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      defaultValue={initialContent}
      onChange={setContent}
      placeholder="함께 나누고 싶은 이야기를 적어보세요"
      style={{ width: '100%' }}
    />
  )
}
