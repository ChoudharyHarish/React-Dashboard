import React from 'react'
import { Icon } from "@iconify/react";

const Search = () => {
    return (
        <div className='flex bg-subBackground items-center text-white rounded-md px-2'>
            <Icon icon="ic:baseline-search" width="24" height="24" />
            <input type="text" placeholder='Enter text' className='bg-subBackground w-full p-3 outline-none' />
        </div>
    )
}

export default Search