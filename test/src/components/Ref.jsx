
import React, { useEffect, useRef, useState } from 'react'

const Ref = () => {


    const [inputValue, setInputValue] = useState("");
    const previousInputValue = useRef("");
    const renderCount = useRef(0)

    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        previousInputValue.current = inputValue;
    }, [inputValue]);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    })

  return (
    <div>
      <>
            <h1>Render count - {renderCount.current}</h1>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleClick}>Focus input</button>
            <h2>Current Value: {inputValue}</h2>
            <h2>Previous Value: {previousInputValue.current}</h2>
        </>
    </div>
  )
}

export default Ref;
