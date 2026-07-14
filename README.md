# Jones — Automation Exercise

## Approach

After reading the exercise, I took a short look at the page and planned
how to work on it. To stay focused, I split the review into separate
areas and looked at one at a time:

- UI
- Browser level checks (network requests, console, storage)
- Validation and input (also long or unexpected input)
- Structure, order and hierarchy
- Accessibility
- Performance
- Responsiveness
- Security
- Cross browser compatibility

## Manual findings

Before starting on the automation, I did a manual pass on the site and
found:

- A console error on page load
- Missing validation on form fields (checked later in the automated tests, field by field)
- Invalid HTML structure
- H headings not in a proper hierarchy
- Missing `<main>` tag
- A syntax error while loading the FontAwesome CSS
- Google Fonts failing to load because of `http` instead of `https` (also shows up as a console error)
- Images without an `alt` attribute, except for the top logo
- Poor contrast ratio in the form between the background and the text
- No metadata on the page
- Field labels slide sideways on mobile and become inaccessible, pushed outside the screen
- Overall the page is responsive, except for what was noted
- Images are not WebP format


### Thank you page

I also looked at the thank you page and noticed a few things:

- The form does not send a real network request. All the form data
  (name, email, phone, and so on) is placed directly into the URL as
  query parameters.
- There is no protection on the thank you page. You can navigate to it
  directly, without going through the form at all.
- You can put almost anything you want in the URL parameters and the
  page will still load without an error. 


## Note on an automated accessibility tool

After finding accessibility issues manually, I looked into adding
`@axe-core/playwright` to check accessibility automatically. In the
end I decided against it for this exercise, since the manual findings
above already cover the main issues. I preferred to spend the time on
the functional automation of the form, and to document accessibility
through the manual review.

## The automation

I built a Page Object Model structure, which covers:

- Filling in all form fields (Name, Email, Phone, Company, Website)
- Changing "Number of Employees" to 51-500 . I set this as
  the default in `validDefaults`, so every test uses it automatically.
- A screenshot before clicking "Request a call back"
- A `console.log` on reaching the thank you page (Happy Path)
- Data-driven tests validating each field (Name, Email, Phone). Every
  scenario is one object with a value, an expected result
  (`expectedValid`), and a description.

The tests are simple and easy to extend with more scenarios.

### Project structure

```
├── pages/
│   ├── BasePage.ts          # Shared logic: navigation, screenshots
│   └── LandingPage.ts       # Selectors and actions for the contact form
├── data/
│   └── landing-page.data.ts # Valid defaults + validation scenarios
├── tests/
│   └── landing-page.spec.ts # Happy Path + Field Validation (data-driven)
├── screenshots/              # Screenshot output
└── playwright.config.ts
```

The structure is meant to be easy to extend. A new page only needs a
new Page Object that extends `BasePage`, and a new test scenario only
needs another line in the data file, without changing the test code
itself.

## How to run

```bash
npm install
npx playwright install chromium
npm test
```

Extra command:

```bash
npm run test:ui  # UI mode
```

Screenshots from a run are saved under
`screenshots/<PageName>/<test-name>.png`.