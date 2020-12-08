import React from 'react'

function Tags({tags}) {
    return (
        <>
            {'теги: '}
            {tags.split(',').map(item => <button key={item}>#{item}</button>)}
        </>
    )
}

export default Tags;