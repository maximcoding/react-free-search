const InputComponent = ({placeholder, value, onChange}) => {
    return <input
        type="text"
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
}

export default InputComponent;


const inputStyle = {
    padding: '14px',
    margin: '10px 0',
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 4,
    fontSize: '16px',
    width: 'calc(30% - 22px)',
    fontFamily: "'Source Code Pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'",
}