import React from 'react'

function Loader() {
    return (
        <div id="preloder" className="fixed inset-0 flex justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
    )
}

export default Loader