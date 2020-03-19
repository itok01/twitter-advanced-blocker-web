import App from 'next/app'

import '../styles/global.css'

export default class MyApp extends App {
    public render() {
        const { Component, pageProps } = this.props

        return (
            <Component {...pageProps} />
        )
    }
}
