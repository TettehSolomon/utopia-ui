import * as React from 'react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export function AppShell({ name, useAuth, children }) {
    return (
        <BrowserRouter>
            <ToastContainer position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <NavBar name={name} useAuth={useAuth}></NavBar>
            <div id="app-content" className="tw-flex tw-!pl-[77px]">
                {children}
            </div>
        </BrowserRouter>
    )
}