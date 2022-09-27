import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button({ onClick, fa}) {
    return (
            <button><FontAwesomeIcon icon={fa} onClick={onClick} /></button>
    )
}
