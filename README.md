# This is the follow along for Wes Bos' Advanced React Tutorial

# This is the FrontEnd of the project. The backend of the project [here](https://github.com/Missarachnid/sick-fits-backend)

# The deployed project can be seen here: [Sick-Fits](https://www.sick-fits.com)

---

![Advanced React & GraphQL](https://advancedreact.com/images/ARG/arg-facebook-share.png)

# Advanced React & GraphQL

These are the starter files and stepped solutions for the [Advanced React & GraphQL](https://AdvancedReact.com) course by [Wes Bos](https://WesBos.com/).

## Getting Help

The best place to get help is in the #advanced-react slack room - there is a link in your course dashboard.

## FAQ

**Q:** Which Extensions for VS Code is Wes using?  
**A:** All my extensions are listed on [my dotfiles repo](https://github.com/wesbos/dotfiles), but specifically this course uses [ESLint](https://github.com/Microsoft/vscode-eslint) and [Prettier](https://github.com/prettier/prettier-vscode).

---

## Technology Used:

- React/JavaScript
- Typescript Backend
- Apollo/GraphQL/Keystone
- CSS/Flexbox/Grid/Styled Components
- Cloudflare to force HTTPS
- Front End deployed on Heroku
- Back End deployed on Digital Ocean
- Domain controlled through Gooogle
- Payment through Stripe - Although it is a fake site, no money is exchanged with the use of a fake number found through link provided
- Testing with Jest
- Email trapping with Ethereal and Nodemail for development
- Emails for password reset sent with Email.js and Nodemailer

## What I added beyond the tutorial

- You can view products when not signed in
- Password reset token/link are sent with email.js from an email address from my website
- At the time I did this there was no instruction on deployment so I had to learn how to do that
- I moved the orders info into the Account page so I could shorten the navigation
- Add SameSite, Secure, and httpOnly properties to the cookie so it would function properly
- Route to products after sign in
- Added Cloudflare to force https to avoid cookie issues
- Added styling to products and thier pages and responsiveness

## Things I am still working on:

- Adding items to cart without being signed in
- Adding a hamburger menu for mobile
