export default function TextInput({label, onChange, value, name, refInput, required}) {
    return (
        <>
            {label ? (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 text-left">
                    {label}
                </label>
            ) : null}

            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    required={required}
                    ref={refInput}
                    onChange={onChange}
                    value={value}
                    type="text"
                    name={name}
                    id={name}
                    className="bg-gray-100 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 focus:shadow-outline transition ease-in-out duration-150"
                />
            </div>
        </>
    )
}
