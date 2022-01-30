import react, { useState } from "react";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';

const Placeholder = ({ id, codeExample }) => {
    const [code, setCode] = useState(codeExample);

    return (
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                minHeight: '100vh',
            }}
        />
    );
};

export default Placeholder;

