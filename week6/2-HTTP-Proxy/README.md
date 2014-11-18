##Simple proxy server
`req` and `res` objects implement `Readable` and `Writable` stream interfaces respectively. Use that to right a simple HTTP proxy server. Keep in mind that if you use `http` or `express` some parts of the `req` stream will be consumed by the time your handlers get executed.

Think about a way to preserver cookies for each client separately.
