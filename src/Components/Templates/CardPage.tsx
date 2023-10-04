import { Link } from "react-router-dom"
import * as React from "react"
import {TitleCard} from "./TitleCard"


export function CardPage({title,children, parent} : { 
  title: string,
  children?: React.ReactNode,
  parent?: {name: string, url: string}
}) {


  return (
    <main className="tw-flex-1 tw-overflow-y-auto tw-overflow-x-hidden tw-pt-2 tw-px-6 tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
      <div className='tw-w-full xl:tw-max-w-6xl '>
        <div className="tw-text-sm tw-breadcrumbs">
          <ul>
            <li><Link to={'/'} >Home</Link></li>
            {parent && <li><Link to={parent?.url ? parent?.url : ""}>{parent?.name}</Link></li>}
            <li>{title}</li>
          </ul>
        </div>
        <TitleCard title={title} topMargin="mt-2">
          {children}
        </TitleCard>
      </div>
    </main>
  )
}
