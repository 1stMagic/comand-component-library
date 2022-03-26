export default [
`<CmdCookieDisclaimer 
    headline="Usage of cookies on this web site"
    :cookieOptions="cookieDisclaimerData"
    buttonLabelAcceptAllCookies="Accept all cookies"
    buttonLabelAcceptCurrentSettings="Accept current settings"
    @closeCookieDisclaimer="fancyBoxCookieDisclaimer = false"
/>`
]