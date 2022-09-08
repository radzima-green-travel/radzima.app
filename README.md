# radzima.app
Landing page for application

# Development
Create .env variables file and provide necessery env variables.

Env variables are required in order to autogenerate feedbacks, if you want to proceed without it, you can create feedbacks.json file in `src\_data\_cache` with the following content, for example: 
```
[
  {
    "author": "alexey komov",
    "source": "app store",
    "rate": 5,
    "body": "It’s good to have such content in one place. Do you plan to add more languages and maybe in-app purchases of excursions?",
    "image": "5e8cab3b51a75706f7720c866e181446.svg"
  },
  {
    "author": "mich dreby",
    "source": "app store",
    "rate": 5,
    "body": "One of the best apps in the world from really senior developers!",
    "image": "17e66694089629a9f49d8960c2920d08.svg"
  }
]
```
Otherwise, you need to provide env variables
```
APP_ID=
PRIVATE_KEY=
API_KEY=
ISSUE_ID=
BUCKET=
PACKAGE_NAME=
GOOGLE_CREDENTIALS=
```
Install dependencies
```
npm i
```
Run npm command
```
npm run dev
```
