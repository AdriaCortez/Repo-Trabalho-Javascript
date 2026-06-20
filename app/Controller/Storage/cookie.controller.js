
export function Storage (req) {

   return req.cookies['cookie-auth'];

}

export function ClearStorage (req, res) {

   const cookie = req.cookies['cookie-auth']; 

   res.clearCookie('cookie-auth', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    })

}