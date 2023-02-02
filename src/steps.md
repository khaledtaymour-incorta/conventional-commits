1. npm i husky @commitlint/cli @commitlint/config-conventional lint-staged -D
2. npm i prettier eslint
3. npm init @eslint/config

//4. npx lint-staged 5. npx husky-init && npm install 6. npx husky add .husky/pre-commit "npm test"
edit it -> npx lint-staged

https://www.youtube.com/watch?v=_ssKvmZqSnk

---

1. create .commitlintrc.json inside it
   extends: ['@commitlint/config-conventional']
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
