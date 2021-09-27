import dynamic from 'next/dynamic'; // important! to avoid the error in next: window is not defined...
// import { Editor } from "react-draft-wysiwyg"; // this would be the normal import ... but in this special case, we will need a special next import like inside a constant type...
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { useRouter } from 'next/router';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { useSession } from 'next-auth/client';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

const Editor = dynamic( // npm install --save react-draft-wysiwyg draft-js
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    {
        ssr: false,
    }
);

function TextEditor() {

    const [session] = useSession();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const router = useRouter();
    const { id } = router.query;

    const [snapshot] = useDocumentOnce(
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(id)
    );

    useEffect(() => {
        if (snapshot?.data()?.editorState) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(snapshot?.data()?.editorState)
            )
          );
        }
    }, [snapshot]);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState); // everytime I write a char, the state updates
        
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .doc(id)
            .set(
                {
                editorState: convertToRaw(editorState.getCurrentContent()),
                }, 
                {
                    merge: true,
                }
            );
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16">
            <Editor 
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto" // I have to write exclamation mark as important because TextRichEditor has it own css 
                editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"    
            />
        </div>
    );
}

export default TextEditor;