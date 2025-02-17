import React from 'react'

const CenteredLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-80">
        <div className="flex flex-1 items-center justify-center">
            <main>
                {children}
            </main>
        </div>
    </div>
  )
}

export default CenteredLayout
