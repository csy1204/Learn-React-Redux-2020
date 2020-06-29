import React, {useState} from 'react'
import { addTodo } from './todoSlice'
import { useDispatch } from 'react-redux'

export default function TodoInput() {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const onChange = e => setInputText(e.target.value);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (!inputText.trim()) {
                        return
                    }
                    dispatch(addTodo(inputText));
                    setInputText('');
                }}
            >
                <input value={inputText} onChange={onChange} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
