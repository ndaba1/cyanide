import React from 'react'
import Split from "react-split-grid"

export default function App() {
  return (
    <div className='w-screen h-screen'>
      <Split
    render={({
        getGridProps,
        getGutterProps,
    }) => (
        <div className="grid" {...getGridProps()}>
            <div />
            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
            <div />
        </div>
    )}
/>
    </div>
  )
}
