# KUSUMEK FC Website

A responsive football club website built with HTML, CSS and vanilla JavaScript.

## Run locally
1. Extract `kusumek-fc-website.zip`.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser. For the best development experience, use the VS Code Live Server extension and choose **Open with Live Server**.

## Club setup before publishing
Open `script.js` and edit:
- `CLUB_EMAIL`: set the club email address. The contact form opens the visitor's email application with a pre-filled message; it does not send mail silently or store submissions on a server.
- `ADMIN_PASSWORD`: change the demo admin password.

## Demo admin panel
Click **CLUB ADMIN** in the footer.
Demo password: `kusumek2026`

The admin panel can add/delete player profiles, fixtures/results and news articles. Data is saved in the browser's `localStorage`, on that device/browser only.

## Important production notes
This is a static front-end website. The browser-only admin login is not secure and localStorage is not shared between visitors or devices. Do not use it to protect sensitive information. For a public production CMS, use a server-side backend with authentication and a database. For direct email delivery from the contact form, connect a form service such as Formspree or implement a server-side email endpoint.

## Customise
- Replace sample player names and sample fixture/news content through the admin panel.
- Gallery photos are `images/image1.jpeg` and `images/image2.jpeg`; the badge is `images/logo.png` (`images/logo-original.png` is your untouched original).
- The location map in the Contact section is set to Litein, Kericho County. To pin an exact spot, open Google Maps, choose Share > Embed a map, and replace the `src` of the `<iframe>` in `index.html`.
- Update club contact details and social links.
- The design uses Google Fonts and an embedded Google Map, so those parts need an internet connection.
