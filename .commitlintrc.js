const commitRegex = /^(feat|fix|chore)(?:\(([A-Z]{2,}-\d+)\))\!?:\s(.+)$/;

function checkMatchingRegex(string, regex) {
  return regex.test(string);
}

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: commitRegex,
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { type, ticket, subject, header } = parsed;

          if (
            !header ||
            !checkMatchingRegex(header, commitRegex) ||
            (type === null && ticket === null && subject === null)
          ) {
            return [
              false,
              "header must be in format \n • 'feat(INC-123): description' or\n • 'fix(INC-123): description' or\n • 'chore(INC-123): description' or\n • 'feat(IC-123): description' or\n • 'fix(IC-123): description' or\n • 'chore(IC-123): description'",
            ];
          }

          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
  },
};
