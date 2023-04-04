1. npm i husky @commitlint/cli @commitlint/config-conventional lint-staged -D
2. npm i prettier eslint
3. npm init @eslint/config

//4. npx lint-staged 5. npx husky-init && npm install 6. npx husky add .husky/pre-commit "npm test"
edit it -> npx lint-staged

https://www.youtube.com/watch?v=_ssKvmZqSnk

---

1. create .commitlintrc.json or .js inside it
   extends: ['@commitlint/config-conventional']
   <br/>
   //2. to test your commit before commiting run:
   echo "type your commit here" | npx commitlint
2. npx husky add .husky/commit-msg "npx commitlint --edit $1"

https://www.youtube.com/watch?v=2J9VnYiZ_Ts
https://theodorusclarence.com/library/husky-commitlint-prettier

---

1. npm i standard-version -D
2. create a script in package.json -> "release": "standard-version".
3. run this script, this will commit all changes and creates/updates CHANGELOG.md file.
4. Then you can push it `git push --follow-tags origin master`
   https://www.youtube.com/watch?v=OJqUWvmf4gg
   https://mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages/
   https://www.freecodecamp.org/news/a-beginners-guide-to-git-what-is-a-changelog-and-how-to-generate-it/

https://www.techiediaries.com/git-hooks-husky-commitlint/

---

## Steps I followed tp configure Cloud Admin (a Monorepo):

1. Install the necessary packages:
   `npm install husky lint-staged commitlint standard-version prettier eslint @commitlint/cli @commitlint/config-conventional --save-dev`

2. add the prepare script `"prepare": "cd .. && husky install frontend/.husky"`
   <br/>
   In a normal repo you'll not need to `cd`

3. Run `npx husky-init && npm install` in cmd
   <br/>
   This will create a .husky directory

4. Run
   `npx husky add .husky/pre-commit "npx lint-staged"`
   and `npx husky add .husky/commit-msg "npx commitlint --edit $1"`
   <br/>
   This will create pre-commit and commit-msg hook files inside `.husky` folder.

5. Create a `.commitlintrc.js` file in the root of your project with the content and the end of this file.

6. In `package.json` add

```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E  HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,html,css,md,mdx,yml,json,eslintrc,prettierrc}": [
      "prettier --write"
    ],
    "**/*.{js,jsx,ts,tsx}": [
      "eslint"
    ]
  }
```

the `-E HUSKY_GIT_PARAMS` flag, which tells commitlint to use the Git commit message as input.

---

## ChatGPT Proposed Steps:

1. Install the necessary packages:
   `npm install husky lint-staged commitlint standard-version prettier eslint @commitlint/cli @commitlint/config-conventional --save-dev`

2. Add the following scripts to your package.json file:

```
"scripts": {
  "lint": "eslint --ext .js,.jsx,.ts,.tsx src/",
  "lint:fix": "eslint --fix --ext .js,.jsx,.ts,.tsx src/",
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,md}\"",
  "prepare": "husky install"
},
```

3. Configure Husky in your package.json file:

```
"husky": {
  "hooks": {
    "pre-commit": "echo \"🏃🏻 Running lint-staged on backend staged files...\" && npx lint-staged",
    "commit-msg": "echo \"🏃🏻 Running commitlint...\" && cd backend && npx commitlint --edit"
  }
},
```

4. Configure `lint-staged` in your package.json file:

```
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format", "git add"]
},
```

5. Create a `.commitlintrc.js` file in the root of your project with the following content:

```
const commitRegex = /^(feat|fix|chore|style|refactor|test|docs|ci|perf|build|revert)(?:\(([A-Z]{2,}-\d+)\))\!?:\s(.+)$/;

function checkMatchingRegex(string, regex) {
  return regex.test(string);
}

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: commitRegex,
      headerCorrespondence: ['type', 'ticket', 'subject']
    }
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { type, ticket, subject, header } = parsed;

          if (!header || !checkMatchingRegex(header, commitRegex) || (type === null && ticket === null && subject === null)) {
            return [
              false,
              "\n __________________ \n | Invalid commit | \n __________________ \n Commit header must be in the format: type(TicketNumber): Ticket Description \n inwhich type can be one of: \n feat, fix, chore, style, refactor, test, docs, ci, perf, build, or revert \n\n Examples: \n =========  \n • 'feat(INC-123): description' or\n • 'fix(INC-123): description' or\n • 'chore(INC-123): description' or\n • 'feat(IC-123): description' or\n • 'fix(IC-123): description' or\n • 'chore(IC-123): description'"
            ];
          }

          return [true, ''];
        }
      }
    }
  ],
  rules: {
    'header-match-team-pattern': [2, 'always']
  }
};
```

You can now use Husky to create pre-commit and commit-msg hooks that run lint-staged and commitlint, respectively, with the configuration provided in steps 3-5.
