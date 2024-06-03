import React from 'react'

const DropDown = (props) => {

    const { title, selectedValue, handleChange, list } = props;


    return (
        <div className='flex gap-2 justify-center items-center'>
            <label className='m-auto h-full' htmlFor="protocol">{title} : </label>
            <select className='text-black outline-none rounded-sm p-1' id="protocol" onChange={(e) => handleChange(title, e.target.value)}>
                <option value="">All</option>
                {list.map(protocol => (
                    <option key={protocol} value={protocol}>{protocol}</option>
                ))}
                {selectedValue && <option value={selectedValue} selected>{selectedValue}</option>}
            </select>
        </div>
    )
}

export default DropDown